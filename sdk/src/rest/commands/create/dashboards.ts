import type { naxiDashboard } from '../../../schema/dashboard.js';
import type { ApplyQueryFields, Query } from '../../../types/index.js';
import type { RestCommand } from '../../types.js';

export type CreateDashboardOutput<
	Schema,
	TQuery extends Query<Schema, Item>,
	Item extends object = naxiDashboard<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery['fields']>;

/**
 * Create multiple new dashboards.
 *
 * @param items The items to create
 * @param query Optional return data query
 *
 * @returns Returns the dashboard object for the created dashboards.
 */
export const createDashboards =
	<Schema, const TQuery extends Query<Schema, naxiDashboard<Schema>>>(
		items: Partial<naxiDashboard<Schema>>[],
		query?: TQuery,
	): RestCommand<CreateDashboardOutput<Schema, TQuery>[], Schema> =>
	() => ({
		path: `/dashboards`,
		params: query ?? {},
		body: JSON.stringify(items),
		method: 'POST',
	});

/**
 * Create a new dashboard.
 *
 * @param item The dashboard to create
 * @param query Optional return data query
 *
 * @returns Returns the dashboard object for the created dashboard.
 */
export const createDashboard =
	<Schema, const TQuery extends Query<Schema, naxiDashboard<Schema>>>(
		item: Partial<naxiDashboard<Schema>>,
		query?: TQuery,
	): RestCommand<CreateDashboardOutput<Schema, TQuery>, Schema> =>
	() => ({
		path: `/dashboards`,
		params: query ?? {},
		body: JSON.stringify(item),
		method: 'POST',
	});
