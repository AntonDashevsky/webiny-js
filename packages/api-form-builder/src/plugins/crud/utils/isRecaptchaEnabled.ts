import { FbForm, Settings } from "~/types.js";

export const isRecaptchaEnabled = (settings: Settings, form: FbForm) => {
    if (!settings.reCaptcha.enabled) {
        return false;
    }

    return form.settings.reCaptcha?.enabled === true;
};
