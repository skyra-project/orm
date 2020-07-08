import type { BaseEntity } from '../entities/BaseEntity';

export class InvalidColumnNameError extends Error {
	public readonly name = 'InvalidColumnNameError';
	public readonly ctor: typeof BaseEntity;
	public readonly property: PropertyKey;

	public constructor(ctor: typeof BaseEntity, property: PropertyKey) {
		super(`The column ${String(property)} must be a string.`);
		this.ctor = ctor;
		this.property = property;
	}
}
