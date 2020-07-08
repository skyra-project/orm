import { InvalidColumnNameError } from '../errors/InvalidColumnNameError';
import type { BaseEntity } from '../entities/BaseEntity';

export const kColumnProperty = Symbol('column-names-decorator');

export function Column(): MethodDecorator {
	return (target, property) => {
		if (typeof property !== 'string') {
			throw new InvalidColumnNameError(target as typeof BaseEntity, property);
		}

		const properties = Reflect.get(target, kColumnProperty) as Set<string>;
		if (properties) {
			properties.add(property);
		} else {
			Reflect.defineProperty(target, kColumnProperty, {
				value: new Set([property]),
				enumerable: false,
				writable: false
			});
		}
	};
}

export interface ColumnSettings {}
