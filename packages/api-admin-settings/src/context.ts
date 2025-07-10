import { ContextPlugin } from "@webiny/handler";

export const createContext = () => {
    return new ContextPlugin(async context => {});
};
