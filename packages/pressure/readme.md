# @naxi/pressure

Pressure based rate limiter

## Description

This package exports a pressure based rate limiter that is used within naxi, an open-source headless CMS.

For more information about naxi, visit the [official website](https://naxi.io).

## Installation

```
npm install @naxi/pressure
```

## Usage

### Standalone

The pressure monitor is a class that can be used anywhere:

```js
import { PressureMonitor } from '@naxi/pressure';

const monitor = new PressureMonitor({
	maxEventLoopUtilization: 0.8,
});

monitor.overloaded; // true | false
```

### Express

The library also exports an express middleware that can be used to throw an Error when the pressure monitor reports
overloaded:

```js
import express from 'express';
import { handlePressure } from '@naxi/pressure';

const app = express();

app.use(
	handlePressure({
		maxEventLoopUtilization: 0.8,
	}),
);
```

## License

This package is licensed under the MIT License. See the
[LICENSE](https://github.com/naxi/naxi/blob/main/packages/pressure/license) file for more information.

## Additional Resources

- [naxi Website](https://naxi.io)
- [naxi GitHub Repository](https://github.com/naxi/naxi)
