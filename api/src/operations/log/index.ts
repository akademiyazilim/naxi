import { defineOperationApi } from '@naxi/extensions';
import { optionToString } from '@naxi/utils';
import { useLogger } from '../../logger/index.js';

type Options = {
	message: unknown;
};

export default defineOperationApi<Options>({
	id: 'log',

	handler: ({ message }) => {
		const logger = useLogger();

		logger.info(optionToString(message));
	},
});
