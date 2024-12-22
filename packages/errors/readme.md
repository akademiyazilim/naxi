# @naxi/errors

Utility functions to help creating and checking against naxi errors.

## Installation

```
pnpm add @naxi/errors
```

## Usage

### Creating a new Error class

```
createError(code: string, message: string | (T) => string, status = 500): naxiErrorConstructor<T>
```

```ts
import { createError } from '@naxi/errors';

const ForbiddenError = createError('FORBIDDEN', "You don't have permissions to see this.", 403);

throw new ForbiddenError();
```

You can configure additional extensions for the error class which should be communicated to the end user:

```ts
import { createError } from '@naxi/errors';

interface ForbiddenErrorExtensions {
	collection: string;
	field: string;
}

const ForbiddenError = createError<ForbiddenErrorExtensions>(
	'FORBIDDEN',
	"You don't have permissions to see this.",
	403,
);

throw new ForbiddenError({
	collection: 'articles',
	field: 'title',
});
```

You can then also use those extensions to generate out the error message:

```ts
import { createError } from '@naxi/errors';

interface ForbiddenErrorExtensions {
	collection: string;
	field: string;
}

const messageConstructor = (extensions: ForbiddenErrorExtensions) =>
	`You don't have permissions to see "${extensions.field}" in "${extensions.collection}".`;

const ForbiddenError = createError<ForbiddenErrorExtensions>('FORBIDDEN', messageConstructor, 403);

throw new ForbiddenError({
	collection: 'articles',
	field: 'title',
});
```

### Checking if a given param is a valid naxiError instance

```ts
import { isnaxiError, createError } from '@naxi/errors';

const ForbiddenError = createError('FORBIDDEN', "You don't have permissions to see this.", 403);

isnaxiError(new ForbiddenError()); // true
isnaxiError(new Error()); // false
```
