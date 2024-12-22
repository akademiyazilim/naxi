export interface naxiError<Extensions = void> extends Error {
	extensions: Extensions;
	code: string;
	status: number;
}

export interface naxiErrorConstructor<Extensions = void> {
	new (extensions: Extensions, options?: ErrorOptions): naxiError<Extensions>;
	readonly prototype: naxiError<Extensions>;
}

export const createError = <Extensions = void>(
	code: string,
	message: string | ((extensions: Extensions) => string),
	status = 500,
): naxiErrorConstructor<Extensions> => {
	return class extends Error implements naxiError<Extensions> {
		override name = 'naxiError';
		extensions: Extensions;
		code = code.toUpperCase();
		status = status;

		constructor(extensions: Extensions, options?: ErrorOptions) {
			const msg = typeof message === 'string' ? message : message(extensions as Extensions);

			super(msg, options);

			this.extensions = extensions;
		}

		override toString() {
			return `${this.name} [${this.code}]: ${this.message}`;
		}
	};
};
