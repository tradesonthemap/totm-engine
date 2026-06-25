# totm-engine — TradesOnTheMap site engine (Job A factory)

Production engine for mass-producing per-client static trade sites. **Git-first, CI-gated, zero-JS by construction, PII-never-in-git.** Lives in the dedicated `tradesonthemap` org (the client trust domain) per bws ADR-0014 / Council Rolls SCR-0001.

## What this is (plain English)
The Python data brain emits one **display-only** JSON record per client; **Astro renders it** to a fast static site. One engine, many clients. The renderer holds no business logic and never sees PII — it draws what the (PII-free) data says. Proves Ark Stack Doctrine Job-A (KB-DCT-ADR-REF-0008).

## Git-first workflow (non-negotiable)
Repo is the origin. Never hand-edit on a box. Never push straight to `main`.
`branch → edit src/data/clients.json → push → PR → CI gate → merge (human) → deploy`.
On a PR, CI runs **pii-gate + build only**. Deploy fires **only on merge to `main`**.

## CI gates (teeth)
1. **pii-gate** (`.github/workflows/ci.yml`) — fail-closed: blocks PII field names + raw UK mobile/email in tracked files. The structural fence's CI teeth (checklist Row 5 interim). PII lives in the **TOTM vault**, never git.
2. **build** — `astro build`; fails closed on bad data / unknown genome CODE.
3. **deploy** — Cloudflare Pages, on merge to main only.

## Data contract — display only, NEVER PII
`src/data/clients.json`: `business_name`, trade, areas, `business_number`, copy, `dna` (genome: family/hero/palette/accent). **Forbidden in git:** legal_name, personal mobile/email, Gas-Safe no, registrant, Stripe customer/sub ids → TOTM vault (ADR-0014). Public contact uses `business_number` only.

## Fail-loud genome
`src/pages/[slug].astro` maps `dna.hero` CODE → layout via a **closed registry**; unknown CODE throws → CI fails closed.

## Status / open
- Org `tradesonthemap` on **FREE** plan → enforced branch protection needs **Team ($4)**; required before any client-content repo / client one (Row 1).
- CF deploy needs `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` secrets; prod target = CF Pages **Git integration** (no token in CI).
- Reference lineage: superseded `arkaicolabs/totm-site-template` (the proving template) — this is the canonical engine now.

## Governance
Doctrine: KB-DCT-ADR-REF-0008, bws ADR-0014, Rolls SCR-0001/0002. Schema: Elif · Security: Liis · Docs: Helena.

## Version history
| Version | Date | Status | Summary |
|---|---|---|---|
| 0.1.0 | 2026-06-25 | engine | Git-first scaffold in the real org via PR. Factory + 0-JS + fail-loud genome + PII-gate CI. |
