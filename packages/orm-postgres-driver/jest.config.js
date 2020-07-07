module.exports = {
	displayName: 'ts-jest',
	preset: 'ts-jest',
	testEnvironment: 'node',
	testRunner: 'jest-circus/runner',
	testMatch: ['./tests/*.test.ts'],
	globals: {
		'ts-jest': {
			tsConfig: './tests/tsconfig.json'
		}
	}
};
