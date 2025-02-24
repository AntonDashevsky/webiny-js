import base from "../../jest.config.base.js";

export default async () => {
    return base({ path: import.meta.dirname });
};
