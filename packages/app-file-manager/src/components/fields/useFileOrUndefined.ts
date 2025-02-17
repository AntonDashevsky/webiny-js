import { useFile } from "~/hooks/useFile.js";

export function useFileOrUndefined() {
    try {
        return useFile();
    } catch (err) {
        return { file: undefined };
    }
}
