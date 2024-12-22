import { describe, expect, it } from 'vitest';
import { noproto, parseJSON } from './parse-json.js';

describe('noproto', () => {
	it('Returns the value if the key is not __proto__', () => {
		let result = noproto('anything', 'value');
		expect(result).toBe('value');

		result = noproto('__proto__', 'malicious');
		expect(result).toBe(undefined);
	});
});

describe('parseJSON', () => {
	it('Parses JSON strings', () => {
		const result = parseJSON(`{"name": "naxi"}`);
		expect(result).toEqual({ name: 'naxi' });
	});

	it('Ignores __proto__ properties', () => {
		const result = parseJSON(`{"name": "naxi", "__proto__": "malicious" }`);
		expect(result).toEqual({ name: 'naxi' });
	});
});