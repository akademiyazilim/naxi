import type { MergeCoreCollection } from '../index.js';

export type naxiExtension<Schema = any> = {
	name: string;
	bundle: string | null;
	schema: ExtensionSchema | null;
	meta: MergeCoreCollection<Schema, 'naxi_extensions', { enabled: boolean }>;
};

export type ExtensionSchema = {
	type: ExtensionTypes;
	local: boolean;
	version?: string;
};

export type ExtensionTypes =
	| 'interface'
	| 'display'
	| 'layout'
	| 'module'
	| 'panel'
	| 'hook'
	| 'endpoint'
	| 'operation'
	| 'bundle';
