/**
 * Virtual game currency ledger (educational).
 * Earn and spend on-contract. No peer transfer.
 * Tracks lifetime earned, spent, and last_earn_ts.
 */

export type Account = {
  owner: string;
  balance: bigint;
  lifetimeEarned: bigint;
  lifetimeSpent: bigint;
  lastEarnTs: number;
};

const NAME = /^[a-z1-5.]{1,12}$/;
export const MAX_AMOUNT = 4_611_686_018_427_387_903n;

export function assertName(name: string): string {
  if (!NAME.test(name) || name.startsWith(".") || name.endsWith(".")) {
    throw new Error("bad account name");
  }
  return name;
}

export function assertAmount(amount: bigint): bigint {
  if (typeof amount !== "bigint" || amount <= 0n) throw new Error("amount must be positive");
  if (amount > MAX_AMOUNT) throw new Error("amount exceeds MAX_AMOUNT");
  return amount;
}

export function openAccount(owner: string): Account {
  assertName(owner);
  return {
    owner,
    balance: 0n,
    lifetimeEarned: 0n,
    lifetimeSpent: 0n,
    lastEarnTs: 0,
  };
}

/** Only a trusted minter/game authority should call earn in production. */
export function earn(
  acct: Account,
  amount: bigint,
  nowTs: number,
  minter: string,
  trustedMinter: string
): Account {
  assertAmount(amount);
  assertName(minter);
  assertName(trustedMinter);
  if (minter !== trustedMinter) throw new Error("only trusted minter may earn");
  if (!Number.isInteger(nowTs) || nowTs < 0) throw new Error("bad nowTs");
  const nextBal = acct.balance + amount;
  if (nextBal > MAX_AMOUNT) throw new Error("balance overflow");
  return {
    ...acct,
    balance: nextBal,
    lifetimeEarned: acct.lifetimeEarned + amount,
    lastEarnTs: nowTs,
  };
}

/** Spend reduces balance; refused if insufficient. */
export function spend(acct: Account, amount: bigint, spender: string): Account {
  assertAmount(amount);
  assertName(spender);
  if (spender !== acct.owner) throw new Error("only owner may spend");
  if (amount > acct.balance) throw new Error("insufficient balance");
  return {
    ...acct,
    balance: acct.balance - amount,
    lifetimeSpent: acct.lifetimeSpent + amount,
  };
}

/** Peer transfer always fails — defining property of this ledger. */
export function transfer(_from: Account, _to: string, _amount: bigint): never {
  throw new Error("peer transfer disabled");
}
