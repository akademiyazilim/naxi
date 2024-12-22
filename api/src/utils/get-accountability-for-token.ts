import { InvalidCredentialsError } from '@naxi/errors';
import type { Accountability } from '@naxi/types';
import getDatabase from '../database/index.js';
import { fetchRolesTree } from '../permissions/lib/fetch-roles-tree.js';
import { fetchGlobalAccess } from '../permissions/modules/fetch-global-access/fetch-global-access.js';
import { createDefaultAccountability } from '../permissions/utils/create-default-accountability.js';
import { getSecret } from './get-secret.js';
import isnaxiJWT from './is-naxi-jwt.js';
import { verifyAccessJWT } from './jwt.js';
import { verifySessionJWT } from './verify-session-jwt.js';

export async function getAccountabilityForToken(
	token?: string | null,
	accountability?: Accountability,
): Promise<Accountability> {
	if (!accountability) {
		accountability = createDefaultAccountability();
	}

	// Try finding the user with the provided token
	const database = getDatabase();

	if (token) {
		if (isnaxiJWT(token)) {
			const payload = verifyAccessJWT(token, getSecret());

			if ('session' in payload) {
				await verifySessionJWT(payload);
			}

			if (payload.share) accountability.share = payload.share;

			if (payload.id) accountability.user = payload.id;

			accountability.role = payload.role;
			accountability.roles = await fetchRolesTree(payload.role, database);

			const { admin, app } = await fetchGlobalAccess(accountability, database);

			accountability.admin = admin;
			accountability.app = app;
		} else {
			const user = await database
				.select('naxi_users.id', 'naxi_users.role')
				.from('naxi_users')
				.where({
					'naxi_users.token': token,
					status: 'active',
				})
				.first();

			if (!user) {
				throw new InvalidCredentialsError();
			}

			accountability.user = user.id;
			accountability.role = user.role;
			accountability.roles = await fetchRolesTree(user.role, database);

			const { admin, app } = await fetchGlobalAccess(accountability, database);

			accountability.admin = admin;
			accountability.app = app;
		}
	}

	return accountability;
}
