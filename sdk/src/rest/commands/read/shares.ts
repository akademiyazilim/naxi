import type { naxiShare } from '../../../schema/share.js';
import type { ApplyQueryFields, Query } from '../../../types/index.js';
import { throwIfEmpty } from '../../utils/index.js';
import type { RestCommand } from '../../types.js';

export type ReadShareOutput<
	Schema,
	TQuery extends Query<Schema, Item>,
	Item extends object = naxiShare<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery['fields']>;

/**
 * List all Shares that exist in naxi.
 * @param query The query parameters
 * @returns An array of up to limit Share objects. If no items are available, data will be an empty array.
 */
export const readShares =
	<Schema, const TQuery extends Query<Schema, naxiShare<Schema>>>(
		query?: TQuery,
	): RestCommand<ReadShareOutput<Schema, TQuery>[], Schema> =>
	() => ({
		path: `/shares`,
		params: query ?? {},
		method: 'GET',
	});

/**
 * List an existing Share by primary key.
 * @param key The primary key of the dashboard
 * @param query The query parameters
 * @returns Returns a Share object if a valid primary key was provided.
 * @throws Will throw if key is empty
 */
export const readShare =
	<Schema, TQuery extends Query<Schema, naxiShare<Schema>>>(
		key: naxiShare<Schema>['id'],
		query?: TQuery,
	): RestCommand<ReadShareOutput<Schema, TQuery>, Schema> =>
	() => {
		throwIfEmpty(String(key), 'Key cannot be empty');

		return {
			path: `/shares/${key}`,
			params: query ?? {},
			method: 'GET',
		};
	};
