import type { Driver } from '@naxi/storage';

export const _aliasMap: Record<string, string> = {
	local: '@naxi/storage-driver-local',
	s3: '@naxi/storage-driver-s3',
	supabase: '@naxi/storage-driver-supabase',
	gcs: '@naxi/storage-driver-gcs',
	azure: '@naxi/storage-driver-azure',
	cloudinary: '@naxi/storage-driver-cloudinary',
};

export const getStorageDriver = async (driverName: string): Promise<typeof Driver> => {
	if (driverName in _aliasMap) {
		driverName = _aliasMap[driverName]!;
	} else {
		throw new Error(`Driver "${driverName}" doesn't exist.`);
	}

	return (await import(driverName)).default;
};
