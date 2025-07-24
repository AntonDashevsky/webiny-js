function isObject(value: unknown): value is Record<string, unknown> {
    return value !== null && typeof value === "object" && !Array.isArray(value);
}

function mergeObjects(
    target: Record<string, unknown>,
    source: Record<string, unknown>
): Record<string, unknown> {
    const output: Record<string, unknown> = { ...target };

    for (const key in source) {
        const sourceValue = source[key];
        const targetValue = target[key];

        if (isObject(sourceValue) && isObject(targetValue)) {
            output[key] = mergeObjects(targetValue, sourceValue);
        } else {
            output[key] = sourceValue;
        }
    }

    return output;
}

export function deepMerge<T extends Record<string, unknown>>(target: T, source: Partial<T>): T {
    return mergeObjects(target, source as Record<string, unknown>) as T;
}
