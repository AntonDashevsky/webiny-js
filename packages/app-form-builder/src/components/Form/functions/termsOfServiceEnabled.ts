import get from "lodash/get.js";
import { FbFormModel } from "~/types.js";

export default (formData: FbFormModel): boolean => {
    return get(formData, "settings.termsOfServiceMessage.enabled") || false;
};
