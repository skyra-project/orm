/* eslint-disable @typescript-eslint/unified-signatures */
import { readdirSync, statSync } from 'fs';
import { kRepositoryProperty } from '../decorators/RepositoryDecorator';
import { DriverAlreadyConnectedError } from '../errors/DriverAlreadyConnectedError';
import { DriverAlreadyDisconnectedError } from '../errors/DriverAlreadyDisconnectedError';
import { InvalidRepositoryConstructorError } from '../errors/InvalidRepositoryConstructorError';
import { BaseRepository, RepositorySettings } from '../repositories/BaseRepository';
import { loadModule, map, scanExportClasses } from '../utils/util';
import { DriverManager } from './DriverManager';

export class RepositoryManager extends Map<string, BaseRepository> {
	public readonly drivers: DriverManager;
	private connected = false;

	public constructor(settings: RepositoryManagerSettings) {
		super();
		this.drivers = new DriverManager(settings.driver);
	}

	public register(repository: string): this;
	public register(repository: BaseRepository): this;
	public register(repository: string | BaseRepository): this {
		if (typeof repository === 'string') return this.registerPath(repository);
		this.set(repository.name, repository);
		return this;
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

	private registerPath(path: string): this {
		const stat = statSync(path);
		if (stat.isFile()) return this.registerFile(path);
		else if (stat.isDirectory()) return this.registerDirectory(path);

		return this;
	}

	private registerFile(file: string): this {
		for (const ctor of scanExportClasses(loadModule(file), BaseRepository)) {
			const repository = this.load(ctor);
			this.set(repository.name, repository);
		}
		return this;
	}

	private registerDirectory(directory: string): this {
		for (const file of readdirSync(directory)) {
			this.registerPath(file);
		}
		return this;
	}

	private load(repository: typeof BaseRepository): BaseRepository {
		const settings = Reflect.get(repository, kRepositoryProperty) as RepositorySettings | undefined;
		if (!settings) throw new InvalidRepositoryConstructorError(repository);
		return new repository(this, settings);
	}
}

export interface RepositoryManagerSettings {
	driver: string;
}
