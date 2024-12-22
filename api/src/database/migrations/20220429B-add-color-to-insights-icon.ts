import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.alterTable('naxi_dashboards', (table) => {
		table.string('color').nullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.alterTable('naxi_dashboards', (table) => {
		table.dropColumn('color');
	});
}
