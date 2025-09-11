import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { cn, PopoverPrimitive } from "@webiny/admin-ui";
import { useIcon } from "..";
import { IconPickerTab } from "../IconPickerTab";
import { IconProvider } from "../IconRenderer";
import { useIconPicker } from "../IconPickerPresenterProvider";
import { IconPickerConfig } from "../config";
import type { Icon } from "../types";

const SKIN_TONES = ["", "\u{1f3fb}", "\u{1f3fc}", "\u{1f3fd}", "\u{1f3fe}", "\u{1f3ff}"];

const SkinToneSelectWrapper = (props: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div
            className={cn(
                "wby-size-xl wby-rounded-sm wby-pointer wby-border-solid wby-border-sm wby-border-neutral-muted wby-flex wby-justify-center wby-items-center wby-text-center"
            )}
        >
            {props.children}
        </div>
    );
};

/**
 * NOTE: Avoid using `@emotion/styled` in icon renderer components across all plugins.
 * This is crucial for serializing component rendering into a string value as plain HTML,
 * which is necessary for usage in the website application. Please use inline styles here
 * to ensure proper serialization.
 */

interface Emoji extends Icon {
    skinTone: string;
    skinToneSupport: boolean;
}

const Emoji = () => {
    const { icon, size } = useIcon<Emoji>();

    return (
        <div
            style={{
                display: "inline-block",
                width: `${size}px`,
                height: `${size}px`,
                fontSize: `${(size * 4) / 5}px`,
                lineHeight: `${size}px`,
                color: "black"
            }}
        >
            {icon.skinTone ? icon.value + icon.skinTone : icon.value}
        </div>
    );
};

interface SkinToneSelectProps {
    icon: Icon | null;
    hasSkinToneSupport: boolean;
    onChange: (skinTone: string) => void;
}

const SkinToneSelect = ({ icon, hasSkinToneSupport, onChange }: SkinToneSelectProps) => {
    const [open, setOpen] = useState(false);

    if (!icon || !isEmoji(icon)) {
        return <SkinToneSelectWrapper />;
    }

    if (!hasSkinToneSupport) {
        return (
            <SkinToneSelectWrapper>
                <IconProvider icon={icon} size={24}>
                    <Emoji />
                </IconProvider>
            </SkinToneSelectWrapper>
        );
    }

    return (
        <PopoverPrimitive open={open} onOpenChange={open => setOpen(open)}>
            <PopoverPrimitive.Trigger className={"wby-outline-none"}>
                <SkinToneSelectWrapper>
                    <IconProvider icon={icon} size={24}>
                        <Emoji />
                    </IconProvider>
                </SkinToneSelectWrapper>
            </PopoverPrimitive.Trigger>
            <PopoverPrimitive.Content>
                <div className={"wby-bg-neutral-base wby-grid wby-gap-xs wby-p-xs wby-text-center"}>
                    {SKIN_TONES.map((skinTone, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                onChange(skinTone);
                            }}
                            className={"wby-cursor-pointer"}
                        >
                            <IconProvider icon={{ ...icon, skinTone }} size={24}>
                                <Emoji />
                            </IconProvider>
                        </div>
                    ))}
                </div>
            </PopoverPrimitive.Content>
        </PopoverPrimitive>
    );
};

/**
 * @see https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
 */
const isEmoji = (icon: Icon | null): icon is Emoji => {
    if (!icon) {
        return false;
    }
    return icon.type === "emoji";
};

const EmojiTab = observer(() => {
    const presenter = useIconPicker();
    const { selectedIcon } = presenter.vm;

    const onSkinToneChange = (skinTone: string) => {
        if (isEmoji(selectedIcon)) {
            presenter.setIcon({ ...selectedIcon, skinTone });
        }
    };

    const onIconSelect = (icon: Icon) => {
        presenter.setIcon(icon);
        presenter.closeMenu();
    };

    const hasSkinToneSupport = isEmoji(selectedIcon) ? selectedIcon.skinToneSupport : false;

    return (
        <IconPickerTab
            value={"emoji"}
            label={"Emojis"}
            onChange={onIconSelect}
            actions={
                <SkinToneSelect
                    icon={selectedIcon}
                    hasSkinToneSupport={hasSkinToneSupport}
                    onChange={onSkinToneChange}
                />
            }
        />
    );
});

export const EmojiPlugin = () => {
    return (
        <IconPickerConfig>
            <IconPickerConfig.IconType name={"emoji"}>
                <IconPickerConfig.IconType.Icon element={<Emoji />} />
                <IconPickerConfig.IconType.Tab element={<EmojiTab />} />
            </IconPickerConfig.IconType>
        </IconPickerConfig>
    );
};
