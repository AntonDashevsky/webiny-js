import omit from "lodash/omit";
import type { PageAtomType, PageWithContent, RevisionsAtomType } from "~/pageEditor/state";
import { pageAtom, revisionsAtom } from "~/pageEditor/state";
import type { EditorStateInitializerFactory } from "~/editor/Editor";
import { templateModeAtom } from "./hooks/useTemplateMode";

export const createStateInitializer = (
    page: PageWithContent,
    revisions: RevisionsAtomType
): EditorStateInitializerFactory => {
    return () => ({
        content: page.content,
        recoilInitializer({ set }) {
            /**
             * We always unset the content because we are not using it via the page atom.
             */
            const pageData: PageAtomType = omit(page, ["content"]);

            set(pageAtom, pageData);
            set(revisionsAtom, revisions);
            set(templateModeAtom, !!page?.content?.data?.template);
        }
    });
};
