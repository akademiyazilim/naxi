import type { naxiOperation } from '../../../schema/operation.js';
import type { ApplyQueryFields, Query } from '../../../types/index.js';
import type { RestCommand } from '../../types.js';

export type CreateOperationOutput<
	Schema,
	TQuery extends Query<Schema, Item>,
	Item extends object = naxiOperation<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery['fields']>;

/**
 * Create multiple new operations.
 *
 * @param items The operation to create
 * @param query Optional return data query
 *
 * @returns Returns the operation object for the created operation.
 */
export const createOperations =
	<Schema, const TQuery extends Query<Schema, naxiOperation<Schema>>>(
		items: Partial<naxiOperation<Schema>>[],
		query?: TQuery,
	): RestCommand<CreateOperationOutput<Schema, TQuery>[], Schema> =>
	() => ({
		path: `/operations`,
		params: query ?? {},
		body: JSON.stringify(items),
		method: 'POST',
	});

/**
 * Create a new operation.
 *
 * @param item The operation to create
 * @param query Optional return data query
 *
 * @returns Returns the operation object for the created operation.
 */
export const createOperation =
	<Schema, const TQuery extends Query<Schema, naxiOperation<Schema>>>(
		item: Partial<naxiOperation<Schema>>,
		query?: TQuery,
	): RestCommand<CreateOperationOutput<Schema, TQuery>, Schema> =>
	() => ({
		path: `/operations`,
		params: query ?? {},
		body: JSON.stringify(item),
		method: 'POST',
	});
