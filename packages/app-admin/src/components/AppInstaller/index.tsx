import { Provider } from "~/index.js";
import React from "react";
import { AppInstaller as Installer } from "./AppInstaller.js";
import type { ComponentWithChildren } from "~/types.js";

interface AppInstallerProviderProps {
    children: React.ReactNode;
}

const AppInstallerHOC = (Component: ComponentWithChildren) => {
    return function AppInstallerProvider({ children }: AppInstallerProviderProps) {
        return (
            <Installer>
                <Component>{children}</Component>
            </Installer>
        );
    };
};

export const AppInstaller = () => {
    return <Provider hoc={AppInstallerHOC} />;
};
