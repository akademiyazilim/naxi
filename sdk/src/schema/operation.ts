import type { MergeCoreCollection } from '../index.js';
import type { naxiFlow } from './flow.js';
import type { naxiUser } from './user.js';

export type naxiOperation<Schema = any> = MergeCoreCollection<
	Schema,
	'naxi_operations',
	{
		id: string;
		name: string | null;
		key: string;
		type: string;
		position_x: number;
		position_y: number;
		timestamp: string;
		options: Record<string, any> | null;
		resolve: naxiOperation<Schema> | string | null;
		reject: naxiOperation<Schema> | string | null;
		flow: naxiFlow<Schema> | string;
		date_created: 'datetime' | null;
		user_created: naxiUser<Schema> | string | null;
	}
>;
