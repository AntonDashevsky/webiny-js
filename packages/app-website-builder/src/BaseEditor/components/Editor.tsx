import React, { useEffect, useState } from "react";
import classSet from "classnames";
import type { WebsiteBuilderTheme } from "@webiny/website-builder-sdk";
import DragPreview from "./DragPreview";
import { EditorConfig, EditorWithConfig } from "../config";
import { useDocumentEditor } from "~/DocumentEditor";
import { Commands } from "~/BaseEditor";
import { ThemeProvider } from "~/BaseEditor/components/ThemeProvider";

export const Editor = () => {
    const editor = useDocumentEditor();
    const [theme, setTheme] = useState<WebsiteBuilderTheme | undefined>(undefined);

    useEffect(() => {
        editor.registerCommandHandler(Commands.SetTheme, ({ theme }) => {
            setTheme(theme);
        });
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <div className={classSet("wby-w-full")}>
                <EditorWithConfig>
                    <EditorConfig.Ui.Layout />
                </EditorWithConfig>
                <DragPreview />
            </div>
        </ThemeProvider>
    );
};
