import React, { useEffect, useCallback } from "react";
import { observer } from "mobx-react-lite";
import isEqual from "lodash/isEqual.js";
import { ReactComponent as CloseIcon } from "@material-design-icons/svg/outlined/close.svg";

import { Menu } from "@webiny/ui/Menu/index.js";
import { Tabs } from "@webiny/ui/Tabs/index.js";
import { Typography } from "@webiny/ui/Typography/index.js";
import { FormElementMessage } from "@webiny/ui/FormElementMessage/index.js";
import { type FormComponentProps } from "@webiny/ui/types.js";
import { CircularProgress } from "@webiny/ui/Progress/index.js";

import { type IconPickerPresenter } from "./IconPickerPresenter.js";
import { IconProvider, IconRenderer } from "./IconRenderer.js";
import {
    IconPickerWrapper,
    IconPickerLabel,
    IconPickerInput,
    MenuContent,
    MenuHeader,
    PlaceholderIcon,
    RemoveButton
} from "./IconPicker.styles.js";
import { IconPickerTabRenderer } from "./IconPickerTab.js";
import { IconPickerPresenterProvider } from "./IconPickerPresenterProvider.js";
import { IconTypeProvider } from "./config/IconType.js";
import { type Icon, type ICON_PICKER_SIZE } from "./types.js";

export interface IconPickerProps extends FormComponentProps<Icon | undefined> {
    label?: string;
    description?: string;
    size?: ICON_PICKER_SIZE;
    removable?: boolean;
}

export interface IconPickerComponentProps extends IconPickerProps {
    presenter: IconPickerPresenter;
}

export const IconPickerComponent = observer(
    ({ presenter, label, description, removable, ...props }: IconPickerComponentProps) => {
        const { value, onChange } = props;
        const { isValid: validationIsValid, message: validationMessage } = props.validation || {};
        const { activeTab, isMenuOpened, isLoading, iconTypes, selectedIcon, size } = presenter.vm;

        useEffect(() => {
            if (onChange && selectedIcon && !isEqual(selectedIcon, value)) {
                onChange(selectedIcon);
            }
        }, [JSON.stringify(selectedIcon)]);

        const setActiveTab = (index: number) => presenter.setActiveTab(index);

        const openMenu = () => presenter.openMenu();
        const closeMenu = () => presenter.closeMenu();

        const removeIcon = useCallback(() => {
            if (onChange) {
                presenter.setIcon(null);
                onChange(undefined);
            }
        }, [onChange]);

        return (
            <IconPickerPresenterProvider presenter={presenter}>
                <IconPickerWrapper>
                    {label && (
                        <IconPickerLabel>
                            <Typography use={"body1"}>{label}</Typography>
                        </IconPickerLabel>
                    )}

                    <Menu
                        open={isMenuOpened}
                        handle={
                            <IconPickerInput>
                                {selectedIcon ? (
                                    <IconProvider icon={selectedIcon}>
                                        <IconRenderer />
                                    </IconProvider>
                                ) : (
                                    <PlaceholderIcon width={32} height={32} />
                                )}
                            </IconPickerInput>
                        }
                        onClose={closeMenu}
                        onOpen={openMenu}
                        portalZIndex={20}
                    >
                        <MenuHeader>
                            <Typography use={"body1"}>Select an icon</Typography>
                            {value && removable && (
                                <RemoveButton onClick={removeIcon}>Remove</RemoveButton>
                            )}
                            <CloseIcon onClick={closeMenu} />
                        </MenuHeader>
                        <MenuContent size={size}>
                            {isLoading && <CircularProgress />}
                            <Tabs value={activeTab} onActivate={value => setActiveTab(value)}>
                                {iconTypes.map(iconType => (
                                    <IconTypeProvider key={iconType.name} type={iconType.name}>
                                        <IconPickerTabRenderer />
                                    </IconTypeProvider>
                                ))}
                            </Tabs>
                        </MenuContent>
                    </Menu>

                    {validationIsValid === false && (
                        <FormElementMessage error>{validationMessage}</FormElementMessage>
                    )}
                    {validationIsValid !== false && description && (
                        <FormElementMessage>{description}</FormElementMessage>
                    )}
                </IconPickerWrapper>
            </IconPickerPresenterProvider>
        );
    }
);
