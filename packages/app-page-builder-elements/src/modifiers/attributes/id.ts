import { ElementAttributesModifier } from "~/types.js";

const id: ElementAttributesModifier = ({ element }) => {
    return { id: element.data.settings?.property?.id || element.id };
};

export const createId = () => id;
