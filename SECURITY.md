# Security — virtual game balance

## Closed in tests

| Issue | Behavior |
| --- | --- |
| Untrusted earn | only trusted minter |
| Non-owner spend | refused |
| Overspend | insufficient balance |
| Peer transfer | **always** throws; balance unchanged |
| Non-positive / overflow earn | refused |
| Spend does not reduce lifetimeEarned | counter stays |

## Not closed (production)

| Concern | Guidance |
| --- | --- |
| Minter auth | `require_auth`, not a matching string |
| Stolen minter key | Per-quest caps and pause |
| RAM | Who pays for account rows |
| Bridge to FT | Separate contract; burn virtual + mint token atomically |
| Name charset | This lab allows `.` mid-name; kit is stricter |

## Attack angles

1. Hiding transfer in the UI while the contract still has the action.
2. Implementing transfer as spend + earn on the recipient (that **is** peer transfer).
3. Reducing `lifetimeEarned` on spend (it is a counter, not a balance).
4. Bridging to FT without burning virtual in the same action as the mint.

## Honesty limits

Points, not a token. No wasm. Related: [token ledger](https://github.com/pixel-journey/px-token-balance-ledger) · [invariant kit](https://github.com/pixel-journey/px-invariant-kit).
