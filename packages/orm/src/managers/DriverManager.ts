import { BaseDriver } from '../driver/BaseDriver';
import type { Ctor } from '../utils/CoreUtils';
import { BaseManager } from './BaseManager';

type Constructor = Ctor<readonly [DriverManager], BaseDriver>;

export class DriverManager extends BaseManager<BaseDriver, Constructor> {
	public defaultID: string;
	protected holds = BaseDriver as Constructor;
	public constructor(defaultID: string) {
		super();
		this.defaultID = defaultID;
	}

	public get default() {
		const driver = this.get(this.defaultID);
		if (driver) return driver;
		throw new Error(`The driver '${this.defaultID}' is not available.`);
	}

	protected load(repository: Constructor): BaseDriver {
		return new repository(this);
	}
}
