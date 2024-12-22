import type { MergeCoreCollection } from '../index.js';
import type { naxiActivity } from './activity.js';
import type { naxiVersion } from './version.js';

export type naxiRevision<Schema = any> = MergeCoreCollection<
	Schema,
	'naxi_revisions',
	{
		id: number;
		activity: naxiActivity<Schema> | number;
		collection: string; // TODO keyof complete schema
		item: string;
		data: Record<string, any> | null;
		delta: Record<string, any> | null;
		parent: naxiRevision<Schema> | number | null;
		version: naxiVersion<Schema> | string | null;
	}
>;
