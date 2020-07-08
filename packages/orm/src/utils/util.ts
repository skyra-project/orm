export type Arr = readonly unknown[];
// export type Fn = (...args: readonly any[]) => any;
// export type Ctor = new (...args: readonly any[]) => any;
export type Fn<A extends Arr = readonly any[], R = any> = (...args: A) => R;
export type Ctor<A extends Arr = readonly any[], R = any> = new (...args: A) => R;

export function map<V, R>(iterator: IterableIterator<V>, cb: (value: V) => R): R[] {
	const mapped: R[] = [];
	for (const value of iterator) {
		mapped.push(cb(value));
	}

	return mapped;
}

export function isClass(value: unknown): value is Ctor {
	return typeof value === 'function' && typeof value.prototype === 'object';
}

export function classExtends<T extends Ctor>(value: Ctor, base: T): value is T {
	let ctor: Ctor | null = value;
	while (ctor !== null) {
		if (ctor === base) return true;
		ctor = Object.getPrototypeOf(ctor);
	}

	return false;
}

export function scanExportClasses<T extends Ctor>(exports: Record<string, unknown>, ctor: T): T[] {
	const mapped: T[] = [];
	for (const value of Object.values(exports)) {
		if (isClass(value) && classExtends(value, ctor)) mapped.push(value);
	}

	return mapped;
}

export const loadModule = require;
