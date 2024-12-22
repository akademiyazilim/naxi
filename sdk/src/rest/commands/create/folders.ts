import type { naxiFolder } from '../../../schema/folder.js';
import type { ApplyQueryFields, Query } from '../../../types/index.js';
import type { RestCommand } from '../../types.js';

export type CreateFolderOutput<
	Schema,
	TQuery extends Query<Schema, Item>,
	Item extends object = naxiFolder<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery['fields']>;

/**
 * Create multiple new (virtual) folders.
 *
 * @param item The folder to create
 * @param query Optional return data query
 *
 * @returns Returns the folder object of the folder that was created.
 */
export const createFolders =
	<Schema, const TQuery extends Query<Schema, naxiFolder<Schema>>>(
		items: Partial<naxiFolder<Schema>>[],
		query?: TQuery,
	): RestCommand<CreateFolderOutput<Schema, TQuery>[], Schema> =>
	() => ({
		path: `/folders`,
		params: query ?? {},
		body: JSON.stringify(items),
		method: 'POST',
	});

/**
 * Create a new (virtual) folder.
 *
 * @param item The folder to create
 * @param query Optional return data query
 *
 * @returns Returns the folder object of the folder that was created.
 */
export const createFolder =
	<Schema, const TQuery extends Query<Schema, naxiFolder<Schema>>>(
		item: Partial<naxiFolder<Schema>>,
		query?: TQuery,
	): RestCommand<CreateFolderOutput<Schema, TQuery>, Schema> =>
	() => ({
		path: `/folders`,
		params: query ?? {},
		body: JSON.stringify(item),
		method: 'POST',
	});
