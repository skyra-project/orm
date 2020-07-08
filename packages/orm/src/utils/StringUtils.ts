/**
 * Converts string into camelCase.
 * @see http://stackoverflow.com/questions/2970525/converting-any-string-into-camel-case
 */
export function camelCase(value: string, firstCapital = false): string {
	return value.replace(/^([A-Z])|[\s-_](\w)/g, (_, p1, p2, offset) => {
		if (firstCapital && offset === 0) return p1;
		if (p2) return p2.toUpperCase();
		return p1.toLowerCase();
	});
}

/**
 * Converts string into snake_case.
 * @see https://regex101.com/r/QeSm2I/1
 */
export function snakeCase(value: string) {
	return value.replace(/(?:([a-z])([A-Z]))|(?:((?!^)[A-Z])([a-z]))/g, '$1_$3$2$4').toLowerCase();
}

/**
 * Converts string into Title Case.
 * @see http://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
 */
export function titleCase(value: string): string {
	return value.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}
