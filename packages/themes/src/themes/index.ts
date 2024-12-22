import type { Theme } from '../schemas/index.js';
import { naxiDefault as darknaxiDefault } from './dark/index.js';
import {
	naxiColorMatch as lightnaxiColorMatch,
	naxiDefault as lightnaxiDefault,
	naxiMinimal as lightnaxiMinimal,
} from './light/index.js';

// We're using manually defined arrays here to guarantee the order
export const dark: Theme[] = [darknaxiDefault];
export const light: Theme[] = [lightnaxiDefault, lightnaxiMinimal, lightnaxiColorMatch];
