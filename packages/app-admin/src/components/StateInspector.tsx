import React from "react";
import Editor from "@monaco-editor/react";
import { Tabs } from "@webiny/admin-ui";
import { FloatingPanel } from "~/components/index.js";

const monacoTheme = "vs-light";
const monacoOptions = { minimap: { enabled: false } };

interface StateInspectorProps {
    title: string;
    shortcut: string;
    state: Record<string, any>;
}

export const StateInspector = (props: StateInspectorProps) => {
    return (
        <FloatingPanel shortcut={props.shortcut} dragHandle={".floating-panel"}>
            {({ height }) => (
                <Tabs
                    size="md"
                    spacing="sm"
                    separator={true}
                    tabs={[
                        <Tabs.Tab
                            key="panel"
                            value="panel"
                            trigger={props.title}
                            content={
                                <Editor
                                    theme={monacoTheme}
                                    height={height - 76}
                                    defaultLanguage={"json"}
                                    value={JSON.stringify(props.state, null, 2)}
                                    options={monacoOptions}
                                />
                            }
                        />
                    ]}
                />
            )}
        </FloatingPanel>
    );
};
