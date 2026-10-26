# Incognita — Atlas of the Unknown

**Explore the biological universe, from the human body to molecular mechanisms.**

Incognita is an evidence-aware, interactive biology atlas and the foundation for a future computational research workbench. The first research module focuses on **PINK1–Parkin mitochondrial quality control**.

## What works now

- Interactive macro-to-micro atlas with branching biological structures
- Click/double-click, keyboard arrows and mouse-wheel zoom
- Curated established facts, open questions and research links
- Parkin Research Lab mechanism walkthrough
- UniProt protein links and external Mol* predicted-structure viewer links
- Reproducible experiment-plan JSON export
- Responsive, dependency-free static frontend

## What does **not** work yet

- No molecular dynamics engine or GPU jobs are connected.
- No real atomic coordinates are rendered in the atlas itself.
- No trajectory, RMSD/RMSF, clinical risk or mutation effect is calculated.
- Source links are curated research entry points, not exhaustive evidence assessments.

## Run locally

Open `index.html` in a modern browser, or serve the repository with:

```bash
python3 -m http.server 8000
```

Then visit http://localhost:8000.

## Deployment

This is a static site. Enable GitHub Pages for the `main` branch root in **Settings → Pages**, or deploy the repository to any static host.

## Scientific roadmap

1. Load experimentally determined Parkin structures and AlphaFold models through Mol* with provenance, chain/residue mapping and confidence.
2. Curate and verify PRKN variants, structural states, domain boundaries and literature.
3. Create a separate Python/OpenMM service for explicit-solvent, replicated simulations with reproducible environments.
4. Add trajectory analysis (RMSD, RMSF, contacts, convergence), controls and uncertainty.
5. Link structural observations to biochemical and cellular evidence without equating molecular motion with clinical pathogenicity.

## Scientific principles

**Observation ≠ model ≠ simulation ≠ experimental validation.**

The PINK1–Parkin pathway is context dependent. A predicted structure is not a measured dynamic state, and an MD trajectory cannot independently establish pathogenicity or therapeutic efficacy.

Resources: [UniProt PRKN](https://www.uniprot.org/uniprotkb/O60260/entry) · [UniProt PINK1](https://www.uniprot.org/uniprotkb/Q9BXM7/entry) · [Mol*](https://molstar.org/) · [OpenMM](https://openmm.org/).

## License

License not yet specified. Do not assume open-source reuse rights until a license is added.
