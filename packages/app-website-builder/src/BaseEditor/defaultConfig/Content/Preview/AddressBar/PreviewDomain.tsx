import React, { useCallback, useEffect, useState } from "react";
import { ReactComponent as GlobeIcon } from "@webiny/icons/language.svg";
import { Button, DropdownMenu, IconButton, Separator, Input, cn } from "@webiny/admin-ui";
import { usePreviewDomain } from "../usePreviewDomain";
import { Bind, Form, GenericFormData } from "@webiny/form";
import { validation } from "@webiny/validation";
import { useDocumentEditor } from "~/DocumentEditor";
import { Commands } from "~/BaseEditor";

export const PreviewDomain = () => {
    const editor = useDocumentEditor();
    const [isOpen, setIsOpen] = useState(false);

    const { previewDomain, isOverridden, unsetPreviewDomain, setPreviewDomain } =
        usePreviewDomain();

    const commitValue = useCallback((data: GenericFormData) => {
        const value = data.previewDomain;
        if (value.length > 0) {
            setPreviewDomain(value);
        } else {
            unsetPreviewDomain();
        }
        setIsOpen(false);
    }, []);

    const resetDomain = useCallback(() => {
        unsetPreviewDomain();
        setIsOpen(false);
    }, []);

    useEffect(() => {
        if (!previewDomain) {
            return;
        }

        editor.executeCommand(Commands.RefreshPreview);
    }, [previewDomain]);

    const classNames = cn(
        "wby-absolute wby-left-0 wby-top-0",
        isOverridden ? "wby-fill-accent-default" : "wby-fill-neutral-disabled"
    );

    return (
        <DropdownMenu
            open={isOpen}
            align="center"
            side="bottom"
            className={"wby-shadow-lg"}
            onOpenChange={setIsOpen}
            trigger={
                <IconButton
                    icon={<GlobeIcon />}
                    size="md"
                    onClick={() => {}}
                    variant={"ghost"}
                    className={classNames}
                />
            }
        >
            <div className={"wby-p-sm wby-text-sm"} style={{ width: 300 }}>
                <Form data={{ previewDomain }} onSubmit={commitValue}>
                    {form => (
                        <Bind name={"previewDomain"} validators={[validation.create("url")]}>
                            <Input
                                autoFocus={true}
                                label={"Preview Domain"}
                                description={"Set a custom preview domain for your user session."}
                                size={"md"}
                                onBlur={() => form.submit()}
                                onEnter={() => form.submit()}
                                note={`Hit "Enter" or click outside the menu to apply.`}
                            />
                        </Bind>
                    )}
                </Form>
                {isOverridden ? (
                    <>
                        <Separator variant={"dimmed"} margin={"lg"} />
                        <Button
                            variant={"primary"}
                            onClick={resetDomain}
                            text={"Reset Domain"}
                            size={"sm"}
                        />
                        <Separator variant={"dimmed"} margin={"lg"} />
                        Resetting will revert to using the default preview domain.
                    </>
                ) : null}
            </div>
        </DropdownMenu>
    );
};
