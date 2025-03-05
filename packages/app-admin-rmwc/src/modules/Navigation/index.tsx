import React, { Fragment, useContext } from "react";
import {
    Brand as BrandSpec,
    Compose,
    HigherOrderComponent,
    MenuItemRenderer,
    MenuItems,
    MenuItemsProps,
    NavigationRenderer as NavigationSpec,
    Provider
} from "@webiny/app-admin";
import Hamburger from "./Hamburger";
import { MenuGroupRenderer } from "./renderers/MenuGroupRenderer";
import { MenuSectionItemRenderer } from "./renderers/MenuSectionItemRenderer";
import { MenuSectionRenderer } from "./renderers/MenuSectionRenderer";
import { MenuLinkRenderer } from "./renderers/MenuLinkRenderer";
import { MenuElementRenderer } from "./renderers/MenuElementRenderer";
import { SidebarProvider } from "@webiny/admin-ui/Sidebar/components/SidebarProvider";
import { DropdownMenu, Sidebar, Tag } from "@webiny/admin-ui";
import wbyLogo from "./wby-logo.png";

import { useLocation } from "@webiny/react-router";
import { ReactComponent as AuditLogsIcon } from "@material-design-icons/svg/outlined/assignment.svg";
import { ReactComponent as FormBuilderIcon } from "@material-design-icons/svg/outlined/check_box.svg";
import { ReactComponent as CmsIcon } from "@material-design-icons/svg/outlined/web.svg";
import { ReactComponent as PageBuilderIcon } from "@material-design-icons/svg/outlined/table_chart.svg";
import { ReactComponent as InfoIcon } from "@material-design-icons/svg/outlined/info.svg";
import { ReactComponent as ChatIcon } from "@material-design-icons/svg/outlined/chat.svg";
import { ReactComponent as GithubIcon } from "@material-design-icons/svg/outlined/gite.svg";
import { ReactComponent as DocsIcon } from "@material-design-icons/svg/outlined/summarize.svg";
import { ReactComponent as ApiPlaygroundIcon } from "@material-design-icons/svg/outlined/swap_horiz.svg";
import { ReactComponent as MoreVertIcon } from "@material-design-icons/svg/outlined/more_vert.svg";
import { ReactComponent as FileManagerIcon } from "@material-design-icons/svg/outlined/insert_drive_file.svg";

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
        return (
            <SidebarProvider>
                <Component {...props} />
            </SidebarProvider>
        );
    };
};

export const NavigationImpl = () => {
    return function Navigation() {
        const { hash } = useLocation();

        return (
            <Sidebar
                title={"Webiny"}
                icon={
                    <Sidebar.Icon element={<img src={wbyLogo} alt={"Webiny"} />} label={"Webiny"} />
                }
                footer={
                    <DropdownMenu
                        trigger={
                            <Sidebar.Item
                                icon={<Sidebar.Item.Icon label="Settings" element={<InfoIcon />} />}
                                text={"Support"}
                                action={<Sidebar.Item.Action element={<MoreVertIcon />} />}
                            />
                        }
                        className={"wby-w-[225px]"}
                    >
                        <DropdownMenu.Item
                            content={"API Playground"}
                            icon={<ApiPlaygroundIcon />}
                        />
                        <DropdownMenu.Item content={"Documentation"} icon={<DocsIcon />} />
                        <DropdownMenu.Item content={"GitHub"} icon={<GithubIcon />} />
                        <DropdownMenu.Item content={"Slack"} icon={<ChatIcon />} />
                        <DropdownMenu.Separator />
                        <DropdownMenu.Item
                            content={
                                <div className={"flex wby-items-center"}>
                                    Webiny 5.43.0
                                    <Tag
                                        variant={"accent"}
                                        content={"WCP "}
                                        className={"wby-ml-sm-extra"}
                                    />
                                </div>
                            }
                        />
                    </DropdownMenu>
                }
            >
                <Sidebar.Link
                    text={"Audit Logs"}
                    to={"#audit-logs"}
                    active={hash === "#audit-logs"}
                    icon={<Sidebar.Item.Icon label="Audit Logs" element={<AuditLogsIcon />} />}
                />
                <Sidebar.Link
                    text={"Form Builder"}
                    to={"#form-builder"}
                    active={hash === "#form-builder"}
                    icon={<Sidebar.Item.Icon label="Form Builder" element={<FormBuilderIcon />} />}
                />
                <Sidebar.Item
                    text={"File Manager"}
                    onClick={() => {
                        alert("File Manager clicked");
                    }}
                    icon={<Sidebar.Item.Icon label="File Manager" element={<FileManagerIcon />} />}
                />
                <Sidebar.Link
                    text={"Headless CMS"}
                    to={"#cms"}
                    active={hash === "#cms"}
                    icon={<Sidebar.Item.Icon label="Headless CMS" element={<CmsIcon />} />}
                >
                    <Sidebar.Item text={"Content Models"} variant={"group-label"} />
                    <Sidebar.Link
                        text={"Groups"}
                        to={"#cms-groups"}
                        active={hash === "#cms-groups"}
                    />
                    <Sidebar.Link
                        text={"Models"}
                        to={"#cms-models"}
                        active={hash === "#cms-models"}
                    />
                </Sidebar.Link>
                <Sidebar.Link
                    text={"Page Builder"}
                    to={"#page-builder"}
                    active={hash === "#page-builder"}
                    icon={<Sidebar.Item.Icon label="Page Builder" element={<PageBuilderIcon />} />}
                >
                    <Sidebar.Item text={"Blocks"} variant={"group-label"} />
                    <Sidebar.Link
                        text={"Blocks"}
                        to={"#pb-blocks"}
                        active={hash === "#pb-blocks"}
                    />
                    <Sidebar.Link
                        text={"Categories"}
                        to={"#pb-blocks-categories"}
                        active={hash === "#pb-blocks-categories"}
                    />

                    <Sidebar.Link
                        to={"#pb-pages"}
                        text={"Pages"}
                        variant={"group-label"}
                        active={hash === `#pb-pages`}
                    />
                    <Sidebar.Link
                        to={"#pb-pages-categories"}
                        text={"Categories"}
                        active={hash === `#pb-pages-categories`}
                    />
                    <Sidebar.Link
                        to={"#pb-pages-menus"}
                        text={"Menus"}
                        active={hash === `#pb-pages-menus`}
                    />
                    <Sidebar.Link
                        to={"#pb-pages-pages"}
                        text={"Pages"}
                        active={hash === `#pb-pages-pages`}
                    />
                    <Sidebar.Link
                        to={"#pb-pages-templates"}
                        text={"Templates"}
                        disabled={true}
                        active={hash === `#pb-pages-templates`}
                    />
                </Sidebar.Link>
            </Sidebar>
        );
        // const { menuItems } = useAdminNavigation();
        // const { visible, setVisible } = useNavigation();
        //
        // const hideDrawer = useCallback(() => {
        //     setVisible(false);
        // }, []);
        //
        // const mainMenu = useMemo(
        //     () => menuItems.filter(m => !(m.tags || []).includes("footer")),
        //     [menuItems]
        // );
        //
        // const footerMenu = useMemo(
        //     () => menuItems.filter(m => (m.tags || []).includes("footer")),
        //     [menuItems]
        // );
        //
        // return (
        //     <AutoWidthDrawer modal open={visible} onClose={hideDrawer}>
        //         <DrawerHeader className={navHeader}>
        //             <MenuHeader>
        //                 <BrandSpec />
        //             </MenuHeader>
        //         </DrawerHeader>
        //         <DrawerContent className={navContent}>
        //             <MenuItems menuItems={mainMenu} />
        //         </DrawerContent>
        //         <MenuFooter>
        //             <List nonInteractive>
        //                 <MenuItems menuItems={footerMenu} />
        //             </List>
        //         </MenuFooter>
        //     </AutoWidthDrawer>
        // );
    };
};

const SortedMenuItems: HigherOrderComponent<MenuItemsProps> = MenuItems => {
    return function SortedMenuItems({ menuItems }) {
        return <MenuItems menuItems={menuItems} />;
    };
};

export const Navigation = () => {
    return (
        <Fragment>
            <Provider hoc={NavigationProvider} />
            <Compose component={NavigationSpec} with={NavigationImpl} />
            <Compose component={MenuItems} with={SortedMenuItems} />
            <Compose component={BrandSpec} with={BrandImpl} />
            <Compose
                component={MenuItemRenderer}
                with={[
                    MenuGroupRenderer,
                    MenuSectionItemRenderer,
                    MenuSectionRenderer,
                    MenuLinkRenderer,
                    MenuElementRenderer
                ]}
            />
        </Fragment>
    );
};
