import type { MergeCoreCollection } from '../index.js';
import type { naxiUser } from './user.js';

export type naxiDashboard<Schema = any> = MergeCoreCollection<
	Schema,
	'naxi_dashboards',
	{
		id: string;
		name: string;
		icon: string;
		note: string | null;
		date_created: 'datetime' | null;
		user_created: naxiUser<Schema> | string | null;
		color: string | null;
	}
>;
