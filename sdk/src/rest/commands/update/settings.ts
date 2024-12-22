import type { naxiSettings } from '../../../schema/settings.js';
import type { ApplyQueryFields, Query } from '../../../types/index.js';
import type { RestCommand } from '../../types.js';

export type UpdateSettingOutput<
	Schema,
	TQuery extends Query<Schema, Item>,
	Item extends object = naxiSettings<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery['fields']>;

/**
 * Update Settings
 * @param item
 * @param query
 * @returns Returns the settings object.
 */
export const updateSettings =
	<Schema, const TQuery extends Query<Schema, naxiSettings<Schema>>>(
		item: Partial<naxiSettings<Schema>>,
		query?: TQuery,
	): RestCommand<UpdateSettingOutput<Schema, TQuery>[], Schema> =>
	() => ({
		path: `/settings`,
		params: query ?? {},
		body: JSON.stringify(item),
		method: 'PATCH',
	});
