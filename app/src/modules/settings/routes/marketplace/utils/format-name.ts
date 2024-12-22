import type { RegistryDescribeResponse, RegistryListResponse } from '@naxi/extensions-registry';
import formatTitle from '@naxi/format-title';

type Extension = RegistryListResponse['data'][number] | RegistryDescribeResponse['data'];

export const formatName = (extension: Extension) => {
	let name = extension.name;

	if (name.startsWith('@')) {
		name = name.split('/')[1]!;
	}

	if (name.startsWith('naxi-extension-')) {
		name = name.substring('naxi-extension-'.length);
	}

	return formatTitle(name);
};
