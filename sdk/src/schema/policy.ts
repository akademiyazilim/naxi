import type { MergeCoreCollection } from '../index.js';
import type { naxiPermission } from './permission.js';
import type { naxiRole } from './role.js';
import type { naxiUser } from './user.js';

export type naxiPolicy<Schema> = MergeCoreCollection<
	Schema,
	'naxi_policies',
	{
		id: string; // uuid
		name: string;
		icon: string;
		description: string | null;
		ip_access: string | null;
		enforce_tfa: boolean;
		admin_access: boolean;
		app_access: boolean;
		permissions: number[] | naxiPermission<Schema>[];
		users: string[] | naxiUser<Schema>[];
		roles: string[] | naxiRole<Schema>[];
	}
>;
