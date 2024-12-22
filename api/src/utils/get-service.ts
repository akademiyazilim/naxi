import { ForbiddenError } from '@naxi/errors';
import {
	AccessService,
	ActivityService,
	CommentsService,
	DashboardsService,
	FilesService,
	FlowsService,
	FoldersService,
	ItemsService,
	NotificationsService,
	OperationsService,
	PanelsService,
	PermissionsService,
	PoliciesService,
	PresetsService,
	RevisionsService,
	RolesService,
	SettingsService,
	SharesService,
	TranslationsService,
	UsersService,
	VersionsService,
	WebhooksService,
} from '../services/index.js';
import type { AbstractServiceOptions } from '../types/services.js';

/**
 * Select the correct service for the given collection. This allows the individual services to run
 * their custom checks (f.e. it allows `UsersService` to prevent updating TFA secret from outside).
 */
export function getService(collection: string, opts: AbstractServiceOptions): ItemsService {
	switch (collection) {
		case 'naxi_access':
			return new AccessService(opts);
		case 'naxi_activity':
			return new ActivityService(opts);
		case 'naxi_comments':
			return new CommentsService(opts);
		case 'naxi_dashboards':
			return new DashboardsService(opts);
		case 'naxi_files':
			return new FilesService(opts);
		case 'naxi_flows':
			return new FlowsService(opts);
		case 'naxi_folders':
			return new FoldersService(opts);
		case 'naxi_notifications':
			return new NotificationsService(opts);
		case 'naxi_operations':
			return new OperationsService(opts);
		case 'naxi_panels':
			return new PanelsService(opts);
		case 'naxi_permissions':
			return new PermissionsService(opts);
		case 'naxi_presets':
			return new PresetsService(opts);
		case 'naxi_policies':
			return new PoliciesService(opts);
		case 'naxi_revisions':
			return new RevisionsService(opts);
		case 'naxi_roles':
			return new RolesService(opts);
		case 'naxi_settings':
			return new SettingsService(opts);
		case 'naxi_shares':
			return new SharesService(opts);
		case 'naxi_translations':
			return new TranslationsService(opts);
		case 'naxi_users':
			return new UsersService(opts);
		case 'naxi_versions':
			return new VersionsService(opts);
		case 'naxi_webhooks':
			return new WebhooksService(opts);
		default:
			// Deny usage of other system collections via ItemsService
			if (collection.startsWith('naxi_')) throw new ForbiddenError();

			return new ItemsService(collection, opts);
	}
}
