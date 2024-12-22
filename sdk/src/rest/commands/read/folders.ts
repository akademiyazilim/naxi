import type { naxiFolder } from '../../../schema/folder.js';
import type { ApplyQueryFields, Query } from '../../../types/index.js';
import { throwIfEmpty } from '../../utils/index.js';
import type { RestCommand } from '../../types.js';

export type ReadFolderOutput<
	Schema,
	TQuery extends Query<Schema, Item>,
	Item extends object = naxiFolder<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery['fields']>;

/**
 * List all folders that exist in naxi.
 * @param query The query parameters
 * @returns An array of up to limit folder objects. If no items are available, data will be an empty array.
 */
export const readFolders =
	<Schema, const TQuery extends Query<Schema, naxiFolder<Schema>>>(
		query?: TQuery,
	): RestCommand<ReadFolderOutput<Schema, TQuery>[], Schema> =>
	() => ({
		path: `/folders`,
		params: query ?? {},
		method: 'GET',
	});

/**
 * List an existing folder by primary key.
 * @param key The primary key of the dashboard
 * @param query The query parameters
 * @returns Returns a folder object if a valid primary key was provided.
 * @throws Will throw if key is empty
 */
export const readFolder =
	<Schema, const TQuery extends Query<Schema, naxiFolder<Schema>>>(
		key: naxiFolder<Schema>['id'],
		query?: TQuery,
	): RestCommand<ReadFolderOutput<Schema, TQuery>, Schema> =>
	() => {
		throwIfEmpty(String(key), 'Key cannot be empty');

		return {
			path: `/folders/${key}`,
			params: query ?? {},
			method: 'GET',
		};
	};
