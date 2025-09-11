import { fileURLToPath } from "url";
import { createTestConfig } from "../../testing";

export default async () => {
    return createTestConfig({
        path: import.meta.dirname,
        vitestConfig: {
            setupFiles: [fileURLToPath(import.meta.resolve("./__tests__/setupEnv.ts"))]
        }
    });
};
