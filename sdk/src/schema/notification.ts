import type { MergeCoreCollection } from '../index.js';
import type { naxiUser } from './user.js';

export type naxiNotification<Schema = any> = MergeCoreCollection<
	Schema,
	'naxi_notifications',
	{
		id: string;
		timestamp: 'datetime' | null;
		status: string | null;
		recipient: naxiUser<Schema> | string;
		sender: naxiUser<Schema> | string | null;
		subject: string;
		message: string | null;
		collection: string | null; // TODO keyof complete schema
		item: string | null;
	}
>;
