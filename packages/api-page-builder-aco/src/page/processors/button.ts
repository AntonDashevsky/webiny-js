import get from "lodash/get.js";
import { PbAcoContext } from "~/types.js";

export const buttonProcessor = (context: PbAcoContext) => {
    context.pageBuilderAco.addPageSearchProcessor(({ element }) => {
        if (element.type !== "button") {
            return "";
        }
        return get(element, "data.buttonText");
    });
};
