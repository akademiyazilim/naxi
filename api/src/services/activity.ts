import type { AbstractServiceOptions } from '../types/index.js';
import { ItemsService } from './items.js';

export class ActivityService extends ItemsService {
	constructor(options: AbstractServiceOptions) {
		super('naxi_activity', options);
	}
}
