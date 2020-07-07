export class DriverAlreadyConnectedError extends Error {
	public name = 'DriverAlreadyConnectedError';
	public constructor() {
		super('A connection was already initialized.');
	}
}
