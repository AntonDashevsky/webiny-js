import React from "react";
import { Icon, type IconProps } from "~/Icon";

interface SidebarIconProps extends Omit<IconProps, "icon"> {
    element?: React.ReactNode;
}

const SidebarIcon = ({ element, ...props }: SidebarIconProps) => {
    return <Icon icon={element} size={"lg"} color={"neutral-strong"} {...props} />;
};

/*const SidebarIcon = ({ element }: SidebarIconProps) => {
    return (
        <Avatar
            size={"sm"}
            image={<Avatar.Image src={element} alt="@webiny" />}
            fallback={<Avatar.Fallback delayMs={0}>W</Avatar.Fallback>}
        />
    );
};
*/

export { SidebarIcon, type SidebarIconProps };
