import React, { useState, useCallback, type SyntheticEvent } from "react";
import { useSnackbar } from "@webiny/app-admin/hooks/useSnackbar.js";
import { Input } from "@webiny/ui/Input/index.js";
import { Tooltip } from "@webiny/ui/Tooltip/index.js";
import { BlockTitle, blockTitleWrapper, TitleInputWrapper, TitleWrapper } from "./Styled.js";
import { useEventActionHandler } from "~/editor/hooks/useEventActionHandler.js";
import { type BlockAtomType } from "~/blockEditor/state/index.js";
import { UpdateDocumentActionEvent } from "~/editor/recoil/actions/index.js";
import { useBlock } from "~/blockEditor/hooks/useBlock.js";

declare global {
    interface Window {
        Cypress: any;
    }
}

export const Title = () => {
    const handler = useEventActionHandler();
    const [block] = useBlock();
    const { showSnackbar } = useSnackbar();
    const [editTitle, setEdit] = useState<boolean>(false);
    const [stateTitle, setTitle] = useState<string | null>(null);
    const title = stateTitle === null ? block.name : stateTitle;

    const updateBlock = (data: Partial<BlockAtomType>) => {
        handler.trigger(
            new UpdateDocumentActionEvent({
                history: false,
                document: data,
                onFinish: () => {
                    showSnackbar(`Block title updated successfully!`);
                }
            })
        );
    };

    const enableEdit = useCallback(() => setEdit(true), []);

    const onBlur = useCallback(
        (e: SyntheticEvent<HTMLInputElement>) => {
            let title = e.currentTarget.value;

            if (title === "") {
                title = "Untitled";
                setTitle(title);
            }
            setEdit(false);
            updateBlock({ name: title });
        },
        [updateBlock]
    );

    const onKeyDown = useCallback(
        (e: SyntheticEvent<HTMLInputElement>) => {
            // @ts-expect-error
            switch (e.key) {
                case "Escape":
                    e.preventDefault();
                    setEdit(false);
                    setTitle(block.name || "");
                    break;
                case "Enter":
                    let title = e.currentTarget.value;
                    if (title === "") {
                        title = "Untitled";
                        setTitle(title);
                    }

                    updateBlock({ name: title });

                    e.preventDefault();
                    setEdit(false);

                    break;
                default:
                    return;
            }
        },
        [block.name]
    );

    // Disable autoFocus because for some reason, blur event would automatically be triggered when clicking
    // on the page title when doing Cypress testing. Not sure if this is RMWC or Cypress related issue.
    const autoFocus = !window.Cypress;

    return editTitle ? (
        <TitleInputWrapper data-testid="pb-editor-page-title">
            <Input
                autoFocus={autoFocus}
                fullwidth
                value={title}
                onChange={setTitle}
                onKeyDown={onKeyDown}
                onBlur={onBlur}
            />
        </TitleInputWrapper>
    ) : (
        <TitleWrapper>
            <div style={{ width: "100%", display: "flex" }}>
                <Tooltip
                    className={blockTitleWrapper}
                    placement={"bottom"}
                    content={<span>Rename</span>}
                >
                    <BlockTitle data-testid="pb-editor-page-title" onClick={enableEdit}>
                        {title}
                    </BlockTitle>
                </Tooltip>
            </div>
        </TitleWrapper>
    );
};
