import type { MergeCoreCollection } from '../index.js';
import type { naxiUser } from './user.js';
import type { naxiAccess } from './access.js';

export type naxiRole<Schema = any> = MergeCoreCollection<
	Schema,
	'naxi_roles',
	{
		id: string;
		name: string;
		icon: string;
		description: string | null;
		parent: string | naxiRole<Schema>;
		children: string[] | naxiRole<Schema>[];
		policies: string[] | naxiAccess<Schema>[];
		users: string[] | naxiUser<Schema>[];
	}
>;
