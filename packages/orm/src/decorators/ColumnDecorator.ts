import { InvalidColumnNameError } from '../errors/InvalidColumnNameError';
import type { BaseEntity } from '../entities/BaseEntity';

export const kColumnProperty = Symbol('column-names-decorator');

export function Column(type: string, options?: ColumnOptions): MethodDecorator;
export function Column(options: ColumnOptionsWithType): MethodDecorator;
export function Column(typeOrOptions: string | ColumnOptionsWithType, options?: ColumnOptions): MethodDecorator {
	return (target, property) => {
		if (typeof property !== 'string') {
			throw new InvalidColumnNameError(target as typeof BaseEntity, property);
		}

		const parsed: ColumnSettings = typeof typeOrOptions === 'string' ? { ...(options ?? {}), type: typeOrOptions, name: property, property } : { ...typeOrOptions, name: property, property };

		const properties = Reflect.get(target, kColumnProperty) as Map<string, ColumnSettings>;
		if (properties) {
			properties.set(property, parsed);
		} else {
			Reflect.defineProperty(target, kColumnProperty, {
				value: new Map([[property, parsed]]),
				enumerable: false,
				writable: false
			});
		}
	};
}

export interface ColumnOptions {
	enum?: readonly string[];
	name?: string;
}

export interface ColumnOptionsWithType extends ColumnOptions {
	type: string;
}

export interface ColumnSettings extends ColumnOptionsWithType {
	name: string;
	property: string;
}
