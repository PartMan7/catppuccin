import { flavors } from '@catppuccin/palette';
import { MochaToNoir } from './generate.ts';

const Mocha = flavors.mocha;
const Noir = MochaToNoir(Mocha);

export default Noir;
