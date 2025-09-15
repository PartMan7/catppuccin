import type { AnsiColors, ColorName } from '@catppuccin/palette';

export type HexMap = Record<ColorName, { from: string; to: string }>;

export type AnsiNames = keyof AnsiColors<unknown>;
