# Architecture quality programme

**Status:** Quality process introduced, full independent audit NOT completed. **Owner:** project maintainers. **Start:** 2026-11-15.

## Canonical ownership

- [Architecture](ARCHITECTURE.md) defines the project-specific modules and boundaries.
- [Security](agent/security.md) owns authorization and privacy decisions.
- [Data contracts](agent/architecture.md) own schema, storage and consistency semantics.
- [Operations](agent/workflow.md) owns deployments, incidents and recovery.
- [Document triggers](living-docs.json) and the [quality journal](QUALITY_JOURNAL.md) record every implementation change.

## Invariants

1. Domain rules, sessions and storage operations have one typed owner and tests for all callers.
2. Failed reads never produce writable empty defaults or false zero metrics.
3. All writes validate identity, authorization and RLS on the server.
4. Provider and database failures are reported accurately; no unverified success or hidden migration side effect.
5. Maintenance is explicit, bounded, idempotent and monitored; R2 scans do not run on cold starts.
6. Data, security and runtime boundaries remain project-specific; no unsafe shared implementation copied from another site.
7. Source assertions supplement, never replace, actual negative-path integration and browser tests.

## Pending architecture acceptance

| Evidence | State |
| --- | --- |
| Complete dataflow/dependency map and module ownership review | Not yet verified |
| Every P0/P1 defect corrected with regression evidence | Not established |
| Real database/RLS/partial-write failure injection | Not fully verified |
| SLOs, telemetry, incident rollback and post-deploy smoke | Not yet audited |
| CI source-change docs coverage and evidence journal | Added in this PR; branch protection still required |

## Implementation rule

Reproduce, trace all affected callers, identify canonical owner, define failure behavior, test positive and negative cases, update matching docs and append a dated quality-journal entry. Include tests actually run, residual risks, deployment SHA when verified and an operator follow-up for unresolved problems. Human review must test whether the documentation is true.

## Current applicability

Zardonic uses its own Supabase schema and R2 media. Keep media reconciliation manually administered and never resurrect startup migrations.
