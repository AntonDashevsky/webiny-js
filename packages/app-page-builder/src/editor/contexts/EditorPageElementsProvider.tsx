import React, { useMemo } from "react";
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

// Additional editor styles modifiers.
import { createAnimationZIndexFix } from "./EditorPageElementsProvider/modifiers/styles/animationZIndexFix.js";

// Other.
import { usePageBuilder } from "~/hooks/usePageBuilder.js";
import { type Theme } from "@webiny/app-theme/types.js";
import { plugins } from "@webiny/plugins";
import { type PbEditorPageElementPlugin } from "~/types.js";
import { ElementControls } from "./EditorPageElementsProvider/ElementControls.js";
import { mediaToContainer } from "./EditorPageElementsProvider/mediaToContainer.js";
import { NullLoaderCache } from "@webiny/app-page-builder-elements/hooks/useLoader/NullLoaderCache.js";

interface EditorPageElementsProviderProps {
    children: React.ReactNode;
}

export const EditorPageElementsProvider = ({ children }: EditorPageElementsProviderProps) => {
    const pageBuilder = usePageBuilder();

    const renderers = plugins
        .byType<PbEditorPageElementPlugin>("pb-editor-page-element")
        .reduce((current, item) => {
            return { ...current, [item.elementType]: item.render };
        }, {});

    const modifiers = {
        attributes: {
            id: createId(),
            className: createClassName(),
            animation: createAnimation({ initializeAos })
        },
        styles: {
            animationZIndexFix: createAnimationZIndexFix(),
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
    };

    // We override all `@media` usages in breakpoints with `@container page-editor-canvas`. This is what
    // enables us responsive design inside the Page Builder's page editor.
    const containerizedTheme = useMemo(() => {
        const theme = pageBuilder.theme as Theme;

        // On a couple of occasions, we've seen the `theme` object being `null` for a brief moment. This
        // would happen when the theme is being loaded via a dynamic import, e.g. in a multi-theme setup.
        if (!theme) {
            return null;
        }

        return {
            ...pageBuilder.theme,
            breakpoints: {
                ...theme.breakpoints,
                ...Object.keys(theme.breakpoints).reduce((result, breakpointName) => {
                    const breakpoint = theme.breakpoints[breakpointName];
                    return {
                        ...result,
                        [breakpointName]: mediaToContainer(breakpoint)
                    };
                }, {})
            }
        } as Theme;
    }, [pageBuilder.theme]);

    const nullLoaderCache = useMemo(() => {
        return new NullLoaderCache();
    }, []);

    return (
        <PbPageElementsProvider
            theme={containerizedTheme!}
            renderers={renderers}
            modifiers={modifiers}
            loaderCache={nullLoaderCache}
            beforeRenderer={ElementControls}
        >
            {children}
        </PbPageElementsProvider>
    );
};
