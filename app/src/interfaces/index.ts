import type { InterfaceConfig } from '@naxi/extensions';
import { sortBy } from 'lodash';
import { App } from 'vue';

export function getInternalInterfaces(): InterfaceConfig[] {
	const interfaces = import.meta.glob<InterfaceConfig>(['./*/index.ts', './_system/*/index.ts'], {
		import: 'default',
		eager: true,
	});

	return sortBy(Object.values(interfaces), 'id');
}

export function registerInterfaces(interfaces: InterfaceConfig[], app: App): void {
	for (const inter of interfaces) {
		app.component(`interface-${inter.id}`, inter.component);

		if (typeof inter.options !== 'function' && Array.isArray(inter.options) === false && inter.options !== null) {
			app.component(`interface-options-${inter.id}`, inter.options);
		}
	}
}