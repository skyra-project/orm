import type { BaseEntity } from '../entities/BaseEntity';

export class InvalidEntityConstructorError extends Error {
	public readonly name = 'InvalidEntityConstructorError';
	public readonly ctor: typeof BaseEntity;

	public constructor(ctor: typeof BaseEntity) {
		super('Invalid entity, you must define @Entity');
		this.ctor = ctor;
	}
}
