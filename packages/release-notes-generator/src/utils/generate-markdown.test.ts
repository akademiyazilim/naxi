import { describe, expect, test } from 'vitest';
import config from '../config.js';
import type { Change, Notice, PackageVersion, Type, UntypedPackage } from '../types.js';
import { generateMarkdown } from './generate-markdown.js';

const change1: Change = {
	summary: "Made naxi even more magical\nAnd here's some additional context",
	commit: 'abcd123',
	githubInfo: {
		user: 'naxi',
		pull: 1,
		links: {
			commit: '[`abcd123`](https://github.com/naxi/naxi/commit/abcd123)',
			pull: '[#1](https://github.com/naxi/naxi/pull/1)',
			user: '[@naxi](https://github.com/naxi)',
		},
	},
};

const change2: Change = {
	summary: 'Improved some things a little',
	commit: 'efgh456',
	githubInfo: {
		user: 'naxi',
		pull: 2,
		links: {
			commit: '[`efgh456`](https://github.com/naxi/naxi/commit/efgh456)',
			pull: '[#2](https://github.com/naxi/naxi/pull/2)',
			user: '[@naxi](https://github.com/naxi)',
		},
	},
};

test('should generate basic release notes', () => {
	const types: Type[] = [
		{
			title: config.typedTitles.minor,
			packages: [
				{
					name: '@naxi/api',
					changes: [change1],
				},
			],
		},
		{
			title: config.typedTitles.patch,
			packages: [
				{
					name: '@naxi/app',
					changes: [change1, change2],
				},
			],
		},
	];

	const untypedPackages: UntypedPackage[] = [
		{ name: config.untypedPackageTitles['docs']!, changes: [change1, change2] },
		{ name: config.untypedPackageTitles['tests-blackbox']!, changes: [change1] },
	];

	const packageVersions: PackageVersion[] = [
		{ name: '@naxi/api', version: '10.0.0' },
		{ name: '@naxi/app', version: '10.0.0' },
	];

	const markdown = generateMarkdown([], types, untypedPackages, packageVersions);

	expect(markdown).toMatchInlineSnapshot(`
		"### ✨ New Features & Improvements

		- **@naxi/api**
		  - Made naxi even more magical ([#1](https://github.com/naxi/naxi/pull/1) by @naxi)
		    And here's some additional context

		### 🐛 Bug Fixes & Optimizations

		- **@naxi/app**
		  - Made naxi even more magical ([#1](https://github.com/naxi/naxi/pull/1) by @naxi)
		    And here's some additional context
		  - Improved some things a little ([#2](https://github.com/naxi/naxi/pull/2) by @naxi)

		### 📝 Documentation

		- Made naxi even more magical ([#1](https://github.com/naxi/naxi/pull/1) by @naxi)
		  And here's some additional context
		- Improved some things a little ([#2](https://github.com/naxi/naxi/pull/2) by @naxi)

		### 🧪 Blackbox Tests

		- Made naxi even more magical ([#1](https://github.com/naxi/naxi/pull/1) by @naxi)
		  And here's some additional context

		### 📦 Published Versions

		- \`@naxi/api@10.0.0\`
		- \`@naxi/app@10.0.0\`"
	`);
});

describe('notices', () => {
	const notices: Notice[] = [
		{ notice: 'This is an example notice.', change: change1 },
		{ notice: 'This is another notice.', change: change2 },
	];

	test('should create section with notices when no changes', () => {
		const markdown = generateMarkdown(notices, [], [], []);

		expect(markdown).toMatchInlineSnapshot(`
			"### ⚠️ Potential Breaking Changes

			**Made naxi even more magical... ([#1](https://github.com/naxi/naxi/pull/1))**
			This is an example notice.

			**Improved some things a little ([#2](https://github.com/naxi/naxi/pull/2))**
			This is another notice."
		`);
	});

	test('should show notices along with changes', () => {
		const types: Type[] = [
			{
				title: config.typedTitles[config.noticeType],
				packages: [
					{
						name: '@naxi/api',
						changes: [change1],
					},
				],
			},
		];

		const markdown = generateMarkdown(notices, types, [], []);

		expect(markdown).toMatchInlineSnapshot(`
			"### ⚠️ Potential Breaking Changes

			**Made naxi even more magical... ([#1](https://github.com/naxi/naxi/pull/1))**
			This is an example notice.

			**Improved some things a little ([#2](https://github.com/naxi/naxi/pull/2))**
			This is another notice.

			- **@naxi/api**
			  - Made naxi even more magical ([#1](https://github.com/naxi/naxi/pull/1) by @naxi)
			    And here's some additional context"
		`);
	});
});
