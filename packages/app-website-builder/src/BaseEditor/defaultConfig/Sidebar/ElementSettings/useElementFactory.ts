import { useMemo } from "react";
import { useSelectFromEditor } from "~/BaseEditor/hooks/useSelectFromEditor";
import { ElementFactory } from "~/sdk/ElementFactory";

export const useElementFactory = () => {
    const components = useSelectFromEditor(state => {
        return state.components;
    });

    return useMemo(() => new ElementFactory(components), [components]);
};
