import React from "react";
import { Accordion, Tabs, Icon } from "@webiny/admin-ui";
import { useSelectFromEditor } from "~/BaseEditor/hooks/useSelectFromEditor";
import type { ComponentGroup, ComponentGroupItem, ComponentManifest } from "~/sdk/types";
import { InlineSvg } from "~/BaseEditor/defaultConfig/Toolbar/InsertElements/InlineSvg";
import { ReactComponent as InsertIcon } from "@webiny/icons/add_circle_outline.svg";
import { Draggable } from "~/BaseEditor/components/Draggable";

export const InsertElements = () => {
    return (
        <Tabs.Tab
            value="insert"
            trigger={<Icon icon={<InsertIcon />} label={"Insert Element"} />}
            content={<ElementPalette />}
        />
    );
};

const defaultImage = "https://material-icons.github.io/material-icons/svg/extension/outline.svg";

const GroupComponent = ({ item }: { item: ComponentGroupItem }) => {
    const components = useSelectFromEditor<Record<string, ComponentManifest>>(state => {
        return state.components ?? {};
    });

    const component = components[item.name];

    if (!component) {
        return <></>;
    }

    return (
        <div className="wby-flex wby-flex-row wby-items-center wby-p-sm wby-bg-neutral-dimmed wby-rounded-md wby-shadow-sm wby-gap-sm">
            <Icon
                label="Icon"
                icon={<InlineSvg src={component.image ?? defaultImage} />}
                size={"lg"}
            />
            <div className="wby-mt-1 wby-text-sm wby-font-medium wby-text-neutral-strong wby-text-center">
                {component.label ?? component.name}
            </div>
        </div>
    );
};

type WithItems<T> = T & { items: ComponentManifest[] };

const getComponentFilter = (group: ComponentGroup): ((cmp: ComponentManifest) => boolean) => {
    if (group.name === "custom") {
        return cmp => !cmp.group;
    }

    if (group.filter) {
        return new Function(`return ${group.filter}`)();
    }

    return cmp => cmp.group === group.name;
};

const ElementPalette = () => {
    const groups = useSelectFromEditor<WithItems<ComponentGroup>[]>(state => {
        const groups = Object.values(state.componentGroups);
        const components = Object.values(state.components).filter(item => !item.hideFromToolbar);

        return groups.map(group => {
            const filter = getComponentFilter(group);

            return {
                ...group,
                items: components.filter(filter)
            };
        });
    });

    console.log("groups", groups);

    return (
        <Accordion>
            {groups.map(group => (
                <Accordion.Item key={group.name} title={group.label}>
                    <div className="wby-flex wby-flex-col wby-gap-sm wby-p-sm wby-justify-start">
                        {group.items.map(item => {
                            return (
                                <Draggable key={item.name} type="ELEMENT" item={item}>
                                    {({ dragRef }) => (
                                        <div ref={dragRef}>
                                            <GroupComponent item={item} />
                                        </div>
                                    )}
                                </Draggable>
                            );
                        })}
                    </div>
                </Accordion.Item>
            ))}
        </Accordion>
    );
};
