import type { naxiError } from './create-error.js';
import type { ExtensionsMap } from './types.js';

/**
 * Check whether or not a passed value is a valid naxi error.
 *
 * @param value - Any value
 * @param code - Error code to check for
 */
export const isnaxiError = <T = never, C extends string = string>(
	value: unknown,
	code?: C,
): value is naxiError<[T] extends [never] ? (C extends keyof ExtensionsMap ? ExtensionsMap[C] : unknown) : T> => {
	const isnaxiError =
		typeof value === 'object' &&
		value !== null &&
		Array.isArray(value) === false &&
		'name' in value &&
		value.name === 'naxiError';

	if (code) {
		return isnaxiError && 'code' in value && value.code === code.toUpperCase();
	}

	return isnaxiError;
};
