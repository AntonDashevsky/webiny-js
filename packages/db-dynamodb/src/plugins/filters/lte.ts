import { ValueFilterPlugin } from "../definitions/ValueFilterPlugin.js";

const plugin = new ValueFilterPlugin({
    operation: "lte",
    matches: ({ value, compareValue }) => {
        return value <= compareValue;
    }
});

plugin.name = "dynamodb.value.filter.lte";

export default plugin;
