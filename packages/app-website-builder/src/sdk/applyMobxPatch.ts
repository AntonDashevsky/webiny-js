import { observable } from "mobx";
import { setObservablePath } from "./setObservablePath";
import { Operation } from "fast-json-patch";

export function applyMobxPatch<T extends object>(target: T, patches: Operation[]): void {
    for (const patch of patches) {
        const pathParts = patch.path.replace(/^\//, "").split("/");
        const key = pathParts.pop()!;
        const parent = getAtPath(target, pathParts);

        const fullPath = pathParts.concat(key).join(".");

        if (patch.op === "add" || patch.op === "replace") {
            let value = patch.value;

            // If adding a new top-level object, wrap it in observable
            if (patch.op === "add" && typeof value === "object" && value !== null) {
                value = observable.object(value, {}, { deep: true });
            }

            setObservablePath(target, fullPath, value);
        } else if (patch.op === "remove") {
            if (parent && typeof parent === "object") {
                if (Array.isArray(parent)) {
                    const index = parseInt(key, 10);
                    parent.splice(index, 1);
                } else {
                    delete parent[key];
                }
            }
        }
    }
}

function getAtPath(obj: any, pathParts: string[]): any {
    let current = obj;
    for (const part of pathParts) {
        if (!(part in current)) {
            return undefined;
        }
        current = current[part];
    }
    return current;
}
