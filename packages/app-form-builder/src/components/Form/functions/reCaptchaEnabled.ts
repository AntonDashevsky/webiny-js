import get from "lodash/get";
import type { FbFormModel } from "~/types";

export default (formData: FbFormModel): boolean => {
    return (
        get(formData, "settings.reCaptcha.enabled") &&
        get(formData, "settings.reCaptcha.settings.enabled")
    );
};
