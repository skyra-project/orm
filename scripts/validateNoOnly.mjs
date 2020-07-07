import { readFileSync } from 'fs';
import glob from 'glob';
import { dirname as resolveDir, join } from 'path';
import { fileURLToPath as resolveFile } from 'url';

const filename = resolveFile(import.meta.url);
const dirname = resolveDir(filename);

const onlyPattern = /(?:describe\.only|it\.only|test\.only)/gm;

const files = glob.sync('**/*.test.?(j|t)s?(x)', { cwd: join(dirname, '../packages') }).map((file) => join(dirname, '../packages', file));
let shouldError = false;

const badFiles = [];
const badPatterns = [];

for (const file of files) {
	const fileContent = readFileSync(file, { encoding: 'utf8' });
	const fileHasPattern = fileContent.match(onlyPattern);
	if (fileHasPattern && fileHasPattern.length) {
		shouldError = true;
		for (const pattern of fileHasPattern) {
			badFiles.push(file);
			badPatterns.push(pattern);
		}
	}
}

if (shouldError) {
	console.error('Looks like you left focused tests, I found these hits:');
	console.error(badPatterns.map((pattern, index) => `- ${pattern}\t→\t${badFiles[index]}`).join('\n'));
	console.error('Please remove all the focused tests!');
	process.exit(1);
}
