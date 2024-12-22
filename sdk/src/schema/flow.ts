import type { MergeCoreCollection } from '../index.js';
import type { naxiUser } from './user.js';
import type { naxiOperation } from './operation.js';

export type naxiFlow<Schema = any> = MergeCoreCollection<
	Schema,
	'naxi_flows',
	{
		id: string;
		name: string;
		icon: string | null;
		color: string | null;
		description: string | null;
		status: string;
		trigger: string | null;
		accountability: string | null;
		options: Record<string, any> | null;
		operation: naxiOperation<Schema> | string | null;
		date_created: 'datetime' | null;
		user_created: naxiUser<Schema> | string | null;
	}
>;
