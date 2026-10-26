#!/usr/bin/env python3
"""Validate static page routes and inline script syntax without third-party dependencies."""
from html.parser import HTMLParser
from pathlib import Path
import re
import subprocess
import tempfile

ROOT = Path(__file__).resolve().parents[1]
PAGES = ("index.html", "parkin-atlas.html", "molecular-viewer.html", "compare.html", "evidence.html", "zinc-audit.html", "md-gate.html", "parkinson-3d.html", "structure.html")


class Inspector(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
        self.scripts = []
        self.in_inline_script = False

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag in ("a", "link", "script"):
            url = attrs.get("href") or attrs.get("src")
            if url and not url.startswith(("http:", "https:", "#", "mailto:", "data:")):
                self.links.append(url.split("?", 1)[0].split("#", 1)[0])
        if tag == "script" and "src" not in attrs:
            self.in_inline_script = True
            self.scripts.append("")

    def handle_endtag(self, tag):
        if tag == "script":
            self.in_inline_script = False

    def handle_data(self, data):
        if self.in_inline_script:
            self.scripts[-1] += data


def main():
    errors = []
    for page in PAGES:
        path = ROOT / page
        if not path.is_file():
            errors.append(f"Missing page: {page}")
            continue
        inspector = Inspector()
        inspector.feed(path.read_text(encoding="utf-8"))
        for href in inspector.links:
            if href.startswith("/") or ".." in Path(href).parts:
                errors.append(f"{page}: unsupported or unsafe local path: {href}")
            elif href and not (ROOT / href).is_file():
                errors.append(f"{page}: broken local link: {href}")
        for index, js in enumerate(inspector.scripts):
            if not js.strip():
                continue
            with tempfile.NamedTemporaryFile("w", suffix=".js", encoding="utf-8") as temp:
                temp.write(js)
                temp.flush()
                proc = subprocess.run(["node", "--check", temp.name], capture_output=True, text=True)
                if proc.returncode:
                    errors.append(f"{page}: inline script {index}: {proc.stderr.strip()}")
    if errors:
        print("\n".join(errors))
        raise SystemExit(1)
    print(f"PASS: {len(PAGES)} HTML routes, local links and inline JavaScript syntax")


if __name__ == "__main__":
    main()
