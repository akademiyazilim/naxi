import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.alterTable('naxi_collections', (table) => {
		table.string('accountability').defaultTo('all');
	});

	await knex('naxi_collections').update({ accountability: 'all' });
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.alterTable('naxi_collections', (table) => {
		table.dropColumn('accountability');
	});
}