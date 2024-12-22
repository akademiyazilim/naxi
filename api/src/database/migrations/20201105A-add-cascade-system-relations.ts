import type { Knex } from 'knex';

const updates = [
	{
		table: 'naxi_fields',
		constraints: [
			{
				column: 'group',
				references: 'naxi_fields.id',
			},
		],
	},
	{
		table: 'naxi_files',
		constraints: [
			{
				column: 'folder',
				references: 'naxi_folders.id',
			},
			{
				column: 'uploaded_by',
				references: 'naxi_users.id',
			},
			{
				column: 'modified_by',
				references: 'naxi_users.id',
			},
		],
	},
	{
		table: 'naxi_folders',
		constraints: [
			{
				column: 'parent',
				references: 'naxi_folders.id',
			},
		],
	},
	{
		table: 'naxi_permissions',
		constraints: [
			{
				column: 'role',
				references: 'naxi_roles.id',
			},
		],
	},
	{
		table: 'naxi_presets',
		constraints: [
			{
				column: 'user',
				references: 'naxi_users.id',
			},
			{
				column: 'role',
				references: 'naxi_roles.id',
			},
		],
	},
	{
		table: 'naxi_revisions',
		constraints: [
			{
				column: 'activity',
				references: 'naxi_activity.id',
			},
			{
				column: 'parent',
				references: 'naxi_revisions.id',
			},
		],
	},
	{
		table: 'naxi_sessions',
		constraints: [
			{
				column: 'user',
				references: 'naxi_users.id',
			},
		],
	},
	{
		table: 'naxi_settings',
		constraints: [
			{
				column: 'project_logo',
				references: 'naxi_files.id',
			},
			{
				column: 'public_foreground',
				references: 'naxi_files.id',
			},
			{
				column: 'public_background',
				references: 'naxi_files.id',
			},
		],
	},
	{
		table: 'naxi_users',
		constraints: [
			{
				column: 'role',
				references: 'naxi_roles.id',
			},
		],
	},
];

/**
 * NOTE:
 * Not all databases allow (or support) recursive onUpdate/onDelete triggers. MS SQL / Oracle flat out deny creating them,
 * Postgres behaves erratic on those triggers, not sure if MySQL / Maria plays nice either.
 */

export async function up(knex: Knex): Promise<void> {
	for (const update of updates) {
		await knex.schema.alterTable(update.table, (table) => {
			for (const constraint of update.constraints) {
				table.dropForeign([constraint.column]);
				table.foreign(constraint.column).references(constraint.references);
			}
		});
	}
}

export async function down(knex: Knex): Promise<void> {
	for (const update of updates) {
		await knex.schema.alterTable(update.table, (table) => {
			for (const constraint of update.constraints) {
				table.dropForeign([constraint.column]);
			}
		});
	}
}
