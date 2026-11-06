import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  openAccount,
  earn,
  spend,
  transfer,
  MAX_AMOUNT,
  assertName,
} from "./ledger.ts";

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

  it("spend does not change lastEarnTs or lifetimeEarned", () => {
    let a = openAccount("alice");
    a = earn(a, 50n, 42, minter, minter);
    a = spend(a, 10n, "alice");
    assert.equal(a.lastEarnTs, 42);
    assert.equal(a.lifetimeEarned, 50n);
    assert.equal(a.lifetimeSpent, 10n);
    assert.equal(a.balance, 40n);
  });

  it("lifetime earned is not spendable beyond balance", () => {
    let a = openAccount("alice");
    a = earn(a, 100n, 1, minter, minter);
    a = spend(a, 100n, "alice");
    assert.equal(a.balance, 0n);
    assert.equal(a.lifetimeEarned, 100n);
    assert.throws(() => spend(a, 1n, "alice"), /insufficient/);
  });

  it("refuses zero and non-positive earn amounts", () => {
    const a = openAccount("alice");
    assert.throws(() => earn(a, 0n, 1, minter, minter), /positive/);
  });

  it("refuses zero spend amount", () => {
    let a = openAccount("alice");
    a = earn(a, 10n, 1, minter, minter);
    assert.throws(() => spend(a, 0n, "alice"), /positive/);
  });

  it("refuses amount above MAX_AMOUNT", () => {
    const a = openAccount("alice");
    assert.throws(() => earn(a, MAX_AMOUNT + 1n, 1, minter, minter), /MAX_AMOUNT/);
  });

  it("refuses balance overflow", () => {
    let a = openAccount("alice");
    a = earn(a, MAX_AMOUNT, 1, minter, minter);
    assert.throws(() => earn(a, 1n, 2, minter, minter), /balance overflow/);
  });

  it("refuses a bad nowTs", () => {
    const a = openAccount("alice");
    assert.throws(() => earn(a, 1n, -1, minter, minter), /bad nowTs/);
    assert.throws(() => earn(a, 1n, 1.5, minter, minter), /bad nowTs/);
  });
});

describe("transfer", () => {
  it("always refuses peer transfer", () => {
    const a = openAccount("alice");
    assert.throws(() => transfer(a, "bob", 1n), /peer transfer disabled/);
  });

  it("refuses peer transfer even with a positive balance", () => {
    let a = openAccount("alice");
    a = earn(a, 50n, 1, minter, minter);
    assert.throws(() => transfer(a, "bob", 10n), /peer transfer disabled/);
    assert.equal(a.balance, 50n);
  });
});

describe("names", () => {
  it("refuses a bad account name on open", () => {
    assert.throws(() => openAccount("Alice"), /bad account name/);
    assert.throws(() => openAccount(".alice"), /bad account name/);
  });

  it("accepts a well-formed name", () => {
    assert.equal(assertName("alice"), "alice");
  });
});
