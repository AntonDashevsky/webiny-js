import { FormData } from "../../types.js";

export default (formData: FormData): boolean => {
    return (
        formData?.settings?.reCaptcha?.enabled && formData?.settings?.reCaptcha?.settings?.enabled
    );
};
