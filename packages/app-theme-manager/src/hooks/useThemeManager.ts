import { useContext } from "react";
import { ThemeManagerContext } from "~/components/ThemeManagerProvider.js";

export function useThemeManager() {
    return useContext(ThemeManagerContext);
}
