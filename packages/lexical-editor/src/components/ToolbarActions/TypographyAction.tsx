import React, { useCallback, useEffect, useState } from "react";
import { LexicalCommand } from "lexical";
import { Compose, makeDecoratable } from "@webiny/react-composition";
import { TypographyValue } from "@webiny/lexical-theme";
import { ActiveTypography, TypographyActionContext } from "~/context/TypographyActionContext";
import { $isHeadingNode, $isListNode, $isParagraphNode, $isQuoteNode } from "@webiny/lexical-nodes";
import { useRichTextEditor } from "~/hooks/useRichTextEditor";
import {
    INSERT_ORDERED_LIST_COMMAND,
    INSERT_UNORDERED_LIST_COMMAND,
    INSERT_QUOTE_COMMAND,
    ListCommandPayload,
    QuoteCommandPayload,
    ADD_TYPOGRAPHY_COMMAND,
    TypographyPayload
} from "~/commands";
import { useCurrentElement } from "~/hooks/useCurrentElement";

// Unfortunately, for some time in v5 we had `quoteblock` in our theme, so let's not break it.
const quoteTagNames = ["blockquote", "quoteblock"];

/*
 * Base composable action component that is mounted on toolbar action as a placeholder for the custom toolbar action.
 * Note: Toa add custom component access trough @see LexicalEditorConfig API
 * */
export const BaseTypographyActionDropDown = makeDecoratable(
    "BaseTypographyActionDropDown",
    (): JSX.Element | null => {
        useEffect(() => {
            console.log("Default BaseTypographyActionDropDown, please add your own component");
        }, []);
        return null;
    }
);

interface TypographyActionDropdownProps {
    element: JSX.Element;
}

const TypographyActionDropDown = ({ element }: TypographyActionDropdownProps): JSX.Element => {
    return <Compose component={BaseTypographyActionDropDown} with={() => () => element} />;
};

export type TypographyAction = React.ComponentType<unknown> & {
    TypographyDropDown: typeof TypographyActionDropDown;
};

export const TypographyAction: TypographyAction = () => {
    const [typography, setTypography] = useState<ActiveTypography>();
    const { editor, themeEmotionMap } = useRichTextEditor();
    const { element } = useCurrentElement();
    const isParagraphSelected = $isParagraphNode(element);
    const isHeadingSelected = $isHeadingNode(element);
    const isQuoteSelected = $isQuoteNode(element);

    const onTypographySelect = useCallback((value: TypographyValue) => {
        setTypography(value);

        if (value.tag.includes("h") || value.tag.includes("p")) {
            editor.dispatchCommand<LexicalCommand<TypographyPayload>>(ADD_TYPOGRAPHY_COMMAND, {
                value
            });
        }

        if (value.tag === "ol") {
            editor.dispatchCommand<LexicalCommand<ListCommandPayload>>(
                INSERT_ORDERED_LIST_COMMAND,
                {
                    themeStyleId: value.id
                }
            );
        }

        if (value.tag === "ul") {
            editor.dispatchCommand<LexicalCommand<ListCommandPayload>>(
                INSERT_UNORDERED_LIST_COMMAND,
                {
                    themeStyleId: value.id
                }
            );
        }

        if (quoteTagNames.includes(value.tag)) {
            editor.dispatchCommand<LexicalCommand<QuoteCommandPayload>>(INSERT_QUOTE_COMMAND, {
                themeStyleId: value.id
            });
        }
    }, []);

    useEffect(() => {
        if (!element || !themeEmotionMap) {
            return;
        }

        if (isParagraphSelected || isHeadingSelected || isQuoteSelected) {
            const styleId = element.getStyleId();
            if (!styleId) {
                return;
            }

            const style = themeEmotionMap[styleId];
            if (style) {
                setTypography({
                    id: style.id,
                    name: style.name
                });
            }
            return;
        }

        // list and quote element
        if (themeEmotionMap && $isListNode(element)) {
            const styleId = element.getStyleId();
            if (!styleId) {
                return;
            }

            const style = themeEmotionMap[styleId];
            if (style) {
                setTypography({
                    id: style.id,
                    name: style.name
                });
            }
        }
    }, [element, isQuoteSelected, isParagraphSelected, isHeadingSelected]);

    return (
        <TypographyActionContext.Provider
            value={{
                value: typography,
                applyTypography: onTypographySelect
            }}
        >
            <BaseTypographyActionDropDown />
        </TypographyActionContext.Provider>
    );
};

TypographyAction.TypographyDropDown = TypographyActionDropDown;
