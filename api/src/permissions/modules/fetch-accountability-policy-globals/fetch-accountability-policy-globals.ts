import type { Accountability, Globals } from '@naxi/types';
import { fetchPolicies } from '../../lib/fetch-policies.js';
import type { Context } from '../../types.js';

export async function fetchAccountabilityPolicyGlobals(
	accountability: Pick<Accountability, 'user' | 'roles' | 'ip' | 'admin' | 'app'>,
	context: Context,
): Promise<Globals> {
	const policies = await fetchPolicies(accountability, context);

	// Policies are already filtered down by the accountability IP, so we don't need to check it again

	const result = await context.knex
		.select(1)
		.from('naxi_policies')
		.whereIn('id', policies)
		.where('enforce_tfa', true)
		.first();

	return {
		app_access: accountability.app,
		admin_access: accountability.admin,
		enforce_tfa: !!result,
	};
}