import type { MergeCoreCollection } from '../index.js';
import type { naxiRevision } from './revision.js';
import type { naxiUser } from './user.js';

export type naxiActivity<Schema = any> = MergeCoreCollection<
	Schema,
	'naxi_activity',
	{
		id: number;
		action: string;
		user: naxiUser<Schema> | string | null;
		timestamp: 'datetime';
		ip: string | null;
		user_agent: string | null;
		collection: string;
		item: string;
		origin: string | null;
		revisions: naxiRevision<Schema>[] | number[] | null;
	}
>;
