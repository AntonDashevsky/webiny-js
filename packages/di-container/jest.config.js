import { fileURLToPath } from "url";

import base from "../../jest.config.base.js";

export default async () => {
    return base({
        path: import.meta.dirname,
        setupFilesAfterEnv: [fileURLToPath(import.meta.resolve("./__tests__/setupEnv.ts"))]
    });
};
