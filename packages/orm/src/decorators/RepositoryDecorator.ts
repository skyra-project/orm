import type { RepositorySettings } from '../repositories/BaseRepository';

export const kRepositoryProperty = Symbol('repository-decorator');

export function Repository(name: string): ClassDecorator {
	return (target) => {
		Reflect.defineProperty(target, kRepositoryProperty, {
			value: Object.freeze<RepositorySettings>({ name }),
			enumerable: false,
			writable: false
		});
		/* noop */
	};
}
