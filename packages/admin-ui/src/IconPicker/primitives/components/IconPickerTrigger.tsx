import React, { useMemo } from "react";
import { ReactComponent as ChevronDown } from "@webiny/icons/keyboard_arrow_down.svg";
import { Icon as IconComponent } from "~/Icon";
import { cn, cva, type VariantProps } from "~/utils";
import { IconPickerIcon as IconPickerIconComponent } from "./IconPickerIcon";
import { IconPickerIcon, IconPickerIconFormatter } from "../../domains";

const iconPickerTriggerVariants = cva("wby-flex wby-items-center", {
    variants: {
        size: {
            md: "wby-gap-xs",
            lg: "wby-gap-xs",
            xl: "wby-gap-sm"
        }
    },
    defaultVariants: {
        size: "md"
    }
});

interface IconPickerTriggerProps extends VariantProps<typeof iconPickerTriggerVariants> {
    value?: string;
}

const IconPickerTrigger = ({ value, size }: IconPickerTriggerProps) => {
    const icon = useMemo(() => {
        const icon = IconPickerIcon.createFromString(value);
        return IconPickerIconFormatter.formatFontAwesome(icon);
    }, [value]);

    return (
        <div className={cn(iconPickerTriggerVariants({ size }))}>
            <div>
                <IconComponent
                    size={size === "xl" ? "lg" : "md"}
                    icon={<IconPickerIconComponent prefix={icon.prefix} name={icon.name} />}
                    label={`Selected icon`}
                />
            </div>
            <div>
                <IconComponent size={"sm"} icon={<ChevronDown />} label={"Open list"} />
            </div>
        </div>
    );
};

export { IconPickerTrigger, type IconPickerTriggerProps };
