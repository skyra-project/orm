import type { BaseDriver } from '../driver/BaseDriver';

export class DriverManager extends Map<string, BaseDriver> {
	public defaultID: string;
	public constructor(defaultID: string) {
		super();
		this.defaultID = defaultID;
	}

	public get default() {
		const driver = this.get(this.defaultID);
		if (driver) return driver;
		throw new Error(`The driver ${this.defaultID} is not available.`);
	}

	public register(driver: BaseDriver) {
		this.set(driver.name, driver);
		return this;
	}
}
