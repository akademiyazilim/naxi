import type { MergeCoreCollection } from '../index.js';
import type { naxiPolicy } from './policy.js';
import type { naxiRole } from './role.js';
import type { naxiUser } from './user.js';

export type naxiAccess<Schema = any> = MergeCoreCollection<
	Schema,
	'naxi_access',
	{
		id: string; // uuid
		role: string | naxiRole<Schema>;
		user: string | naxiUser<Schema>;
		policy: string | naxiPolicy<Schema>;
		sort: number;
	}
>;
