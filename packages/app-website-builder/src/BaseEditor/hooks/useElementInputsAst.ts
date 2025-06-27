import { useMemo } from "react";
import { useElementComponentManifest } from "~/BaseEditor/defaultConfig/Content/Preview/useElementComponentManifest";
import { ComponentManifestToAstConverter } from "~/sdk/ComponentManifestToAstConverter";

export const useElementInputsAst = (elementId?: string) => {
    const componentManifest = useElementComponentManifest(elementId ?? "");

    return useMemo(() => {
        if (componentManifest) {
            return ComponentManifestToAstConverter.convert(componentManifest.inputs ?? []);
        }
        return [];
    }, [componentManifest?.inputs]);
};
