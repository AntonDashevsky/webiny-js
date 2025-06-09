import { type FormData } from "../../types.js";

export default (formData: FormData): boolean => {
    return formData?.settings?.termsOfServiceMessage?.enabled || false;
};
