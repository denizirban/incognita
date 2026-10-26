#!/usr/bin/env python3
"""Technical OpenMM pilot runner for pre-vetted standard protein PDB structures.

Not an automatic Parkin preparation pipeline. Does not infer pathogenicity.
"""
from __future__ import annotations

import argparse
import hashlib
import json
from pathlib import Path
import platform as py_platform
import sys


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--pdb", required=True, type=Path, help="Prepared standard-protein PDB")
    parser.add_argument("--output-dir", required=True, type=Path)
    parser.add_argument("--steps", type=int, default=1000, help="Production steps (positive)")
    parser.add_argument("--equilibration-steps", type=int, default=1000)
    parser.add_argument("--seed", type=int, default=101)
    parser.add_argument("--temperature-k", type=float, default=300.0)
    parser.add_argument("--padding-nm", type=float, default=1.0)
    parser.add_argument("--platform", choices=["CPU", "CUDA", "OpenCL", "Reference"], default="CPU")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    if not args.pdb.is_file():
        raise SystemExit(f"Input PDB not found: {args.pdb}")
    if args.steps <= 0 or args.equilibration_steps <= 0 or args.padding_nm <= 0 or args.temperature_k <= 0:
        raise SystemExit("Steps, temperature and padding must be positive.")
    if args.seed < 0:
        raise SystemExit("Seed must be nonnegative.")
    output = args.output_dir.resolve()
    if output.exists() and any(output.iterdir()):
        raise SystemExit(f"Output directory is not empty: {output}. Choose a new run directory.")
    from openmm import LangevinMiddleIntegrator, Platform, __version__ as openmm_version
    from openmm.app import (
        DCDReporter, ForceField, HBonds, Modeller, PDBFile, PME, Simulation,
        StateDataReporter,
    )
    from openmm.unit import kelvin, nanometer, picosecond

    # Conservative guard: reject heterogens and nonstandard residues rather than
    # silently claiming generic Amber protein parameters cover Parkin cofactors.
    standard = {"ALA", "ARG", "ASN", "ASP", "CYS", "GLN", "GLU", "GLY", "HIS",
                "ILE", "LEU", "LYS", "MET", "PHE", "PRO", "SER", "THR", "TRP", "TYR", "VAL"}
    with args.pdb.open(encoding="utf-8", errors="replace") as fh:
        lines = fh.readlines()
    if any(line.startswith("HETATM") for line in lines):
        raise SystemExit("HETATM records found (ligands/metals/waters). Manual chemical preparation required.")
    residues = {line[17:20].strip() for line in lines if line.startswith("ATOM  ")}
    if not residues or residues - standard:
        raise SystemExit(f"No standard-protein atoms or unsupported residues: {sorted(residues-standard)}")
    pdb = PDBFile(str(args.pdb))
    forcefield = ForceField("amber14-all.xml", "amber14/tip3pfb.xml")
    modeller = Modeller(pdb.topology, pdb.positions)
    modeller.addHydrogens(forcefield)
    modeller.addSolvent(forcefield, model="tip3p", padding=args.padding_nm * nanometer)
    system = forcefield.createSystem(modeller.topology, nonbondedMethod=PME,
                                    nonbondedCutoff=1.0 * nanometer, constraints=HBonds)
    integrator = LangevinMiddleIntegrator(args.temperature_k * kelvin,
                                         1.0 / picosecond, 0.004 * picosecond)
    integrator.setRandomNumberSeed(args.seed)
    sim = Simulation(modeller.topology, system, integrator, Platform.getPlatformByName(args.platform))
    sim.context.setPositions(modeller.positions)
    sim.minimizeEnergy()
    sim.context.setVelocitiesToTemperature(args.temperature_k * kelvin, args.seed)
    output.mkdir(parents=True, exist_ok=True)
    with (output / "system.pdb").open("w") as fh:
        PDBFile.writeFile(modeller.topology, modeller.positions, fh, keepIds=True)
    sim.step(args.equilibration_steps)
    report_interval = max(1, min(1000, args.steps // 10 or 1))
    sim.reporters.append(DCDReporter(str(output / "trajectory.dcd"), report_interval))
    sim.reporters.append(StateDataReporter(str(output / "state.csv"), report_interval,
                                          step=True, time=True, potentialEnergy=True,
                                          kineticEnergy=True, temperature=True,
                                          speed=True, separator=","))
    sim.step(args.steps)
    sim.saveCheckpoint(str(output / "final.chk"))
    manifest = {
        "status": "completed_technical_run_not_biological_validation",
        "input_pdb": str(args.pdb.resolve()),
        "input_sha256": hashlib.sha256(args.pdb.read_bytes()).hexdigest(),
        "openmm_version": openmm_version,
        "python_version": py_platform.python_version(),
        "platform": args.platform,
        "temperature_k": args.temperature_k,
        "padding_nm": args.padding_nm,
        "production_steps": args.steps,
        "equilibration_steps": args.equilibration_steps,
        "timestep_ps": 0.004,
        "seed": args.seed,
        "forcefield": ["amber14-all.xml", "amber14/tip3pfb.xml"],
        "caveat": "No inference about PRKN function or pathogenicity is supported.",
    }
    (output / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")
    print(f"Technical run completed. Results: {output}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
