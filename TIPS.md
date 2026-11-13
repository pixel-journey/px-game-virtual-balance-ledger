# Tips — non-transferable balances

- Make peer transfer a **hard error**, not a missing UI button.
- Separate **trusted minter** (game server / contract authority) from **owner spend**.
- Track lifetime earned/spent for anti-abuse analytics even if balance can go to zero.
- If you later need tradable currency, use a real token ledger — do not “add transfer” here without a new product decision.

Related: [token ledger](https://github.com/pixel-journey/px-token-balance-ledger) · [treasury path](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/TREASURY-TOKEN-LEARNING-PATH.md).
