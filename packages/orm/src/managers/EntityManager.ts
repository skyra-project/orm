import type { BaseDriver } from '../driver/BaseDriver';

export class EntityManager {
	public driver: BaseDriver;

	public constructor(driver: BaseDriver) {
		this.driver = driver;
	}
}
