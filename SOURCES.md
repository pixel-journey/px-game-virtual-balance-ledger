# Sources

| Source | Use |
| --- | --- |
| [docs.wax.io](https://docs.wax.io/) | Contract patterns |
| [eosio.token](https://github.com/eosio/eosio.contracts) | What a **transferable** token looks like — this lab is the opposite |
| [docs.eosnetwork.com](https://docs.eosnetwork.com/) | require_auth |

**Product facts:** peer transfer **always** throws. `spend` reduces spendable balance and does **not** reduce `lifetimeEarned`. Overflow cap is `2^62 - 1`. A marketplace listing of these points is a different product.

## Related labs

| Lab | Topic |
| --- | --- |
| [token ledger](https://github.com/pixel-journey/px-token-balance-ledger) | Peer transfer allowed; sum === supply |
| [no-loss pool](https://github.com/pixel-journey/px-rng-no-loss-prize-pool) | Principal vs yield |
| [masterchef](https://github.com/pixel-journey/px-stake-nft-custodial-masterchef) | Emission index, not points |
| [invariant kit](https://github.com/pixel-journey/px-invariant-kit) | Shared gates |
| [treasury path](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/TREASURY-TOKEN-LEARNING-PATH.md) | Step 13 |
