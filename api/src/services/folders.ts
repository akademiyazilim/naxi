import type { AbstractServiceOptions } from '../types/index.js';
import { ItemsService } from './items.js';

export class FoldersService extends ItemsService {
	constructor(options: AbstractServiceOptions) {
		super('naxi_folders', options);
	}
}
