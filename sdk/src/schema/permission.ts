import type { MergeCoreCollection } from '../index.js';
import type { naxiPolicy } from './policy.js';

export type naxiPermission<Schema = any> = MergeCoreCollection<
	Schema,
	'naxi_permissions',
	{
		id: number;
		policy: naxiPolicy<Schema> | string | null;
		collection: string; // TODO keyof complete schema
		action: string;
		permissions: Record<string, any> | null;
		validation: Record<string, any> | null;
		presets: Record<string, any> | null;
		fields: string[] | null;
	}
>;
