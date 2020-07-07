import { EntityManager } from '../managers/EntityManager';
import type { RepositoryManager } from '../managers/RepositoryManager';

// eslint-disable-next-line @typescript-eslint/ban-types
export class BaseRepository<T extends Object = Object> {

	public readonly name: string;
	public readonly manager: RepositoryManager;
	public readonly entities: EntityManager;

	public constructor(manager: RepositoryManager, settings: RepositorySettings) {
		this.name = settings.name;
		this.manager = manager;
		this.entities = new EntityManager(this.manager.drivers.default);
	}

	public async save(entity: T) {
		await Promise.resolve(entity);
	}

}

export interface RepositorySettings {
	name: string;
}
