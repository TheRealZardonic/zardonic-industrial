# Quality journal

Append-only evidence per code/config/workflow change. This PR introduces the initial record; subsequent PRs must append new dated entries.

## 2026-11-15 | Adopt enforced living architecture documentation
- Scope: zardonic-industrial repository documentation map, quality baseline and new stand-alone PR CI validation.
- Root cause: Prior prose guidance was not sufficient to reject a code-only PR with stale Markdown.
- Owner: Project maintainers own local architectural boundaries, security decisions and documentation.
- Tests: Standalone Node tests cover source-path requirements and invalid journal entries; GitHub CI will run them.
- Failure path: Missing required document edits or unavailable PR git ancestry fail the quality gate closed.
- Docs updated: Architecture quality baseline, journal, existing agent contract and deployment workflow.
- Residual risk: Human reviews must validate factual documentation and real database/browser behavior; branch protection is external.
