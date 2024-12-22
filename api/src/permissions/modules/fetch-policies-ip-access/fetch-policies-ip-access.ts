import type { Accountability } from '@naxi/types';
import { toArray } from '@naxi/utils';
import type { Knex } from 'knex';
import { withCache } from '../../utils/with-cache.js';

export const fetchPoliciesIpAccess = withCache('policies-ip-access', _fetchPoliciesIpAccess, ({ user, roles }) => ({
	user,
	roles,
}));

export async function _fetchPoliciesIpAccess(
	accountability: Pick<Accountability, 'user' | 'roles'>,
	knex: Knex,
): Promise<string[][]> {
	const query = knex('naxi_access')
		.select({ ip_access: 'naxi_policies.ip_access' })
		.leftJoin('naxi_policies', 'naxi_access.policy', 'naxi_policies.id')
		.whereNotNull('naxi_policies.ip_access');

	// No roles and no user means unauthenticated request
	if (accountability.roles.length === 0 && !accountability.user) {
		query.where({
			role: null,
			user: null,
		});
	} else {
		query.where(function () {
			if (accountability.user) {
				this.orWhere('naxi_access.user', accountability.user);
			}

			this.orWhereIn('naxi_access.role', accountability.roles);
		});
	}

	const rows = await query;

	return rows.filter(({ ip_access }) => ip_access).map(({ ip_access }) => toArray(ip_access));
}
