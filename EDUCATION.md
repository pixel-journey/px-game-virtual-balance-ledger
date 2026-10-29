# Education

Virtual balances let games meter economy **without** a transferable token dump surface.

| Action | Who | Effect |
|--------|-----|--------|
| earn | trusted minter only | +balance, +lifetimeEarned, lastEarnTs |
| spend | owner only | −balance, +lifetimeSpent |
| transfer | nobody | always error |

Bridging to a tradable FT is a **separate**, heavily gated quest so a quest bug cannot empty a pool in one block.
