# Worked examples — virtual game balance

## Example A — earn then spend

```text
a = openAccount("alice")
a = earn(a, 100n, nowTs: 1000, minter: "game", trustedMinter: "game")
// balance 100, lifetimeEarned 100, lastEarnTs 1000
a = spend(a, 40n, "alice")
// balance 60, lifetimeSpent 40, lifetimeEarned still 100
```

## Example B — only trusted minter earns

`earn(..., minter: "eve", trustedMinter: "game")` → `only trusted minter may earn`.

## Example C — only owner spends

`spend(a, 1n, "bob")` → `only owner may spend`.

## Example D — insufficient balance

Spend more than balance → refused; lifetimeSpent unchanged.

## Example E — peer transfer always fails

`transfer(a, "bob", 1n)` → `peer transfer disabled` (defining property).

## Example F — contrast with FT ledger

[px-token-balance-ledger](https://github.com/pixel-journey/px-token-balance-ledger) **allows** peer transfer and conserves supply. This lab models points / energy / soft currency that must not be P2P traded on-contract.
