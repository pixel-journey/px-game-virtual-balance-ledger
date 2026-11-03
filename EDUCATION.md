# Education — virtual balance, no peer transfer

> **Rung:** `npm test` passes. This is not a token and not a bridge.  
> **The test is the rule.**

## What you should be able to do

| Level | After this file |
| --- | --- |
| Beginner | Say who may earn, who may spend, and why transfer always fails |
| Intermediate | Separate balance from lifetime counters, and name the checks `transfer` never reaches |
| Masterclass | Design a minter authority that is not a string compare, and name the bridge rules this repo refuses to include |

---

## Beginner — one scene

A game wants points that players can earn and spend inside the game, and cannot send to a market. Alice's account starts at zero. Only `gameauth` may add points. Only Alice may spend them. There is no "send to Bob" that works.

The tests:

| Action | Result |
| --- | --- |
| `earn` 100 from `gameauth` at time 1000 | balance 100, lifetimeEarned 100, lastEarnTs 1000 |
| `earn` from `evil` | `only trusted minter may earn` |
| Alice spends 20 after earning 50 | balance 30, lifetimeSpent 20 |
| Alice spends 31 of that 30 | `insufficient balance` |
| Bob spends Alice's points | `only owner may spend` |
| `transfer` to Bob | `peer transfer disabled` |

### Words

| Word | Meaning here |
| --- | --- |
| Balance | What spend can still take |
| Lifetime earned | Sum of successful earns. Not spendable by itself |
| Lifetime spent | Sum of successful spends. Not a second balance |
| Trusted minter | The string `earn` compares against. Tests use `gameauth` |
| Peer transfer | Always throws. That is the point of the ledger |

### Predict, then run

```bash
npm test
```

1. After earn 50 and spend 20, is lifetimeEarned 30 or 50? (50. Spend does not reduce it.)
2. Does spend change `lastEarnTs`? (No. Only `earn` writes it.)
3. Can the owner also be the minter? (The checks are separate. Nothing requires the names to differ or to match.)

---

## Intermediate — walk the file

Source: `invariants/ledger.ts`.

### `openAccount`

A well-formed name, balance 0, both lifetime counters 0, `lastEarnTs` 0. No row is stored in a table. The caller holds the object.

### `earn`

Amount must be a positive `bigint` at or below `MAX_AMOUNT` (`2^62 - 1`). Minter and trusted minter must be well-formed names and must be equal. `nowTs` must be a non-negative integer. The next balance must not exceed `MAX_AMOUNT` (`balance overflow`). Then balance and lifetimeEarned increase by the same amount, and `lastEarnTs` becomes `nowTs`.

### `spend`

Amount must be positive. Spender must equal `owner`. Amount must be `<= balance`. Balance decreases. Lifetime spent increases. Lifetime earned and `lastEarnTs` stay.

### `transfer`

The body is a throw. It does not check the amount, the recipient, or the balance. `transfer(account, "bob", 1n)` fails even if the amount would have been illegal for another reason. The first error you will see is `peer transfer disabled`.

### Attack → test

| Attack | Naive code | This lab | Test |
| --- | --- | --- | --- |
| Anyone prints points | Infinite quest currency | minter string must match | `refuses untrusted minter` |
| Spend someone else's row | Drain | `only owner may spend` | `non-owner cannot spend` |
| Spend more than balance | Wrap or debt | `insufficient balance` | `owner spends; insufficient refused` |
| Send points to a market | Price crash | `peer transfer disabled` | `always refuses peer transfer` |

---

## Masterclass — why a string named `gameauth` is not a minter

### Authority

`earn` checks `minter !== trustedMinter`. Both are arguments. A caller can pass `gameauth` twice. The tests do that, because they are testing the comparison, not a signature. On chain, the minter is `require_auth` of a stored admin or of the contract account, not a name in the action data that the user can set to whatever the table expects.

Spend must be `require_auth(owner)`. A name field called `spender` is the same class of bug.

### Why transfer stays a hard error

The moment points are transferable, a bug in `earn` becomes a market dump. Keeping them non-transferable means a bad earn inflates one account's in-game meter instead of a pool. Bridging to a fungible token is a different, gated quest (`px-game-virtual-to-ft-swap-bridge`). It is not this repo. A bridge needs its own supply cap, a burn of the virtual balance in the same action as the mint, and a rate limit. Adding `transfer` "temporarily" deletes the property the tests exist to lock.

### What you still need before this is a game contract

- RAM: who pays for the account row. `openAccount` here is free and local.
- Rate limits and per-quest caps so a stolen minter key cannot print `MAX_AMOUNT` in one action. The lab only checks the cap.
- No `on_notify` that credits balance because somebody sent you a token, unless that notify is the bridge and it has first-receiver checks.
- Events you can index. Lifetime counters are the teaching substitute. They are not a Hyperion history.

### Exercise

1. Earn 10, spend 10. What is balance, lifetimeEarned, lifetimeSpent? (0, 10, 10.)
2. Why is `transfer` not implemented as `spend` plus `earn` on the recipient? (Because that would be a peer transfer. The function is specified to throw.)
3. Which of these is in the repo: a WharfKit session, a minter key, an FT mint? (None.)

---

## What this course will not teach

- How to swap the balance into a tradable token
- That the minter string is authenticated
- A multi-account table
