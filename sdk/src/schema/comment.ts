import type { MergeCoreCollection } from '../index.js';
import type { naxiCollection } from './collection.js';
import type { naxiUser } from './user.js';

export type naxiComment<Schema> = MergeCoreCollection<
	Schema,
	'naxi_comments',
	{
		id: string;
		collection: naxiCollection<Schema> | string;
		item: string;
		comment: string;
		date_created: 'datetime' | null;
		date_updated: 'datetime' | null;
		user_created: naxiUser<Schema> | string | null;
		user_updated: naxiUser<Schema> | string | null;
	}
>;
