import omit from "lodash/omit.js";
import { templateAtom } from "~/templateEditor/state/index.js";
import { EditorStateInitializerFactory } from "~/editor/Editor.js";
import { PbPageTemplate, PbPageTemplateWithContent } from "~/types.js";

export const createStateInitializer = (
    template: PbPageTemplateWithContent
): EditorStateInitializerFactory => {
    return () => ({
        content: template.content,
        recoilInitializer({ set }) {
            /**
             * We always unset the content because we are not using it via the template atom.
             */
            const templateData: PbPageTemplate = omit(template, ["content"]);

            set(templateAtom, templateData);
        }
    });
};
