import type { MergeCoreCollection } from '../index.js';
import type { naxiRole } from './role.js';
import type { naxiUser } from './user.js';

export type naxiShare<Schema = any> = MergeCoreCollection<
	Schema,
	'naxi_shares',
	{
		id: string;
		name: string | null;
		collection: string | null;
		item: string | null;
		role: naxiRole<Schema> | string | null;
		password: string | null;
		user_created: naxiUser<Schema> | string | null;
		date_created: 'datetime' | null;
		date_start: 'datetime' | null;
		date_end: 'datetime' | null;
		times_used: number | null;
		max_uses: number | null;
	}
>;
