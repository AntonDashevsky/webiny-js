import { isObservable, observable } from "mobx";

/**
 * Ensures the entire path exists as MobX observables and sets the value at the end.
 * It will never replace an existing object or observable, preserving reactivity.
 *
 * @param target The root observable object to mutate
 * @param path Dot-separated string path (e.g. "foo.bar.baz")
 * @param value The value to assign at the end of the path
 */
export function setObservablePath<T extends object>(target: T, path: string, value: any): void {
    const segments = path.split(".");
    let current: any = target;

    for (let i = 0; i < segments.length - 1; i++) {
        const key = segments[i];

        if (!(key in current)) {
            // Create observable object if it doesn't exist
            current[key] = observable.object({});
        } else if (
            typeof current[key] === "object" &&
            current[key] !== null &&
            !isObservable(current[key])
        ) {
            // Convert to observable in place — without replacing the reference
            const existing = current[key];
            const reactive = observable.object(existing);
            Object.assign(existing, reactive); // merge observable proxies onto the same object
        }

        current = current[key];
    }

    const finalKey = segments[segments.length - 1];

    // Directly assign the final value
    current[finalKey] = value;
}
