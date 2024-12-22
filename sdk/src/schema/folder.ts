import type { MergeCoreCollection } from '../index.js';

export type naxiFolder<Schema = any> = MergeCoreCollection<
	Schema,
	'naxi_folders',
	{
		id: string;
		name: string;
		parent: naxiFolder<Schema> | string | null;
	}
>;
