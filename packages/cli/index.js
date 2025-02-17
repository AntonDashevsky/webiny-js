import "tsx";
import { getContext, createContext } from "./context.js";
export { regions } from "./regions.js";
export { PackageJson } from "./utils/PackageJson.js";

export const initializeProject = async () => {
    return await createContext();
};

export const getCli = () => {
    return getContext();
};
