import { isSystemCollection } from '@naxi/system-data';

export function getEndpoint(collection: string): string {
	if (isSystemCollection(collection)) {
		return `/${collection.substring(9)}`;
	}

	return `/items/${collection}`;
}
