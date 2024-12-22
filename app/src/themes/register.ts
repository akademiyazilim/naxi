import type { Theme } from '@naxi/themes';
import { useThemeStore } from '@naxi/themes';

export const registerThemes = (themes: Theme[]) => {
	const themesStore = useThemeStore();
	themes.forEach((theme) => themesStore.registerTheme(theme));
};
