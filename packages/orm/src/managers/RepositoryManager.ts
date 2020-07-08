/* eslint-disable @typescript-eslint/unified-signatures */
import { kRepositoryProperty } from '../decorators/RepositoryDecorator';
import { DriverAlreadyConnectedError } from '../errors/DriverAlreadyConnectedError';
import { DriverAlreadyDisconnectedError } from '../errors/DriverAlreadyDisconnectedError';
import { InvalidRepositoryConstructorError } from '../errors/InvalidRepositoryConstructorError';
import { BaseRepository, RepositorySettings } from '../repositories/BaseRepository';
import { map } from '../utils/CoreUtils';
import { BaseManager } from './BaseManager';
import { DriverManager } from './DriverManager';

export class RepositoryManager extends BaseManager<BaseRepository, typeof BaseRepository> {
	public readonly drivers: DriverManager;
	protected readonly holds = BaseRepository;
	private connected = false;

	public constructor(settings: RepositoryManagerSettings) {
		super();
		this.drivers = new DriverManager(settings.driver);
	}

	public async connect() {
		if (this.connected) throw new DriverAlreadyConnectedError();

		await Promise.all(map(this.drivers.values(), (driver) => driver.connect()));
		this.connected = true;
	}

	public async disconnect() {
		if (!this.connected) throw new DriverAlreadyDisconnectedError();

		await Promise.all(map(this.drivers.values(), (driver) => driver.disconnect()));
		this.connected = false;
	}

	protected load(repository: typeof BaseRepository): BaseRepository {
		const settings = Reflect.get(repository, kRepositoryProperty) as RepositorySettings | undefined;
		if (!settings) throw new InvalidRepositoryConstructorError(repository);
		return new repository(this, settings);
	}
}

export interface RepositoryManagerSettings {
	driver: string;
}
