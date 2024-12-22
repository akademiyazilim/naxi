import type { MergeCoreCollection } from '../index.js';
import type { naxiUser } from './user.js';
import type { naxiDashboard } from './dashboard.js';

export type naxiPanel<Schema = any> = MergeCoreCollection<
	Schema,
	'naxi_panels',
	{
		id: string;
		dashboard: naxiDashboard<Schema> | string;
		name: string | null;
		icon: string | null;
		color: string | null;
		show_header: boolean;
		note: string | null;
		type: string;
		position_x: number;
		position_y: number;
		width: number;
		height: number;
		options: Record<string, any> | null;
		date_created: 'datetime' | null;
		user_created: naxiUser<Schema> | string | null;
	}
>;
