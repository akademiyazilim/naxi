import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.alterTable('naxi_collections', (table) => {
		table.json('item_duplication_fields').nullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.alterTable('naxi_collections', (table) => {
		table.dropColumn('item_duplication_fields');
	});
}
