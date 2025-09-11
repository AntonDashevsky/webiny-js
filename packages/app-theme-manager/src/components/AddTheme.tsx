import type React from "react";
import { useEffect } from "react";
import { useThemeManager } from "~/hooks/useThemeManager";
import type { ThemeSource } from "~/types";

export type AddThemeProps = ThemeSource;

export const AddTheme: React.ComponentType<AddThemeProps> = props => {
    const { addTheme } = useThemeManager();

    useEffect(() => {
        return addTheme(props);
    }, []);

    return null;
};
