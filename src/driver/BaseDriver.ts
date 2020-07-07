export abstract class BaseDriver {

	public abstract readonly name: string;
	public abstract connect(): Promise<unknown>;
	public abstract disconnect(): Promise<unknown>;

}
