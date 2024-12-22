import type { MergeCoreCollection } from '../index.js';
import type { naxiRole } from './role.js';
import type { naxiUser } from './user.js';

export type naxiPreset<Schema = any> = MergeCoreCollection<
	Schema,
	'naxi_presets',
	{
		id: number;
		bookmark: string | null;
		user: naxiUser<Schema> | string | null;
		role: naxiRole<Schema> | string | null;
		collection: string | null; // TODO keyof complete schema
		search: string | null;
		layout: string | null;
		layout_query: Record<string, any> | null;
		layout_options: Record<string, any> | null;
		refresh_interval: number | null;
		filter: Record<string, any> | null;
		icon: string | null;
		color: string | null;
	}
>;
