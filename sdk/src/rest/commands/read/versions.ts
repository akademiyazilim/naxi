import type { naxiVersion } from '../../../schema/version.js';
import type { ApplyQueryFields, Query } from '../../../types/index.js';
import type { RestCommand } from '../../types.js';
import { throwIfEmpty } from '../../utils/index.js';

export type ReadContentVersionOutput<
	Schema,
	TQuery extends Query<Schema, Item>,
	Item extends object = naxiVersion<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery['fields']>;

/**
 * List all Content Versions that exist in naxi.
 * @param query The query parameters
 * @returns An array of up to limit Content Version objects. If no items are available, data will be an empty array.
 */
export const readContentVersions =
	<Schema, const TQuery extends Query<Schema, naxiVersion<Schema>>>(
		query?: TQuery,
	): RestCommand<ReadContentVersionOutput<Schema, TQuery>[], Schema> =>
	() => ({
		path: `/versions`,
		params: query ?? {},
		method: 'GET',
	});

/**
 * List an existing COntent Version by primary key.
 * @param key The primary key of the Content Version
 * @param query The query parameters
 * @returns Returns a Content Version object if a valid primary key was provided.
 * @throws Will throw if key is empty
 */
export const readContentVersion =
	<Schema, const TQuery extends Query<Schema, naxiVersion<Schema>>>(
		key: naxiVersion<Schema>['id'],
		query?: TQuery,
	): RestCommand<ReadContentVersionOutput<Schema, TQuery>, Schema> =>
	() => {
		throwIfEmpty(String(key), 'Key cannot be empty');

		return {
			path: `/versions/${key}`,
			params: query ?? {},
			method: 'GET',
		};
	};