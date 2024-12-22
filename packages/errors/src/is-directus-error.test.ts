import { randomAlpha, randomInteger, randomIdentifier } from '@naxi/random';
import { beforeEach, expect, test } from 'vitest';
import { createError } from './create-error.js';
import { isnaxiError } from './is-naxi-error.js';

let sample: {
	code: string;
	status: number;
	message: string;
};

beforeEach(() => {
	sample = {
		code: randomAlpha(randomInteger(5, 25)),
		status: randomInteger(200, 599),
		message: randomAlpha(randomInteger(10, 50)),
	};
});

test('Reports false for non naxi-errors', () => {
	const negative = [
		false,
		() => {
			/* empty */
		},
		[],
		new Error(),
		0,
		null,
		undefined,
		new Set(),
	];

	for (const input of negative) {
		expect(isnaxiError(input)).toBe(false);
	}
});

test('Reports true for naxi error', () => {
	const SampleError = createError(sample.code, sample.message, sample.status);
	const error = new SampleError();
	expect(isnaxiError(error)).toBe(true);
});

test('Check against optional error code', () => {
	const SampleError = createError(sample.code, sample.message, sample.status);
	const error = new SampleError();
	expect(isnaxiError(error, sample.code)).toBe(true);
	expect(isnaxiError(error, randomIdentifier())).toBe(false);
});
