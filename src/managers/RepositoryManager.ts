import type { BaseRepository } from '../repositories/BaseRepository';
import { DriverManager } from './DriverManager';

export class RepositoryManager extends Map<string, BaseRepository> {

	public readonly drivers: DriverManager;

	public constructor(settings: RepositoryManagerSettings) {
		super();
		this.drivers = new DriverManager(settings.driver);
	}

	public register(repository: BaseRepository): this {
		this.set(repository.name, repository);
		return this;
	}

}

export interface RepositoryManagerSettings {
	driver: string;
}
