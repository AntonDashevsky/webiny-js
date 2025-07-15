import React from "react";
import { ReactComponent as AddIcon } from "@webiny/icons/add.svg";
import { ReactComponent as DeleteIcon } from "@webiny/icons/delete.svg";
import { Bind, useBind } from "@webiny/form";
import {
    Button,
    DynamicFieldset,
    FormComponentDescription,
    FormComponentLabel,
    IconButton,
    Input
} from "@webiny/admin-ui";

const Header = () => {
    return (
        <>
            <FormComponentLabel text={"Meta Tags"} />
            <FormComponentDescription text={"Add custom SEO meta tags"} />
        </>
    );
};

interface FooterProps {
    addAlias: () => void;
}

const Footer = ({ addAlias }: FooterProps) => {
    return (
        <div className={"wby-mt-md"}>
            <Button
                onClick={addAlias}
                text="Add tag"
                variant={"secondary"}
                size={"sm"}
                icon={<AddIcon />}
            />
        </div>
    );
};

const bindingPath = "properties.seo.metaTags";

export interface MetaTagsProps {
    bindName: string;
    keyName: string;
    keyLabel: string;
    valueName: string;
    valueLabel: string;
}

export const MetaTags = (props: MetaTagsProps) => {
    const { value, onChange } = useBind({ name: props.bindName });

    return (
        <div className={"wby-my-lg"}>
            <DynamicFieldset value={value || [""]} onChange={onChange}>
                {({ actions, header, footer, row, empty }) => (
                    <>
                        {row(({ index }) => (
                            <div className={"wby-mt-md"}>
                                <div className={"wby-flex wby-items-start wby-gap-sm"}>
                                    <Bind name={`${bindingPath}.${index}.${props.keyName}`}>
                                        <Input placeholder={props.keyLabel} size={"lg"} />
                                    </Bind>
                                    <Bind name={`${bindingPath}.${index}.${props.valueName}`}>
                                        <Input placeholder={props.valueLabel} size={"lg"} />
                                    </Bind>
                                    <IconButton
                                        variant={"ghost"}
                                        size={"lg"}
                                        icon={<DeleteIcon />}
                                        onClick={actions.remove(index)}
                                    />
                                </div>
                            </div>
                        ))}
                        {footer(() => (
                            <Footer addAlias={actions.add()} />
                        ))}
                        {header(() => (
                            <Header />
                        ))}
                        {empty(() => (
                            <>
                                <Header />
                                <Footer addAlias={actions.add()} />
                            </>
                        ))}
                    </>
                )}
            </DynamicFieldset>
        </div>
    );
};
