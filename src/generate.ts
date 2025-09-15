import { type Color, converter, formatHex, type Oklab } from 'culori';

import type {
	AnsiColorFormat,
	AnsiColorGroups,
	CatppuccinAnsiColors,
	CatppuccinColors,
	CatppuccinFlavor,
	ColorFormat,
	ColorName,
} from '@catppuccin/palette';
import { entries, fromEntries } from './utils/object.ts';

const COLORS_TO_NOIRIFY: ColorName[] = ['surface2', 'surface1', 'surface0', 'base', 'mantle', 'crust'];

const toOklab = converter('oklab');

function noirify<C extends Color | string>(input: C): C {
	const oklab = toOklab(input)!;
	const noirOklab: Oklab = { ...oklab, b: (oklab.b ?? 0) / 6 };
	return (typeof input === 'string' ? formatHex(noirOklab) : converter(input.mode)(noirOklab)) as C;
}

function noirifyColorFormat(input: ColorFormat): ColorFormat {
	return {
		name: input.name,
		accent: input.accent,
		order: input.order + 1,
		hex: noirify(input.hex),
		hsl: noirify({ mode: 'hsl', ...input.hsl }),
		rgb: noirify({ mode: 'rgb', ...input.rgb }),
	};
}

function noirifyAnsiColorGroups(input: AnsiColorGroups, noirifyFormat: (format: AnsiColorFormat) => AnsiColorFormat): AnsiColorGroups {
	return {
		name: input.name,
		order: input.order,
		normal: noirifyFormat(input.normal),
		bright: noirifyFormat(input.bright),
	};
}

function noirifyEntries(entrySet: CatppuccinColors): CatppuccinColors {
	return fromEntries(
		entries(entrySet).map(([key, value]) => [key, COLORS_TO_NOIRIFY.includes(key) ? noirifyColorFormat(value) : value])
	);
}

function noirifyAnsiEntries(
	entrySet: CatppuccinAnsiColors,
	noirify: (format: AnsiColorFormat) => AnsiColorFormat
): CatppuccinAnsiColors {
	return fromEntries(entries(entrySet).map(([key, value]) => [key, noirifyAnsiColorGroups(value, noirify)]));
}

export function MochaToNoir(Mocha: CatppuccinFlavor): CatppuccinFlavor {
	const noirColors = noirifyEntries(Mocha.colors);

	const noirAnsiColors = noirifyAnsiEntries(Mocha.ansiColors, format =>
		COLORS_TO_NOIRIFY.some(colorName => Mocha.colors[colorName].hex === format.hex)
			? {
					name: format.name,
					code: format.code,
					hex: noirify(format.hex),
					hsl: noirify({ mode: 'hsl', ...format.hsl }),
					rgb: noirify({ mode: 'rgb', ...format.rgb }),
				}
			: format
	);

	return {
		name: 'Noir',
		emoji: '🌑',
		dark: true,
		order: 4,
		colors: noirColors,
		colorEntries: entries(noirColors),
		ansiColors: noirAnsiColors,
		ansiColorEntries: entries(noirAnsiColors),
	};
}
