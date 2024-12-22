import { expect, test, vi } from 'vitest';
import { isnaxiVariable } from './is-naxi-variable.js';

vi.mock('../constants/naxi-variables.js', () => ({
	naxi_VARIABLES_REGEX: [/TEST_.*/],
}));

test('Returns false if variable matches none of the regexes', () => {
	expect(isnaxiVariable('NO')).toBe(false);
});

test('Returns true if variable matches one or more of the regexes', () => {
	expect(isnaxiVariable('TEST_123')).toBe(true);
});

test('Checks against original name if variable is suffixed with _FILE', () => {
	expect(isnaxiVariable('NO_FILE')).toBe(false);
	expect(isnaxiVariable('TEST_123_FILE')).toBe(true);
});
