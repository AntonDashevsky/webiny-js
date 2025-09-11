import React from "react";
import { useEditorConfig } from "~/BaseEditor/config/EditorConfig";
import type { ElementInputRendererProps } from "~/BaseEditor/config/ElementInput";

const NullRenderer = ({ name }: { name: string }) => {
    return <div>Missing renderer &quot;{name}&quot;.</div>;
};

export const useInputRenderer = (name: string): React.ComponentType<ElementInputRendererProps> => {
    const config = useEditorConfig();

    const renderer = config.inputRenderers.find(renderer => renderer.name === name);

    return renderer ? renderer.component : () => <NullRenderer name={name} />;
};
