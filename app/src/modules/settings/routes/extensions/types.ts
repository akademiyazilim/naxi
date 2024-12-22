import { ExtensionType as ExtensionTypeOriginal } from '@naxi/extensions';

export type ExtensionState = 'enabled' | 'disabled' | 'partial';

export type ExtensionType = ExtensionTypeOriginal | 'missing';
