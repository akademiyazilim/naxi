import isnaxiJWT from './is-naxi-jwt.js';
import jwt from 'jsonwebtoken';
import { test, expect } from 'vitest';

test('Returns false for non JWT string', () => {
	const result = isnaxiJWT('test');
	expect(result).toBe(false);
});

test('Returns false for JWTs with text payload', () => {
	const token = jwt.sign('plaintext', 'secret');
	const result = isnaxiJWT(token);
	expect(result).toBe(false);
});

test(`Returns false if token issuer isn't "naxi"`, () => {
	const token = jwt.sign({ payload: 'content' }, 'secret', { issuer: 'rijk' });
	const result = isnaxiJWT(token);
	expect(result).toBe(false);
});

test(`Returns true if token is valid JWT and issuer is "naxi"`, () => {
	const token = jwt.sign({ payload: 'content' }, 'secret', { issuer: 'naxi' });
	const result = isnaxiJWT(token);
	expect(result).toBe(true);
});
