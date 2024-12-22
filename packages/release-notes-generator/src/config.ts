import type { Config } from './types';

const config: Config = {
	repo: 'naxi/naxi',
	mainPackage: 'naxi',
	typedTitles: {
		major: '⚠️ Potential Breaking Changes',
		minor: '✨ New Features & Improvements',
		patch: '🐛 Bug Fixes & Optimizations',
		none: '📎 Misc.',
	},
	untypedPackageTitles: {
		docs: '📝 Documentation',
		'tests-blackbox': '🧪 Blackbox Tests',
	},
	versionTitle: '📦 Published Versions',
	noticeType: 'major',
	// '@naxi/app' should always be listed before '@naxi/api', other packages don't matter
	packageOrder: ['@naxi/app', '@naxi/api'],
	linkedPackages: [
		// Ensure '@naxi/app' is bumped with 'naxi' to reflect correct main version in app
		['naxi', '@naxi/app'],
	],
};

export default config;
