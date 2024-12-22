import type { MergeCoreCollection } from '../index.js';

export type naxiWebhook<Schema = any> = MergeCoreCollection<
	Schema,
	'naxi_webhooks',
	{
		id: number;
		name: string;
		method: string;
		url: string;
		status: string;
		data: boolean;
		actions: string | string[];
		collections: string | string[];
		headers: Record<string, any> | null;
	}
>;
