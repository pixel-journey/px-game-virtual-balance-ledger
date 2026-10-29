# px-game-virtual-balance-ledger

> **Trust:** private educational lab (Tier B)  
> **Quest:** 124 — virtual balance ledger  
> **Vault:** [px-contract-examples-vault](https://github.com/pixel-journey/px-contract-examples-vault)

**One-sentence goal:** Teach a **non-transferable** on-contract balance: earn (trusted minter), spend (owner), **no peer transfer**, with lifetime earned/spent telemetry.

**Real code:** `npm test`. **Not** a bridge to FT and **not** wasm.

---

## What is true (executed)

| Rule | Result |
|------|--------|
| Trusted minter earn | balance + lifetimeEarned |
| Untrusted minter | refused |
| Owner spend | ok; overspend refused |
| Peer transfer | always refused |

```bash
npm test
```

Bridge patterns live in later quests (`px-game-virtual-to-ft-swap-bridge`).

## License

MIT — Pixel Journey
