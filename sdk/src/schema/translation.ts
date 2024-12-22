import type { MergeCoreCollection } from '../index.js';

export type naxiTranslation<Schema = any> = MergeCoreCollection<
	Schema,
	'naxi_translations',
	{
		id: string; // uuid
		language: string;
		key: string;
		value: string;
	}
>;
