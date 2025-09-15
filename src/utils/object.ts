export function keys<O extends Record<string, unknown>>(object: O): (keyof O)[] {
	return Object.keys(object) as (keyof O)[];
}

export function values<O extends Record<string, unknown>>(object: O): O[keyof O][] {
	return Object.values(object) as O[keyof O][];
}

export function entries<O extends Record<string, unknown>>(object: O): { [K in keyof O]: [K, O[K]] }[keyof O][] {
	return Object.entries(object) as [keyof O, O[keyof O]][];
}

export function fromEntries<K extends string, V>(entries: [K, V][]): Record<K, V> {
	return Object.fromEntries(entries) as Record<K, V>;
}
