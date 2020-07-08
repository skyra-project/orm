export const kEntityProperty = Symbol('entity-decorator');

export function Entity(name: string): ClassDecorator {
	return (target) => {
		Reflect.defineProperty(target, kEntityProperty, {
			value: Object.freeze<EntitySettings>({ name }),
			enumerable: false,
			writable: false
		});
	};
}

export interface EntitySettings {
	name: string;
}
