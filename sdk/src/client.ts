import type { ClientGlobals, ClientOptions, naxiClient } from './types/client.js';

/**
 * The default globals supplied to the client
 */
const defaultGlobals: ClientGlobals = {
	fetch: globalThis.fetch,
	WebSocket: globalThis.WebSocket,
	URL: globalThis.URL,
	logger: globalThis.console,
};

/**
 * Creates a client to communicate with a naxi app.
 *
 * @param url The URL to the naxi app.
 * @param options The client options. Defaults to the standard implementation of `globals`.
 *
 * @returns A naxi client.
 */
export const createnaxi = <Schema = any>(url: string, options: ClientOptions = {}): naxiClient<Schema> => {
	const globals = options.globals ? { ...defaultGlobals, ...options.globals } : defaultGlobals;
	return {
		globals,
		url: new globals.URL(url),
		with(createExtension) {
			return {
				...this,
				...createExtension(this),
			};
		},
	};
};
