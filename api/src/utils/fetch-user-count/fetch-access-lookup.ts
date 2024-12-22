import type { PrimaryKey } from '@naxi/types';
import type { Knex } from 'knex';

export interface AccessLookup {
	role: string | null;
	user: string | null;
	app_access: boolean | number;
	admin_access: boolean | number;
	user_status: 'active' | string;
	user_role: string | null;
}

export interface FetchAccessLookupOptions {
	excludeAccessRows?: PrimaryKey[];
	excludePolicies?: PrimaryKey[];
	excludeUsers?: PrimaryKey[];
	excludeRoles?: PrimaryKey[];
	adminOnly?: boolean;
	knex: Knex;
}

export async function fetchAccessLookup(options: FetchAccessLookupOptions): Promise<AccessLookup[]> {
	let query = options.knex
		.select(
			'naxi_access.role',
			'naxi_access.user',
			'naxi_policies.app_access',
			'naxi_policies.admin_access',
			'naxi_users.status as user_status',
			'naxi_users.role as user_role',
		)
		.from('naxi_access')
		.leftJoin('naxi_policies', 'naxi_access.policy', 'naxi_policies.id')
		.leftJoin('naxi_users', 'naxi_access.user', 'naxi_users.id');

	if (options.excludeAccessRows && options.excludeAccessRows.length > 0) {
		query = query.whereNotIn('naxi_access.id', options.excludeAccessRows);
	}

	if (options.excludePolicies && options.excludePolicies.length > 0) {
		query = query.whereNotIn('naxi_access.policy', options.excludePolicies);
	}

	if (options.excludeUsers && options.excludeUsers.length > 0) {
		query = query.where((q) =>
			q.whereNotIn('naxi_access.user', options.excludeUsers!).orWhereNull('naxi_access.user'),
		);
	}

	if (options.excludeRoles && options.excludeRoles.length > 0) {
		query = query.where((q) =>
			q.whereNotIn('naxi_access.role', options.excludeRoles!).orWhereNull('naxi_access.role'),
		);
	}

	if (options.adminOnly) {
		query = query.where('naxi_policies.admin_access', 1);
	}

	return query;
}
