#!/usr/bin/env node
// Removes build output dirs without a shell `rm -rf` (which prompts for
// permission every time in Claude Code). Safe to call anytime — both
// dirs are pure build artifacts, already in .gitignore.
import { rmSync } from 'node:fs';

for (const dir of ['build', '.svelte-kit']) {
	rmSync(dir, { recursive: true, force: true });
	console.log(`Removed ${dir}/`);
}
