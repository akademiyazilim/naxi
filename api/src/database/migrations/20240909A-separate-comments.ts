import { Action } from '@naxi/constants';
import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('naxi_comments', (table) => {
		table.uuid('id').primary().notNullable();

		table.string('collection', 64).notNullable();

		table.string('item').notNullable();
		table.text('comment').notNullable();

		table.timestamp('date_created').defaultTo(knex.fn.now());
		table.timestamp('date_updated').defaultTo(knex.fn.now());
		table.uuid('user_created').references('id').inTable('naxi_users').onDelete('SET NULL');
		// Cannot have two constraints from/to the same table, handled on API side
		table.uuid('user_updated').references('id').inTable('naxi_users');
	});
}

export async function down(knex: Knex): Promise<void> {
	const rowsLimit = 50;
	let hasMore = true;

	while (hasMore) {
		const comments = await knex
			.select('id', 'collection', 'item', 'comment', 'date_created', 'user_created')
			.from('naxi_comments')
			.limit(rowsLimit);

		if (comments.length === 0) {
			hasMore = false;
			break;
		}

		await knex.transaction(async (trx) => {
			for (const comment of comments) {
				const migratedRecords = await trx('naxi_activity')
					.select('id')
					.where('collection', '=', 'naxi_comments')
					.andWhere('item', '=', comment.id)
					.andWhere('action', '=', Action.CREATE)
					.limit(1);

				if (migratedRecords[0]) {
					await trx('naxi_activity')
						.update({
							action: Action.COMMENT,
							collection: comment.collection,
							item: comment.item,
							comment: comment.comment,
						})
						.where('id', '=', migratedRecords[0].id);
				} else {
					await trx('naxi_activity').insert({
						action: Action.COMMENT,
						collection: comment.collection,
						item: comment.item,
						comment: comment.comment,
						user: comment.user_created,
						timestamp: comment.date_created,
					});
				}

				await trx('naxi_comments').where('id', '=', comment.id).delete();
			}
		});
	}

	await knex.schema.dropTable('naxi_comments');
}
