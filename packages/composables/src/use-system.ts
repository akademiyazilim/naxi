import { API_INJECT, EXTENSIONS_INJECT, SDK_INJECT, STORES_INJECT } from '@naxi/constants';
import type { AppExtensionConfigs } from '@naxi/extensions';
import type { naxiClient, RestClient } from '@naxi/sdk';
import type { RefRecord } from '@naxi/types';
import type { AxiosInstance } from 'axios';
import { inject } from 'vue';

export function useStores(): Record<string, any> {
	const stores = inject<Record<string, any>>(STORES_INJECT);

	if (!stores) throw new Error('[useStores]: The stores could not be found.');

	return stores;
}

export function useApi(): AxiosInstance {
	const api = inject<AxiosInstance>(API_INJECT);

	if (!api) throw new Error('[useApi]: The api could not be found.');

	return api;
}

export function useSdk<Schema extends object = any>(): naxiClient<Schema> & RestClient<Schema> {
	const sdk = inject<naxiClient<Schema> & RestClient<Schema>>(SDK_INJECT);

	if (!sdk) throw new Error('[useSdk]: The sdk could not be found.');

	return sdk;
}

export function useExtensions(): RefRecord<AppExtensionConfigs> {
	const extensions = inject<RefRecord<AppExtensionConfigs>>(EXTENSIONS_INJECT);

	if (!extensions) throw new Error('[useExtensions]: The extensions could not be found.');

	return extensions;
}
