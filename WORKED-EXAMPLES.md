# Worked examples — virtual game balance

Points, not a token. Peer transfer always throws. Trusted minter in the tests is `gameauth`.

`MAX_AMOUNT` is `4_611_686_018_427_387_903` (`2^62-1`).

## Earn then spend

```text
openAccount("alice")
earn(100n, nowTs 1000, minter gameauth)
→ balance 100, lifetimeEarned 100, lastEarnTs 1000

spend(40n, "alice")
→ balance 60, lifetimeSpent 40, lifetimeEarned still 100
```

Another path in the tests: earn `50` at `nowTs` `42`, spend `10`.

```text
balance 40, lifetimeSpent 10, lifetimeEarned 50, lastEarnTs still 42
```

Spend does not touch `lastEarnTs` or `lifetimeEarned`.

## Who may move the number

| Call | Result |
| --- | --- |
| `earn` with minter `evil` | `only trusted minter may earn` |
| `spend` by `bob` on alice's account | `only owner may spend` |
| earn `50`, spend `20`, spend `31` | balance stays `30`; `insufficient balance` |
| earn `100`, spend `100`, spend `1` | balance `0`, lifetimeEarned still `100`; lifetime is not a second balance |
| earn or spend `0n` | `amount must be positive` |

## Ceiling

| Call | Result |
| --- | --- |
| earn `MAX_AMOUNT + 1` | `amount exceeds MAX_AMOUNT` |
| earn `MAX_AMOUNT`, then earn `1` | `balance overflow` |
| `nowTs` `-1` or `1.5` | `bad nowTs` |

## Peer transfer

`transfer` throws `peer transfer disabled` on an empty account and on a balance of `50`. The balance is unchanged. There is no success path.

## Names

`openAccount("Alice")` and `openAccount(".alice")` throw `bad account name`. `alice` is accepted. Dots in the middle are allowed by the regex; leading and trailing dots are not. That is looser than [px-invariant-kit](https://github.com/pixel-journey/px-invariant-kit) `name.ts`.

## Contrast

[px-token-balance-ledger](https://github.com/pixel-journey/px-token-balance-ledger) allows peer transfer and keeps `sum(balances) === supply`. This lab has no supply. Deleting points does not burn a token.
