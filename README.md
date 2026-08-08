# UOPR

A minimal Python API scaffold for the UOPR project.

## Development

Install dependencies:

```bash
.cursor/scripts/install.sh
```

Run the API server:

```bash
.cursor/scripts/start-dev.sh
```

Run tests:

```bash
source .venv/bin/activate
pytest
```

The API listens on port `8000`. Health check: `GET /health`.
