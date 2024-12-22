import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.alterTable('naxi_fields', (table) => {
		table.json('validation');
		table.text('validation_message');
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.alterTable('naxi_fields', (table) => {
		table.dropColumn('validation');
		table.dropColumn('validation_message');
	});
}
