import { ValueFilterPlugin } from "../definitions/ValueFilterPlugin";

const createValues = (initialValue: string | string[] | object): string[] => {
    if (typeof initialValue === "string") {
        return [initialValue];
    }

    if (Array.isArray(initialValue)) {
        return initialValue
            .flat()
            .map(v => v.toString())
            .filter(Boolean);
    }

    const result: string[] = [];

    const traverse = (node: any): void => {
        if (node == null) {
            return;
        }
        if (typeof node === "string" || typeof node === "number") {
            result.push(node.toString());
        } else if (Array.isArray(node)) {
            node.forEach(traverse);
        } else if (typeof node === "object") {
            Object.values(node).forEach(traverse);
        }
    };

    traverse(initialValue);

    return result.filter(Boolean);
};

const createCompareValues = (value: string) => {
    return value
        .replace(/\s+/g, " ")
        .trim()
        .replace(/\?/g, `\\?`)
        .replace(/\//g, `\\/`)
        .replace(/:/g, ``)
        .replace(/\-/g, `\\-`)
        .split(" ")
        .filter(val => {
            return val.length > 0;
        });
};

const plugin = new ValueFilterPlugin({
    operation: "contains",
    matches: ({ value: initialValue, compareValue: initialCompareValue }) => {
        if (!initialValue || (Array.isArray(initialValue) && initialValue.length === 0)) {
            return false;
        } else if (initialCompareValue === undefined || initialCompareValue === null) {
            return true;
        }
        const values = createValues(initialValue);
        const compareValues = createCompareValues(initialCompareValue);
        return values.some(target => {
            return compareValues.every(compareValue => {
                return target.match(new RegExp(compareValue, "gi")) !== null;
            });
        });
    }
});

plugin.name = "dynamodb.value.filter.contains";

export default plugin;
