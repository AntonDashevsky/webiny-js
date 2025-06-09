import React, { Fragment } from "react";
import { i18n } from "@webiny/app/i18n/index.js";
import { Checkbox, CheckboxGroup } from "@webiny/ui/Checkbox/index.js";
import { Cell } from "@webiny/ui/Grid/index.js";
import { type BindComponent } from "@webiny/form";
import { FormElementMessage } from "@webiny/ui/FormElementMessage/index.js";
import {
    type GetValueCallable,
    type OnChangeCallable,
    type PermissionSelectorCmsGroup,
    type PermissionSelectorCmsModel
} from "./types.js";

const t = i18n.ns("app-headless-cms/admin/plugins/permissionRenderer");

interface RenderItemsProps {
    onChange: OnChangeCallable;
    getValue: GetValueCallable;
    items: PermissionSelectorCmsModel[] | PermissionSelectorCmsGroup[];
    disabled?: boolean;
}

export interface PermissionSelectorProps {
    Bind: BindComponent;
    selectorKey: string;
    locales: string[];
    entity: string;
    getItems: (code: string) => PermissionSelectorCmsModel[] | PermissionSelectorCmsGroup[];
    RenderItems?: React.ComponentType<RenderItemsProps>;
    disabled?: boolean;
}

const DefaultRenderItems = ({ items, getValue, onChange, disabled }: RenderItemsProps) => {
    return (
        <React.Fragment>
            {items.map(({ id, label }) => (
                <div key={id}>
                    <Checkbox
                        key={id}
                        label={label}
                        value={getValue(id)}
                        onChange={onChange(id)}
                        disabled={disabled}
                    />
                </div>
            ))}
        </React.Fragment>
    );
};

export const PermissionSelector = ({
    Bind,
    entity,
    locales,
    selectorKey,
    getItems,
    RenderItems = DefaultRenderItems,
    disabled
}: PermissionSelectorProps) => {
    const description = t`Select the {selectorKey} user will be allowed to access.`({
        selectorKey
    });

    return (
        <Fragment>
            {locales.map(code => {
                const items = getItems(code);

                /**
                 * Lets have two different outputs, depending on if there are any items.
                 * Checkbox group is not showing when no items.
                 */
                if (items.length === 0) {
                    return (
                        <Bind key={code} name={`${entity}Props.${selectorKey}.${code}`}>
                            <></>
                        </Bind>
                    );
                }
                return (
                    <Bind key={code} name={`${entity}Props.${selectorKey}.${code}`}>
                        <CheckboxGroup label={code}>
                            {({ onChange, getValue }) => {
                                return (
                                    <RenderItems
                                        disabled={disabled}
                                        items={items}
                                        onChange={onChange}
                                        getValue={getValue}
                                    />
                                );
                            }}
                        </CheckboxGroup>
                    </Bind>
                );
            })}
            <FormElementMessage>{description}</FormElementMessage>
        </Fragment>
    );
};

interface PermissionSelectorWrapperProps {
    children: React.ReactNode;
}

export const PermissionSelectorWrapper = ({ children }: PermissionSelectorWrapperProps) => (
    <Fragment>
        <Cell span={1} />
        <Cell span={11}>{children}</Cell>
    </Fragment>
);
