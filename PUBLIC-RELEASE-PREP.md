# Public Release Prep

Checklist to complete before making `olwibaCN` a public repository.

## MUST Fix

- [ ] Revoke current PAT token at github.com/settings/tokens (precaution — token was gitignored throughout, never committed, but should be rotated before going public)
- [x] Add MIT `LICENSE` file to repo root
- [ ] Decide: stay on GitHub Packages or switch to npmjs (see decision below — affects items 4 and 5)
- [ ] Update `publishConfig.registry` in `package.json` (currently `https://npm.pkg.github.com/`)
- [ ] Update `publish-package.yml` workflow registry target and auth setup
- [ ] Clean `bunfig.toml` — remove hardcoded token entries (file is gitignored but exists locally; once on npmjs, scoped token entries are unnecessary for public install)

## SHOULD Fix

- [x] Add `DISCORD_WEBHOOK_URL=` to `.env.example`
- [x] Add `homepage` field to `package.json` (e.g. `https://cn.olwiba.com`)
- [x] Add MIT license badge to `README.md`
- [x] Add short contributing section to `README.md`

## Registry Decision

### GitHub Packages (current)
- Requires a GitHub token to `bun install` / `npm install` — even for public read
- Contributors must configure `bunfig.toml` or `.npmrc` with a PAT before they can install deps
- Standard for private/internal packages

### npmjs.com
- Zero-config install for any consumer: `bun add @olwiba/cn` just works
- No token needed to read/install
- Standard for OSS packages
- Requires an npmjs account and an `NPM_TOKEN` secret in CI instead of `PACKAGES_TOKEN`

**Recommendation:** switch to npmjs. This is an OSS package. Requiring a GitHub token to install breaks the basic expectation of any open source library.

## Post-Decision Workflow Changes (if switching to npmjs)

1. Create npmjs account / org for `@olwiba` scope
2. Generate `NPM_TOKEN` (automation token) from npmjs
3. Add `NPM_TOKEN` to GitHub repo secrets
4. Update `publish-package.yml`:
   - Change `registry-url` to `https://registry.npmjs.org`
   - Change `NODE_AUTH_TOKEN` to `${{ secrets.NPM_TOKEN }}`
   - Remove the `Configure GitHub Packages auth` step
5. Update `package.json` `publishConfig.registry` to `https://registry.npmjs.org/`
6. Update `bunfig.toml` (or remove `@olwiba` scope entry — no token needed for public npmjs)
7. Retire `PACKAGES_TOKEN` secret from repo once confirmed

## Notes

- `.env`, `.env.production`, `bunfig.toml` are all gitignored — no secrets in git history (confirmed via `git log`)
- `README.md` is in good shape — covers install, usage, exports, dev commands, release flow
- `package.json` already has `"license": "MIT"` — just needs the actual `LICENSE` file
