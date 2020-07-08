import type { DriverManager } from '../managers/DriverManager';

export abstract class BaseDriver {
	public abstract readonly name: string;
	public readonly manager: DriverManager;
	public constructor(manager: DriverManager) {
		this.manager = manager;
	}

	public abstract connect(): Promise<unknown>;
	public abstract disconnect(): Promise<unknown>;
}
