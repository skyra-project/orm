import type { BaseRepository } from '../repositories/BaseRepository';

export class InvalidRepositoryConstructorError extends Error {
	public readonly name = 'InvalidRepositoryConstructorError';
	public readonly ctor: typeof BaseRepository;

	public constructor(ctor: typeof BaseRepository) {
		super('Invalid entity, you must define @Entity');
		this.ctor = ctor;
	}
}
