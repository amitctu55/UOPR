#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/../.."

if [[ ! -d .venv ]]; then
  python3 -m venv .venv
fi

# shellcheck disable=SC1091
source .venv/bin/activate

python -m pip install --upgrade pip
pip install -r requirements.txt

if [[ -f web/package.json ]]; then
  npm --prefix web install
fi
