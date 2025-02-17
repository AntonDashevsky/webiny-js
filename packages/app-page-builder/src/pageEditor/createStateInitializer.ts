import omit from "lodash/omit.js";
import {
    pageAtom,
    PageAtomType,
    PageWithContent,
    revisionsAtom,
    RevisionsAtomType
} from "~/pageEditor/state/index.js";
import { EditorStateInitializerFactory } from "~/editor/Editor.js";
import { templateModeAtom } from "./hooks/useTemplateMode.js";

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
