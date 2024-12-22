import { naxi_VARIABLES_REGEX } from '../constants/naxi-variables.js';

export const isnaxiVariable = (key: string): boolean => {
	if (key.endsWith('_FILE')) {
		key = key.slice(0, -5);
	}

	return naxi_VARIABLES_REGEX.some((regex) => regex.test(key));
};
