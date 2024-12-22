import type { naxiField } from '../../../schema/field.js';
import type { ApplyQueryFields, NestedPartial, Query } from '../../../types/index.js';
import { throwIfEmpty } from '../../utils/index.js';
import type { RestCommand } from '../../types.js';

export type UpdateFieldOutput<
	Schema,
	TQuery extends Query<Schema, Item>,
	Item extends object = naxiField<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery['fields']>;

/**
 * Updates the given field in the given collection.
 * @param collection
 * @param field
 * @param item
 * @param query
 * @returns
 * @throws Will throw if collection is empty
 * @throws Will throw if field is empty
 */
export const updateField =
	<Schema, const TQuery extends Query<Schema, naxiField<Schema>>>(
		collection: naxiField<Schema>['collection'],
		field: naxiField<Schema>['field'],
		item: NestedPartial<naxiField<Schema>>,
		query?: TQuery,
	): RestCommand<UpdateFieldOutput<Schema, TQuery>, Schema> =>
	() => {
		throwIfEmpty(collection, 'Keys cannot be empty');
		throwIfEmpty(field, 'Field cannot be empty');

		return {
			path: `/fields/${collection}/${field}`,
			params: query ?? {},
			body: JSON.stringify(item),
			method: 'PATCH',
		};
	};