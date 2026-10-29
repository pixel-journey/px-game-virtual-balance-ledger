import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { openAccount, earn, spend, transfer } from "./ledger.ts";

const minter = "gameauth";

describe("earn / spend", () => {
  it("earns with trusted minter and tracks lifetime", () => {
    let a = openAccount("alice");
    a = earn(a, 100n, 1_000, minter, minter);
    assert.equal(a.balance, 100n);
    assert.equal(a.lifetimeEarned, 100n);
    assert.equal(a.lastEarnTs, 1_000);
  });

  it("refuses untrusted minter", () => {
    const a = openAccount("alice");
    assert.throws(() => earn(a, 10n, 1, "evil", minter), /trusted minter/);
  });

  it("owner spends; insufficient refused", () => {
    let a = openAccount("alice");
    a = earn(a, 50n, 1, minter, minter);
    a = spend(a, 20n, "alice");
    assert.equal(a.balance, 30n);
    assert.equal(a.lifetimeSpent, 20n);
    assert.throws(() => spend(a, 31n, "alice"), /insufficient/);
  });

  it("non-owner cannot spend", () => {
    let a = openAccount("alice");
    a = earn(a, 10n, 1, minter, minter);
    assert.throws(() => spend(a, 1n, "bob"), /only owner/);
  });
});

describe("transfer", () => {
  it("always refuses peer transfer", () => {
    const a = openAccount("alice");
    assert.throws(() => transfer(a, "bob", 1n), /peer transfer disabled/);
  });
});
