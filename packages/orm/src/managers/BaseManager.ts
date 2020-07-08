import { readdirSync, statSync } from 'fs';
import { Ctor, loadModule, scanExportClasses } from '../utils/CoreUtils';

export abstract class BaseManager<V extends { name: string }, C extends Ctor<readonly any[], V>> extends Map<string, V> {
	protected abstract readonly holds: C;

	public register(entry: string): this;
	public register(entry: V): this;
	public register(entry: string | V): this {
		if (typeof entry === 'string') return this.registerPath(entry);
		this.set(entry.name, entry);
		return this;
	}

	protected registerPath(path: string): this {
		const stat = statSync(path);
		if (stat.isFile()) return this.registerFile(path);
		else if (stat.isDirectory()) return this.registerDirectory(path);

		return this;
	}

	protected registerFile(file: string): this {
		for (const ctor of scanExportClasses(loadModule(file), this.holds)) {
			const entry = this.load(ctor);
			this.set(entry.name, entry);
		}
		return this;
	}

	protected registerDirectory(directory: string): this {
		for (const file of readdirSync(directory)) {
			this.registerPath(file);
		}
		return this;
	}

	protected abstract load(ctor: C): V;
}
