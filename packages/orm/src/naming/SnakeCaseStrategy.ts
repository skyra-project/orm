import { NamingStrategy } from './NamingStrategy';
import { snakeCase } from '../utils/StringUtils';

export class SnakeCaseStrategy extends NamingStrategy {
	public readonly name = 'SnakeCase';

	public column(value: string): string {
		return snakeCase(value);
	}
}
