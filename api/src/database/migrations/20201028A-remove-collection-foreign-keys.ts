import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.alterTable('naxi_fields', (table) => {
		table.dropForeign(['collection']);
	});

	await knex.schema.alterTable('naxi_activity', (table) => {
		table.dropForeign(['collection']);
	});

	await knex.schema.alterTable('naxi_permissions', (table) => {
		table.dropForeign(['collection']);
	});

	await knex.schema.alterTable('naxi_presets', (table) => {
		table.dropForeign(['collection']);
	});

	await knex.schema.alterTable('naxi_relations', (table) => {
		table.dropForeign(['one_collection']);
		table.dropForeign(['many_collection']);
	});

	await knex.schema.alterTable('naxi_revisions', (table) => {
		table.dropForeign(['collection']);
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.alterTable('naxi_fields', (table) => {
		table.foreign('collection').references('naxi_collections.collection');
	});

	await knex.schema.alterTable('naxi_activity', (table) => {
		table.foreign('collection').references('naxi_collections.collection');
	});

	await knex.schema.alterTable('naxi_permissions', (table) => {
		table.foreign('collection').references('naxi_collections.collection');
	});

	await knex.schema.alterTable('naxi_presets', (table) => {
		table.foreign('collection').references('naxi_collections.collection');
	});

	await knex.schema.alterTable('naxi_relations', (table) => {
		table.foreign('one_collection').references('naxi_collections.collection');
		table.foreign('many_collection').references('naxi_collections.collection');
	});

	await knex.schema.alterTable('naxi_revisions', (table) => {
		table.foreign('collection').references('naxi_collections.collection');
	});
}
