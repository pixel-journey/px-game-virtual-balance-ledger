# Security notes — virtual balance

| Mitigated | Behavior |
| --- | --- |
| Non-minter earn | refused |
| Non-owner spend | refused |
| Over-spend | refused |
| Peer transfer | always refused |
| Overflow | balance/amount caps |

Production: `require_auth` for minter and owner; decide whether minter is a contract account or a permission; never treat this as an FT that can be listed on a market without a separate token design.
