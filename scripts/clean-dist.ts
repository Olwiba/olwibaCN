// Explicit, sequential dist/ wipe before tsup runs. tsup.config.ts defines
// two configs (ui + email) that build concurrently from one `tsup`
// invocation; per-config `clean: true` races against the other config's
// writes into the same dist/ tree (email's output nests under dist/email).
// Cleaning here, once, before either config starts, removes the race.
import { rmSync } from 'node:fs';

rmSync('dist', { recursive: true, force: true });
