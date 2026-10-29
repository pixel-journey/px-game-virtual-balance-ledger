# Security notes

| Issue | Lab mitigation |
|-------|----------------|
| Anyone mints virtual | trusted minter check |
| Peer dump / market | transfer disabled |
| Spend others' balance | owner-only spend |
| Overspend | balance check |

Production needs careful minter key / contract auth design and rate limits before any FT bridge.
