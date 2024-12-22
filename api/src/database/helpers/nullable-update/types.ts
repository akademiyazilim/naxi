import type { Knex } from 'knex';
import { DatabaseHelper } from '../types.js';
import type { Column } from '@naxi/schema';
import type { Field, RawField } from '@naxi/types';

export class NullableFieldUpdateHelper extends DatabaseHelper {
	updateNullableValue(column: Knex.ColumnBuilder, field: RawField | Field, existing: Column): void {
		const isNullable = field.schema?.is_nullable ?? existing?.is_nullable ?? true;

		if (isNullable) {
			column.nullable();
		} else {
			column.notNullable();
		}
	}
}