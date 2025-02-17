import { prerenderingHandlers } from "./prerenderingHandlers.js";
import hooks from "./hooks/index.js";

export default () => {
    return [prerenderingHandlers, ...hooks()];
};
