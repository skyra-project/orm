import { NamingStrategy } from '../naming/NamingStrategy';
import type { Ctor } from '../utils/CoreUtils';
import { BaseManager } from './BaseManager';

type Constructor = Ctor<readonly [NamingManager], NamingStrategy>;

export class NamingManager extends BaseManager<NamingStrategy, Constructor> {
	public defaultID: string;
	protected holds = NamingStrategy as Constructor;
	public constructor(defaultID = 'SnakeCase') {
		super();
		this.defaultID = defaultID;
	}

	public get default() {
		const strategy = this.get(this.defaultID);
		if (strategy) return strategy;
		throw new Error(`The naming strategy '${this.defaultID}' is not available.`);
	}

	protected load(repository: Constructor): NamingStrategy {
		return new repository(this);
	}
}
