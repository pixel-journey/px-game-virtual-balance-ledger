# Security — virtual balance

## Closed in tests

| Issue | Behavior |
| --- | --- |
| Untrusted earn | only trusted minter |
| Non-owner spend | refused |
| Overspend | insufficient balance |
| Peer transfer | always disabled |
| Non-positive / overflow earn | refused |

## Not closed

| Concern | Guidance |
| --- | --- |
| Minter auth | require_auth, not a matching string |
| Stolen minter key | Per-quest caps and pause |
| RAM | Who pays for account rows |
| Bridge | Separate contract; burn + mint atomic |

No token and no wasm in this repository.
