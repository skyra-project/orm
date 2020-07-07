module.exports = {
	files: 'packages/**/*.ts',
	from: /(?:import type)/g,
	to: 'import'
};
