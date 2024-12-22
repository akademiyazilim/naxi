import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.alterTable('naxi_collections', (table) => {
		table.string('preview_url').nullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.alterTable('naxi_collections', (table) => {
		table.dropColumn('preview_url');
	});
}
