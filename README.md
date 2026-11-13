# Earn and spend, with no peer transfer

> **Domain:** game virtual balance  
> **Sources:** [SOURCES.md](SOURCES.md)  
> **Catalog:** [px-contract-examples-vault](https://github.com/pixel-journey/px-contract-examples-vault)  
> **Path:** [TREASURY-TOKEN-LEARNING-PATH.md](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/TREASURY-TOKEN-LEARNING-PATH.md)

**Goal:** A **non-transferable** game balance: trusted minter earns, owner spends, peer transfer always fails. Tracks lifetime earned/spent.

**Code under test:** `npm test`. Not a fungible token, not an FT bridge, not wasm.

**Contrast:** [px-token-balance-ledger](https://github.com/pixel-journey/px-token-balance-ledger) allows peer transfer and conserves supply.

## Learning materials

| Doc | Role |
| --- | --- |
| [EDUCATION.md](EDUCATION.md) | Beginner → masterclass |
| [WORKED-EXAMPLES.md](WORKED-EXAMPLES.md) | Earn, spend, transfer refused |
| [TIPS.md](TIPS.md) | Hard error vs missing feature |
| [SECURITY.md](SECURITY.md) | Minter vs owner |
| [SOURCES.md](SOURCES.md) | Official + related |

## What is true (executed)

| Rule | Result |
| --- | --- |
| Trusted minter earns | balance + lifetimeEarned |
| Owner spends | balance down; lifetimeSpent up |
| Peer `transfer` | always `peer transfer disabled` |

```bash
npm test
```

MIT — Pixel Journey
