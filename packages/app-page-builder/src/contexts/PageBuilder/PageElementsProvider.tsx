import React, { useCallback, useMemo } from "react";
import { PageElementsProvider as PbPageElementsProvider } from "@webiny/app-page-builder-elements/contexts/PageElements.js";

// Attributes modifiers.
import { createId } from "@webiny/app-page-builder-elements/modifiers/attributes/id.js";
import { createClassName } from "@webiny/app-page-builder-elements/modifiers/attributes/className.js";
import { createAnimation } from "@webiny/app-page-builder-elements/modifiers/attributes/animation/index.js";
import { initializeAos } from "@webiny/app-page-builder-elements/modifiers/attributes/animation/initializeAos.js";

// Styles modifiers.
import { createBackground } from "@webiny/app-page-builder-elements/modifiers/styles/background.js";
import { createBorder } from "@webiny/app-page-builder-elements/modifiers/styles/border.js";
import { createGrid } from "@webiny/app-page-builder-elements/modifiers/styles/grid.js";
import { createHeight } from "@webiny/app-page-builder-elements/modifiers/styles/height.js";
import { createHorizontalAlign } from "@webiny/app-page-builder-elements/modifiers/styles/horizontalAlign.js";
import { createMargin } from "@webiny/app-page-builder-elements/modifiers/styles/margin.js";
import { createPadding } from "@webiny/app-page-builder-elements/modifiers/styles/padding.js";
import { createShadow } from "@webiny/app-page-builder-elements/modifiers/styles/shadow.js";
import { createText } from "@webiny/app-page-builder-elements/modifiers/styles/text.js";
import { createTextAlign } from "@webiny/app-page-builder-elements/modifiers/styles/textAlign.js";
import { createVerticalAlign } from "@webiny/app-page-builder-elements/modifiers/styles/verticalAlign.js";
import { createVisibility } from "@webiny/app-page-builder-elements/modifiers/styles/visibility.js";
import { createWidth } from "@webiny/app-page-builder-elements/modifiers/styles/width.js";

import { usePageBuilder } from "~/hooks/usePageBuilder.js";
import { type Theme } from "@webiny/app-theme/types.js";

import { plugins } from "@webiny/plugins";
import { type PbRenderElementPlugin } from "~/types.js";
import { type ILoaderCache } from "@webiny/app-page-builder-elements/hooks/useLoader/ILoaderCache.js";

interface PageElementsProviderProps {
    theme?: Theme;
    loaderCache: ILoaderCache;
    children: React.ReactNode;
}

export const PageElementsProvider = ({
    theme,
    loaderCache,
    children
}: PageElementsProviderProps) => {
    const pageBuilder = usePageBuilder();

    const getRenderers = useCallback(() => {
        return plugins
            .byType<PbRenderElementPlugin>("pb-render-page-element")
            .reduce((current, item) => {
                return { ...current, [item.elementType]: item.render };
            }, {});
    }, []);

    const modifiers = useMemo(
        () => ({
            attributes: {
                id: createId(),
                className: createClassName(),
                animation: createAnimation({ initializeAos })
            },
            styles: {
                background: createBackground(),
                border: createBorder(),
                grid: createGrid(),
                height: createHeight(),
                horizontalAlign: createHorizontalAlign(),
                margin: createMargin(),
                text: createText(),
                textAlign: createTextAlign(),
                padding: createPadding(),
                shadow: createShadow(),
                verticalAlign: createVerticalAlign(),
                visibility: createVisibility(),
                width: createWidth()
            }
        }),
        []
    );

    return (
        <PbPageElementsProvider
            // We can assign `Theme` here because we know at this point we're using the new elements rendering engine.
            theme={theme ?? (pageBuilder.theme as Theme)}
            renderers={getRenderers}
            modifiers={modifiers}
            loaderCache={loaderCache}
        >
            {children}
        </PbPageElementsProvider>
    );
};
