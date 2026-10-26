# Parkin Research Lab — computational workflow

This directory contains a **real, optional OpenMM molecular dynamics runner**, not a fake animated simulation.

## Critical scientific distinction

Parkin is a multidomain, autoinhibited E3 ubiquitin ligase. Its state depends on phosphorylation, phospho-ubiquitin binding, zinc coordination and other biochemical context. A single protein-only simulation with generic force fields **does not** automatically reproduce Parkin activation or disease biology. Zinc sites, unresolved regions, ligands, modifications, membrane context and oligomeric states require explicit scientific preparation and validation.

## Pilot workflow

1. Obtain a **scientifically vetted, simulation-ready** WT PDB file and a matched variant PDB. Do not assume an AlphaFold model is simulation-ready.
2. Ensure the structures have equivalent constructs, residues, cofactors and protonation assumptions. The script checks atom/residue compatibility but cannot prove chemical validity.
3. Install Python 3.10+ and OpenMM in a dedicated environment: `python -m pip install -r research/requirements.txt`.
4. Run a very short technical smoke test on a **validated simple protein** first:

   ```bash
   python research/run_openmm.py --pdb prepared.pdb --output-dir results/smoke --steps 1000 --seed 101
   ```

5. Only after preparation and expert review, run matched WT and variant replicas with distinct seeds and identical physical settings. Record exact structures, force field, OpenMM version, platform, topology, seed and analysis scripts.

## What the runner does

- Loads a provided PDB
- Rejects missing input and common incompatible components
- Uses Amber14 protein force field with TIP3P-FB water
- Adds hydrogens and explicit solvent with 1 nm padding
- Minimizes, equilibrates, and runs a short NVT production segment
- Writes PDB topology, DCD trajectory, CSV thermodynamic log, checkpoint and JSON manifest

## What it does not do

- Automatically repair missing residues or construct mutant proteins
- Parameterize metal ions, ligands, post-translational modifications or phospho-ubiquitin
- Prove equilibration or convergence
- Calculate variant pathogenicity or clinical effects
- Compare conformational ensembles or report RMSD/RMSF yet
- Run remotely or provide GPU resources

**No Parkin simulations have been executed or validated by this repository.**

Reference: [OpenMM User Guide](https://docs.openmm.org/latest/userguide/application/02_running_sims.html).