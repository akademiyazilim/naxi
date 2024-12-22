import type { MergeCoreCollection } from '../index.js';
import type { naxiCollection } from './collection.js';
import type { naxiUser } from './user.js';

export type naxiVersion<Schema = any> = MergeCoreCollection<
	Schema,
	'naxi_versions',
	{
		id: string;
		key: string;
		name: string | null;
		collection: naxiCollection<Schema> | string;
		item: string;
		hash: string;
		date_created: 'datetime' | null;
		date_updated: 'datetime' | null;
		user_created: naxiUser<Schema> | string | null;
		user_updated: naxiUser<Schema> | string | null;
		delta: Record<string, any> | null;
	}
>;
