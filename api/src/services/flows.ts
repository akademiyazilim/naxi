import type { FlowRaw, Item, PrimaryKey } from '@naxi/types';
import { getFlowManager } from '../flows.js';
import type { AbstractServiceOptions, MutationOptions } from '../types/index.js';
import { ItemsService } from './items.js';

export class FlowsService extends ItemsService<FlowRaw> {
	constructor(options: AbstractServiceOptions) {
		super('naxi_flows', options);
	}

	override async createOne(data: Partial<Item>, opts?: MutationOptions): Promise<PrimaryKey> {
		const result = await super.createOne(data, opts);

		const flowManager = getFlowManager();
		await flowManager.reload();

		return result;
	}

	override async updateMany(keys: PrimaryKey[], data: Partial<Item>, opts?: MutationOptions): Promise<PrimaryKey[]> {
		const result = await super.updateMany(keys, data, opts);

		const flowManager = getFlowManager();
		await flowManager.reload();

		return result;
	}

	override async deleteMany(keys: PrimaryKey[], opts?: MutationOptions): Promise<PrimaryKey[]> {
		// this is to prevent foreign key constraint error on naxi_operations resolve/reject during cascade deletion
		await this.knex('naxi_operations').update({ resolve: null, reject: null }).whereIn('flow', keys);

		const result = await super.deleteMany(keys, opts);

		const flowManager = getFlowManager();
		await flowManager.reload();

		return result;
	}
}
