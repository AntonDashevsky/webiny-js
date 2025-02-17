import React, { memo } from "react";
import { ThemesModule } from "./modules/themes/index.js";
import { ThemeSource } from "~/types.js";
export type { ThemeSource } from "~/types.js";
export { AddTheme } from "./components/AddTheme.js";
export { createThemeLoader } from "./website/createThemeLoader.js";
export { useThemeManager } from "./hooks/useThemeManager.js";
export { useTenantThemes } from "./hooks/useTenantThemes.js";

interface ThemeManagerAppProps {
    themes?: ThemeSource[];
}

function ThemeManagerApp(props: ThemeManagerAppProps) {
    return <ThemesModule {...props} />;
}

export const ThemeManager = memo(ThemeManagerApp);
