import type { NamingManager } from '../managers/NamingManager';

export abstract class NamingStrategy {
	public abstract readonly name: string;
	public readonly manager: NamingManager;

	public constructor(manager: NamingManager) {
		this.manager = manager;
	}

	public abstract column(value: string): string;
}
