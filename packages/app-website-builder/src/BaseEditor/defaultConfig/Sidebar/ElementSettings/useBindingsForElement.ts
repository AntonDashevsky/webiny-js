import { toJS } from "mobx";
import { BindingsProcessor } from "~/sdk/BindingsProcessor";
import { useBreakpoint } from "~/BaseEditor/hooks/useBreakpoint";
import { useSelectFromDocument } from "~/BaseEditor/hooks/useSelectFromDocument";

export const useBindingsForElement = (elementId?: string) => {
    const { breakpoint, breakpoints } = useBreakpoint();

    return useSelectFromDocument(
        document => {
            if (!elementId) {
                return {};
            }

            const bindings = toJS(document.bindings[elementId]) ?? {};

            // Merge element bindings.
            const bindingsProcessor = new BindingsProcessor(breakpoints.map(bp => bp.name));

            return bindingsProcessor.getBindings(bindings, breakpoint.name);
        },
        [elementId, breakpoint]
    );
};
