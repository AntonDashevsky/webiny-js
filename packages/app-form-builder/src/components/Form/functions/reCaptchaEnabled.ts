import get from "lodash/get.js";
import { type FbFormModel } from "~/types.js";

export default (formData: FbFormModel): boolean => {
    return (
        get(formData, "settings.reCaptcha.enabled") &&
        get(formData, "settings.reCaptcha.settings.enabled")
    );
};
