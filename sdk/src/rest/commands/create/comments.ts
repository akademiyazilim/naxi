import type { naxiComment } from '../../../schema/comment.js';
import type { ApplyQueryFields, Query } from '../../../types/index.js';
import type { RestCommand } from '../../types.js';

export type CreateCommentOutput<
	Schema,
	TQuery extends Query<Schema, Item>,
	Item extends object = naxiComment<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery['fields']>;

/**
 * Create multiple new comments.
 *
 * @param items The comments to create
 * @param query Optional return data query
 *
 * @returns Returns the comment object for the created comment.
 */
export const createComments =
	<Schema, const TQuery extends Query<Schema, naxiComment<Schema>>>(
		items: Partial<naxiComment<Schema>>[],
		query?: TQuery,
	): RestCommand<CreateCommentOutput<Schema, TQuery>[], Schema> =>
	() => ({
		path: `/comments`,
		params: query ?? {},
		body: JSON.stringify(items),
		method: 'POST',
	});

/**
 * Create a new comment.
 *
 * @param item The comment to create
 * @param query Optional return data query
 *
 * @returns Returns the comment object for the created comment.
 */
export const createComment =
	<Schema, const TQuery extends Query<Schema, naxiComment<Schema>>>(
		item: Partial<naxiComment<Schema>>,
		query?: TQuery,
	): RestCommand<CreateCommentOutput<Schema, TQuery>, Schema> =>
	() => ({
		path: `/comments`,
		params: query ?? {},
		body: JSON.stringify(item),
		method: 'POST',
	});
