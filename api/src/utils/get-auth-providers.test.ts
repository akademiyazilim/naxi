import { useEnv } from '@naxi/env';
import { describe, expect, test, vi } from 'vitest';
import { getAuthProviders } from './get-auth-providers.js';

vi.mock('@naxi/env');

const scenarios = [
	{
		name: 'when no providers configured',
		input: {},
		output: [],
	},
	{
		name: 'when no driver configured',
		input: {
			AUTH_PROVIDERS: 'naxi',
		},
		output: [],
	},

	{
		name: 'when single provider and driver are properly configured',
		input: {
			AUTH_PROVIDERS: 'naxi',
			AUTH_naxi_DRIVER: 'openid',
			AUTH_naxi_LABEL: 'naxi',
			AUTH_naxi_ICON: 'hare',
		},
		output: [
			{
				name: 'naxi',
				driver: 'openid',
				label: 'naxi',
				icon: 'hare',
			},
		],
	},

	{
		name: 'when multiple provider and driver are properly configured',
		input: {
			AUTH_PROVIDERS: 'naxi,custom',
			AUTH_naxi_DRIVER: 'openid',
			AUTH_naxi_LABEL: 'naxi',
			AUTH_naxi_ICON: 'hare',
			AUTH_CUSTOM_DRIVER: 'openid',
			AUTH_CUSTOM_ICON: 'lock',
		},
		output: [
			{
				name: 'naxi',
				driver: 'openid',
				label: 'naxi',
				icon: 'hare',
			},
			{
				name: 'custom',
				driver: 'openid',
				icon: 'lock',
			},
		],
	},
];

describe('get auth providers', () => {
	for (const scenario of scenarios) {
		test(scenario.name, () => {
			vi.mocked(useEnv).mockReturnValue(scenario.input);

			expect(getAuthProviders()).toEqual(scenario.output);
		});
	}
});
