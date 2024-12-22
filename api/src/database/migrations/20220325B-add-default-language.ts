import type { Knex } from 'knex';
import { getHelpers } from '../helpers/index.js';

export async function up(knex: Knex): Promise<void> {
	const helper = getHelpers(knex).schema;

	await knex.schema.alterTable('naxi_settings', (table) => {
		table.string('default_language').notNullable().defaultTo('en-US');
	});

	await helper.changeToType('naxi_users', 'language', 'string', {
		nullable: true,
		default: null,
		length: 255,
	});
}

export async function down(knex: Knex): Promise<void> {
	const helper = getHelpers(knex).schema;

	await knex.schema.alterTable('naxi_settings', (table) => {
		table.dropColumn('default_language');
	});

	await helper.changeToType('naxi_users', 'language', 'string', {
		nullable: true,
		default: 'en-US',
		length: 255,
	});
}
