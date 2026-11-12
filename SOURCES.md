# Official sources

Virtual game balances are **dapp policy**. They are not fungible tokens unless you bridge them.

| Source | Use |
| --- | --- |
| [docs.wax.io](https://docs.wax.io/) | WAX development |
| [docs.eosnetwork.com](https://docs.eosnetwork.com/) | Actions, permissions |
| [eosio.token reference](https://github.com/eosio/eosio.contracts) | Contrast: transferable FT |
| [px-token-balance-ledger](https://github.com/pixel-journey/px-token-balance-ledger) | Real transfer ledger |
| [px-invariant-kit](https://github.com/pixel-journey/px-invariant-kit) | Shared name / math |

## Domain map

| Repo | Role |
| --- | --- |
| **This repo** | Earn/spend; peer transfer always fails |
| [px-token-balance-ledger](https://github.com/pixel-journey/px-token-balance-ledger) | Transferable balances |
| Bridge quests (if present) | Virtual → FT swap — not this lab |
