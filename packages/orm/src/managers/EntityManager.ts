import type { BaseDriver } from '../driver/BaseDriver';
import { DriverAlreadyConnectedError } from '../errors/DriverAlreadyConnectedError';
import { DriverAlreadyDisconnectedError } from '../errors/DriverAlreadyDisconnectedError';

export class EntityManager {
	public driver: BaseDriver;
	private connected = false;

	public constructor(driver: BaseDriver) {
		this.driver = driver;
	}

	public async connect() {
		if (this.connected) throw new DriverAlreadyConnectedError();

		await this.driver.connect();
		this.connected = true;
	}

	public async disconnect() {
		if (!this.connected) throw new DriverAlreadyDisconnectedError();

		await this.driver.disconnect();
		this.connected = false;
	}
}
