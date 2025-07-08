import React, { useCallback } from "react";
import { Accordion } from "@webiny/admin-ui";
import { useActiveElement } from "~/BaseEditor/hooks/useActiveElement";
import { DocumentElement } from "~/sdk/types";
import { Background } from "./Groups/Background";
import { MarginPadding } from "./Groups/MarginPadding";
import { VisibilityGroup } from "./Groups/VisibilityGroup";
import { useElementComponentManifest } from "~/BaseEditor/defaultConfig/Content/Preview/useElementComponentManifest";
import { StyleSettings } from "~/constants";
import { Layout } from "./Groups/Layout";

export const StyleProperties = () => {
    const [element] = useActiveElement();
    if (!element) {
        return null;
    }

    return <ElementStyleProperties element={element} />;
};

const defaultHidden: string[] = [];

const ElementStyleProperties = ({ element }: { element: DocumentElement }) => {
    const componentManifest = useElementComponentManifest(element.id);
    const hideStyles = componentManifest?.hideStyleSettings ?? defaultHidden;

    const isHidden = useCallback(
        (name: string) => {
            return hideStyles.includes(name);
        },
        [hideStyles]
    );

    return (
        <Accordion>
            {isHidden(StyleSettings.Layout) ? null : <Layout elementId={element.id} />}
            {isHidden(StyleSettings.Visibility) ? null : <VisibilityGroup elementId={element.id} />}
            {isHidden(StyleSettings.Background) ? null : <Background elementId={element.id} />}
            {isHidden(StyleSettings.MarginPadding) ? null : (
                <MarginPadding elementId={element.id} />
            )}
        </Accordion>
    );
};
