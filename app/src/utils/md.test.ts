// @vitest-environment jsdom
import { expect, test } from 'vitest';
import { md } from './md.js';

test.each([
	{ value: 'test', expected: '<p>test</p>\n' },
	{
		value: `[naxi](https://naxi.io)`,
		expected: '<p><a href="https://naxi.io" target="_self">naxi</a></p>\n',
	},
	{
		value: `[naxi](https://naxi.io)`,
		expected: '<p><a href="https://naxi.io" target="_blank" rel="noopener noreferrer">naxi</a></p>\n',
		options: { target: '_blank' } as const,
	},
	{ value: `test<script>alert('alert')</script>`, expected: '<p>test</p>\n' },
])('should sanitize "$str" into "$expected"', ({ value, expected, options }) => {
	expect(md(value, options)).toBe(expected);
});
