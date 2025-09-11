import React from "react";
import { cn, cva, type VariantProps } from "@webiny/admin-ui";
import type { Icon } from "~/components/IconPicker/index.js";
import { IconProvider, IconRenderer } from "~/components/IconPicker/IconRenderer.js";

const iconPickerCellVariants = cva(
    [
        "wby-flex wby-justify-center wby-items-center",
        "wby-rounded-md wby-cursor-pointer wby-size-xl wby-p-xs",
        "hover:wby-bg-neutral-dimmed wby-transition-all wby-duration-500 wby-ease-out"
    ],
    {
        variants: {
            isActive: {
                true: "wby-bg-neutral-dimmed"
            }
        }
    }
);

interface IconPickerCellProps extends VariantProps<typeof iconPickerCellVariants> {
    icon: Icon;
    onIconClick: (icon: Icon) => void;
}

const IconPickerCell = ({ isActive, icon, onIconClick }: IconPickerCellProps) => {
    return (
        <div className={cn(iconPickerCellVariants({ isActive }))} onClick={() => onIconClick(icon)}>
            <IconProvider icon={icon}>
                <IconRenderer />
            </IconProvider>
        </div>
    );
};

export { IconPickerCell, type IconPickerCellProps };
