# Earn and spend, with no peer transfer

> **Trust:** private educational lab (Tier B)  
> **Quest:** 124 — virtual balance ledger  
> **Vault:** [px-contract-examples-vault](https://github.com/pixel-journey/px-contract-examples-vault)

**One-sentence goal:** Teach a **non-transferable** game balance: a trusted minter earns, the owner spends, and a peer transfer always fails.

**Real code:** `npm test`. **Not** a fungible token, **not** an FT bridge, **not** wasm.

## What you can learn

- Why a quest currency that can be sent to another account is a dump surface.
- Why earn and spend are different authorities: minter versus owner.
- Why lifetime earned and lifetime spent are counters, not the spendable balance.
- Why disabling `transfer` is a property of the ledger, not a missing feature.

## What is actually in the repo

| Piece | Role |
| --- | --- |
| `invariants/ledger.ts` | `openAccount`, `earn`, `spend`, `transfer` |
| `invariants/ledger.test.ts` | Executed claims |
| `EDUCATION.md` | Who may call each action |
| `SECURITY.md` | Minter key and the bridge gap |

## What is true (executed)

Trusted minter name in the tests is `gameauth`.

| Rule | Result |
| --- | --- |
| `earn` `100n` at ts `1000` from `gameauth` | balance `100`, lifetimeEarned `100`, lastEarnTs `1000` |
| `earn` from `evil` | `only trusted minter may earn` |
| Owner spends `20n` after earning `50n` | balance `30`, lifetimeSpent `20` |
| Spend `31n` of that `30n` | `insufficient balance` |
| `bob` spends Alice's balance | `only owner may spend` |
| `transfer` to `bob` | `peer transfer disabled` |

## The rule, in order

```text
earn:   minter must equal trustedMinter
        balance and lifetimeEarned increase by amount
        lastEarnTs becomes nowTs
spend:  spender must equal owner
        amount must be <= balance
        balance decreases; lifetimeSpent increases
transfer: always throws, before any balance move
```

Amounts must be a positive `bigint` at or below `MAX_AMOUNT` (`2^62 - 1`). A new balance above that cap throws `balance overflow`. Account names are a format check (`a-z`, `1-5`, `.`, length 1–12), not a proof the account exists.

```ts
import { openAccount, earn, spend, transfer } from "./invariants/ledger.ts";

const minter = "gameauth";
let a = openAccount("alice");
a = earn(a, 50n, 1, minter, minter);
a = spend(a, 20n, "alice");
// a.balance === 30n, a.lifetimeSpent === 20n

transfer(a, "bob", 1n); // throws "peer transfer disabled"
```

## Edge cases

- Zero and negative amounts are refused on earn and spend. The transfer function does not reach an amount check. It always throws.
- Spend does not change `lastEarnTs` or `lifetimeEarned`.
- Earn does not check that the minter is the account owner. The owner can be a different name from the minter.
- There is one account object. No second account is credited, because transfer never runs.

## Best practice and the opposite

**Do** keep earn behind a trusted minter and spend behind the owner.  
**Do** leave peer transfer as a hard error if the point of the balance is a game meter.

**Do not** treat lifetime earned as spendable. Spendable is `balance`.  
**Do not** call this a bridge. Turning the balance into a tradable token is a different quest (`px-game-virtual-to-ft-swap-bridge`) and is not in this repo.

## Live path, not shipped

```
earn / spend / transfer-refused   [tested]
    → contract auth for the minter     [not in this repo]
    → rate limits                       [not in this repo]
    → swap into a transferable FT       [not in this repo]
```

See [EDUCATION.md](EDUCATION.md) and [SECURITY.md](SECURITY.md).

## Related

- `px-game-virtual-to-ft-swap-bridge` — gated bridge, not this lab
- Vault index: `px-contract-examples-vault`

## Run

```bash
npm test
```

MIT — Pixel Journey
