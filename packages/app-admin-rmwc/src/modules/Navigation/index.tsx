import React, { Fragment, useCallback, useContext, useMemo, useState } from "react";
import styled from "@emotion/styled";
import { Drawer, DrawerContent, DrawerHeader } from "@webiny/ui/Drawer";
import {
    Brand as BrandSpec,
    Compose,
    HigherOrderComponent,
    MenuData,
    MenuItemRenderer,
    MenuItems,
    MenuItemsProps,
    NavigationRenderer as NavigationSpec,
    Provider,
    useNavigation as useAdminNavigation
} from "@webiny/app-admin";
import Hamburger from "./Hamburger";
import { MenuGroupRenderer } from "./renderers/MenuGroupRenderer";
import { MenuSectionItemRenderer } from "./renderers/MenuSectionItemRenderer";
import { MenuSectionRenderer } from "./renderers/MenuSectionRenderer";
import { MenuLinkRenderer } from "./renderers/MenuLinkRenderer";
import { MenuElementRenderer } from "./renderers/MenuElementRenderer";

import { ReactComponent as CreditCard } from "@material-design-icons/svg/outlined/credit_score.svg";
import { ReactComponent as Settings } from "@material-design-icons/svg/outlined/settings.svg";
import { ReactComponent as AuditLogsIcon } from "@material-design-icons/svg/outlined/assignment.svg";
import { ReactComponent as FormBuilderIcon } from "@material-design-icons/svg/outlined/check_box.svg";
import { ReactComponent as CmsIcon } from "@material-design-icons/svg/outlined/web.svg";
import { ReactComponent as PageBuilderIcon } from "@material-design-icons/svg/outlined/table_chart.svg";
import { ReactComponent as ApwIcon } from "@material-design-icons/svg/outlined/account_tree.svg";
import { ReactComponent as TenantManagerIcon } from "@material-design-icons/svg/outlined/domain.svg";
import { ReactComponent as SettingsIcon } from "@material-design-icons/svg/outlined/settings.svg";
import wbyLogo from "./stories/wby-logo.png";

import { List } from "@webiny/ui/List";
import { MenuFooter, MenuHeader, navContent, navHeader } from "./Styled";
import { Sidebar } from "@webiny/admin-ui";

const AutoWidthDrawer = styled(Drawer)`
    width: auto;
`;

interface NavigationContext {
    visible: boolean;

    setVisible(visible: boolean): void;
}

const NavigationContext = React.createContext<NavigationContext>({
    visible: false,
    setVisible: () => {
        return void 0;
    }
});
NavigationContext.displayName = "NavigationContext";

export function useNavigation(): NavigationContext {
    return useContext(NavigationContext);
}

const BrandImpl: HigherOrderComponent = Brand => {
    return function BrandWithHamburger() {
        return (
            <Fragment>
                <Hamburger />
                <Brand />
            </Fragment>
        );
    };
};

interface NavigationProviderProps {
    children?: React.ReactNode;
}

const NavigationProvider = (Component: React.ComponentType<NavigationProviderProps>) => {
    return function NavigationProvider(props: NavigationProviderProps) {
        const [visible, setVisible] = useState(false);

        const context = useMemo(() => ({ visible, setVisible }), [visible]);

        return (
            <NavigationContext.Provider value={context}>
                <Component {...props} />
            </NavigationContext.Provider>
        );
    };
};

export const NavigationImpl = () => {
    return function Navigation() {
        const { menuItems } = useAdminNavigation();
        const { visible, setVisible } = useNavigation();

        const hideDrawer = useCallback(() => {
            setVisible(false);
        }, []);

        const mainMenu = useMemo(
            () => menuItems.filter(m => !(m.tags || []).includes("footer")),
            [menuItems]
        );

        const footerMenu = useMemo(
            () => menuItems.filter(m => (m.tags || []).includes("footer")),
            [menuItems]
        );

        return (
            <AutoWidthDrawer modal open={visible} onClose={hideDrawer}>
                <DrawerHeader className={navHeader}>
                    <MenuHeader>
                        <BrandSpec />
                    </MenuHeader>
                </DrawerHeader>
                <DrawerContent className={navContent}>
                    <MenuItems menuItems={mainMenu} />
                </DrawerContent>
                <MenuFooter>
                    <List nonInteractive>
                        <MenuItems menuItems={footerMenu} />
                    </List>
                </MenuFooter>
            </AutoWidthDrawer>
        );
    };
};

const menuSorter = (a: MenuData, b: MenuData): number => {
    if (a.pin === b.pin) {
        return (a.label || "").localeCompare(b.label || "");
    }

    if (a.pin) {
        return a.pin === "first" ? -1 : 1;
    }

    if (b.pin) {
        return b.pin === "first" ? 1 : -1;
    }

    return (a.label || "").localeCompare(b.label || "");
};

const SortedMenuItems: HigherOrderComponent<MenuItemsProps> = MenuItems => {
    return function SortedMenuItems({ menuItems }) {
        return <MenuItems menuItems={[...menuItems].sort(menuSorter)} />;
    };
};

export const Navigation = () => {
    return (
        <div>
            <Sidebar
                title={"Webiny"}
                icon={
                    <Sidebar.Icon element={<img src={wbyLogo} alt={"Webiny"} />} label={"Webiny"} />
                }
            >
                <Sidebar.Item
                    icon={<Sidebar.Item.Icon label="Audit Logs" element={<AuditLogsIcon />} />}
                    content={"Audit Logs"}
                />
                <Sidebar.Item
                    icon={<Sidebar.Item.Icon label="Form Builder" element={<FormBuilderIcon />} />}
                    content={"Form Builder"}
                />
                <Sidebar.Item
                    icon={<Sidebar.Item.Icon label="Headless CMS" element={<CmsIcon />} />}
                    content={"Headless CMS"}
                />
                <Sidebar.Item
                    icon={<Sidebar.Item.Icon label="Page Builder" element={<PageBuilderIcon />} />}
                    content={"Page Builder"}
                >
                    <Sidebar.Item
                        icon={<Sidebar.Item.Icon label="Blocks" element={<CreditCard />} />}
                        content={"Blocks"}
                    >
                        <Sidebar.Item content={"Blocks"} />
                        <Sidebar.Item content={"Categories"} />
                    </Sidebar.Item>
                    <Sidebar.Item
                        icon={<Sidebar.Item.Icon label="Pages" element={<Settings />} />}
                        content={"Pages"}
                    >
                        <Sidebar.Item content={"Categories"} />
                        <Sidebar.Item content={"Menus"} />
                        <Sidebar.Item content={"Pages"} />
                        <Sidebar.Item content={"Templates"} />
                    </Sidebar.Item>
                </Sidebar.Item>
                <Sidebar.Item
                    icon={<Sidebar.Item.Icon label="Publishing Workflows" element={<ApwIcon />} />}
                    content={"Publishing Workflows"}
                >
                    <Sidebar.Item content={"Workflows"} />
                    <Sidebar.Item content={"Content Reviews"} />
                </Sidebar.Item>
                <Sidebar.Item
                    icon={
                        <Sidebar.Item.Icon label="Tenant manager" element={<TenantManagerIcon />} />
                    }
                    content={"Tenant manager"}
                />
                <Sidebar.Item
                    icon={<Sidebar.Item.Icon label="Settings" element={<SettingsIcon />} />}
                    content={"Settings"}
                />
            </Sidebar>
        </div>
    );
};
