import type { BaseRepository } from '../repositories/BaseRepository';

export class BaseEntity {

	public readonly repository: BaseRepository;

	public constructor(repository: BaseRepository, data: unknown) {
		this.repository = repository;
		Object.assign(this, data);
	}

	public save() {
		return this.repository.save(this);
	}

}
