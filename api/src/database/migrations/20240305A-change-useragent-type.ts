import type { Knex } from 'knex';
import { getHelpers } from '../helpers/index.js';

export async function up(knex: Knex): Promise<void> {
	const helper = getHelpers(knex).schema;

	await Promise.all([
		helper.changeToType('naxi_activity', 'user_agent', 'text'),
		helper.changeToType('naxi_sessions', 'user_agent', 'text'),
	]);
}

export async function down(knex: Knex): Promise<void> {
	const helper = getHelpers(knex).schema;

	const opts = {
		nullable: false,
		length: 255,
	};

	await Promise.all([
		helper.changeToType('naxi_activity', 'user_agent', 'string', opts),
		helper.changeToType('naxi_sessions', 'user_agent', 'string', opts),
	]);
}
