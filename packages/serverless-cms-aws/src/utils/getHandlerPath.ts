import path from "path";

export const getHandlerPath = (...suffix: string[]) => {
    return path.join(import.meta.dirname, "..", "handlers", ...suffix);
};
