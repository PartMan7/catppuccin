import Noir from './index.ts';

import { flavors } from '@catppuccin/palette';
import { fromEntries, keys, values } from './utils/object.ts';
import type { HexMap } from './types.ts';

const Mocha = flavors.mocha;

const hexMap: HexMap = fromEntries(
	keys(Mocha.colors).map(colorName => [
		colorName,
		{ from: Mocha.colors[colorName].hex.replace('#', ''), to: Noir.colors[colorName].hex.replace('#', '') },
	])
);

export function replaceInText(input: string): string {
	return values(hexMap).reduce(
		(current, { from: mocha, to: noir }) => current.replaceAll(new RegExp(`\\b${mocha}\\b`, 'g'), noir),
		input
	);
}
