# Tips — non-transferable game points

## Do

- Make peer transfer a **hard error**, not a missing UI button.  
- Separate **trusted minter** (game authority) from **owner spend**.  
- Track lifetime earned and spent even when balance returns to zero (abuse analytics).  
- Cap a single earn (`MAX_AMOUNT`) and, in production, add per-quest rate limits.

## Don't

- Implement transfer as spend + earn on the recipient — that **is** a peer transfer.  
- Trust a minter **string** in action data. Use `require_auth` of a stored admin.  
- Credit balance from a random token notify without a dedicated bridge and first-receiver checks.

## Common mistakes

1. Letting the UI hide transfer while the contract still has the action.  
2. Reducing lifetimeEarned on spend (it is a counter, not a balance).  
3. Letting any caller pass `gameauth` twice and call it authenticated.  
4. Bridging to FT inside this ledger without burning virtual balance in the same action as the mint.

## Nice-to-have extensions (separate product, not a silent transfer)

| Idea | Note |
| --- | --- |
| Quest caps | Per-quest earn ceiling before the global max |
| Daily earn window | Compose with [time window](https://github.com/pixel-journey/px-invariant-kit) |
| FT bridge | Burn virtual + mint token atomically; do not add `transfer` here |
| Indexer events | Lifetime counters are not Hyperion history |

## Related

[token ledger](https://github.com/pixel-journey/px-token-balance-ledger) · [decimal supply](https://github.com/pixel-journey/px-token-ft-decimal-supply-simulator) · [invariant kit](https://github.com/pixel-journey/px-invariant-kit) · `px-contract-examples-vault` (private; not this public course)
