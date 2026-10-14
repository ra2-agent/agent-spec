import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { manifest, registry, policy, readJson, requireThat as ok } from './validation.mjs';

const base=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const root=path.resolve(process.argv[2] || base);
policy(base,root,'agent-spec');
const schema=readJson(path.join(root,'schemas/agent.schema.json'));
ok(schema.$schema==='https://json-schema.org/draft/2020-12/schema','unsupported schema draft');
const item=manifest(readJson(path.join(root,'examples/agent.json'))); assert.deepEqual([...schema.required].sort(),Object.keys(item).sort());



console.log('agent-spec: static checks passed (no Agent executed).');
