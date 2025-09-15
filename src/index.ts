import { flavors } from '@catppuccin/palette';
import { MochaToNoir } from './generate.ts';
import * as fs from 'node:fs';

const Mocha = flavors.mocha;
const Noir = MochaToNoir(Mocha);

export default Noir;

fs.writeFileSync(`${import.meta.dirname}/index.json`, JSON.stringify(Noir, null, 2));
