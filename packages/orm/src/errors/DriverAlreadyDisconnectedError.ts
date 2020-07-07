export class DriverAlreadyDisconnectedError extends Error {
	public name = 'DriverAlreadyDisconnectedError';
	public constructor() {
		super('The connection was already destroyed or it was never initialized.');
	}
}
