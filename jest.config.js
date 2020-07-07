module.exports = {
	displayName: 'ts-jest',
	preset: 'ts-jest',
	testEnvironment: 'node',
	testRunner: 'jest-circus/runner',
	testMatch: ['<rootDir>/packages/**/tests/*.test.ts'],
	globals: {
		'ts-jest': {
			tsConfig: '<rootDir>/tsconfig.base.json'
		}
	}
};
