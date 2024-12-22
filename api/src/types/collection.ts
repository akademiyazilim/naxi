import type { Field } from '@naxi/types';
import type { Table } from '@naxi/schema';
import type { BaseCollectionMeta } from '@naxi/system-data';

export type Collection = {
	collection: string;
	fields?: Field[];
	meta: BaseCollectionMeta | null;
	schema: Table | null;
};
