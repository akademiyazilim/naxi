import { toArray } from '@naxi/utils';
import type { Knex } from 'knex';
import { isArray } from 'lodash-es';

export async function up(knex: Knex): Promise<void> {
	const fields = await knex
		.select<{ id: number; special: string }[]>('id', 'special')
		.from('naxi_fields')
		.whereNotNull('special')
		.orWhere('special', '<>', '');

	for (const { id, special } of fields) {
		let parsedSpecial;

		try {
			if (special.includes('{')) {
				// Fix invalid data in Postgres
				parsedSpecial = toArray(special.replace(/{/g, '').replace(/}/g, '').replace(/"/g, ''));
			} else {
				parsedSpecial = toArray(special);
			}
		} catch {
			continue;
		}

		if (parsedSpecial && isArray(parsedSpecial)) {
			// Perform the update again in case it was not performed prior
			parsedSpecial = parsedSpecial.map((special) => {
				switch (special) {
					case 'boolean':
					case 'csv':
					case 'json':
						return 'cast-' + special;
					default:
						return special;
				}
			});

			const parsedSpecialString = parsedSpecial.join(',');

			if (parsedSpecialString !== special) {
				await knex('naxi_fields').update({ special: parsedSpecialString }).where({ id });
			}
		}
	}
}

export async function down(_knex: Knex): Promise<void> {
	// Do nothing
}