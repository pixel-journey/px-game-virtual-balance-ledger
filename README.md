# Earn and spend, with no peer transfer

> **Trust:** private educational lab (Tier B)  
> **Domain:** game virtual balance  
> **Sources:** [SOURCES.md](SOURCES.md)  
> **Vault:** [px-contract-examples-vault](https://github.com/pixel-journey/px-contract-examples-vault)

**One-sentence goal:** Teach a **non-transferable** game balance: a trusted minter earns, the owner spends, and a peer transfer always fails.

**Real code:** `npm test`. **Not** a fungible token, **not** an FT bridge, **not** wasm.

Docs: [docs.wax.io](https://docs.wax.io/). Contrast with a real token ledger: [px-token-balance-ledger](https://github.com/pixel-journey/px-token-balance-ledger).

## What is true (executed)

| Rule | Result |
| --- | --- |
| Trusted minter earns | balance + lifetimeEarned |
| Owner spends | balance down; lifetimeSpent up |
| Peer `transfer` | always `peer transfer disabled` |

## Run

```bash
npm test
```

MIT — Pixel Journey
