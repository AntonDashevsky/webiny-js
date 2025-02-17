import { resolve as importResolve } from "import-meta-resolve";

export const createResolve = from => {
    return module => {
        return importResolve(module, from).replace("file://", "");
    };
};
