import { expectTypeOf, test } from 'vitest';
import { ErrorCode } from './codes.js';
import { type naxiError } from './create-error.js';
import { ContainsNullValuesError, type ContainsNullValuesErrorExtensions } from './errors/contains-null-values.js';
import { ContentTooLargeError } from './errors/content-too-large.js';
import { isnaxiError } from './is-naxi-error.js';

test('Guards input as naxiError', () => {
	expectTypeOf(isnaxiError).guards.toEqualTypeOf<naxiError<unknown>>();
});

test('Returns specific type when provided code for built-in error', () => {
	const contentTooLargeError = new ContentTooLargeError();

	if (isnaxiError(contentTooLargeError, ErrorCode.ContentTooLarge)) {
		expectTypeOf(contentTooLargeError).toEqualTypeOf<naxiError<never>>();
	}

	const containsNullValuesError = new ContainsNullValuesError({ collection: 'sample', field: 'sample' });

	if (isnaxiError(containsNullValuesError, ErrorCode.ContainsNullValues)) {
		expectTypeOf(containsNullValuesError).toEqualTypeOf<naxiError<ContainsNullValuesErrorExtensions>>();
	}
});

test('Returns unknown when provided code is not a built-in error', () => {
	const error = { name: 'naxiError', code: 'CustomError' };

	if (isnaxiError(error, error.code)) {
		expectTypeOf(error).toEqualTypeOf<naxiError<unknown>>();
	}
});

test('Allows to pass custom extensions type', () => {
	const error = { name: 'naxiError' };

	type CustomnaxiErrorExtensions = { custom: string };

	if (isnaxiError<CustomnaxiErrorExtensions>(error)) {
		expectTypeOf(error).toEqualTypeOf<naxiError<CustomnaxiErrorExtensions>>();
	}
});
