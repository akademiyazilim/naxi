import type { Accountability } from '@naxi/types';

export function createDefaultAccountability(overrides?: Partial<Accountability>): Accountability {
	return {
		role: null,
		user: null,
		roles: [],
		admin: false,
		app: false,
		ip: null,
		...overrides,
	};
}
