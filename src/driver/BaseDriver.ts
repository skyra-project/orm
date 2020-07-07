export abstract class BaseDriver {

	public abstract connect(): Promise<unknown>;
	public abstract disconnect(): Promise<unknown>;

}
