import type { naxiSettings } from '../../../schema/settings.js';
import type { ApplyQueryFields, Query } from '../../../types/index.js';
import type { RestCommand } from '../../types.js';

export type ReadSettingOutput<
	Schema,
	TQuery extends Query<Schema, Item>,
	Item extends object = naxiSettings<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery['fields']>;

/**
 * Retrieve Settings.
 *
 * @param query The query parameters
 *
 * @returns Returns the settings object.
 */
export const readSettings =
	<Schema, const TQuery extends Query<Schema, naxiSettings<Schema>>>(
		query?: TQuery,
	): RestCommand<ReadSettingOutput<Schema, TQuery>, Schema> =>
	() => ({
		path: `/settings`,
		params: query ?? {},
		method: 'GET',
	});
