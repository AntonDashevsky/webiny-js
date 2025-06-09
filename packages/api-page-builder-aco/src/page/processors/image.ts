import get from "lodash/get.js";
import { type PbAcoContext } from "~/types.js";

export const imageProcessor = (context: PbAcoContext) => {
    context.pageBuilderAco.addPageSearchProcessor(({ element }) => {
        if (element.type !== "image") {
            return "";
        }
        return get(element, "data.image.title");
    });
};
