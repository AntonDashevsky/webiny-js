import ValidationError from "~/validationError.js";

export default (value: any) => {
    if (!value) {
        return;
    }

    try {
        JSON.parse(value);
    } catch (e) {
        throw new ValidationError("Value needs to be a valid JSON.");
    }
};
