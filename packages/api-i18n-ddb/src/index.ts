import { LocalesStorageOperationsProviderDdbPlugin } from "./operations/locales/index.js";
import { SystemStorageOperationsProviderDdbPlugin } from "./operations/system/index.js";

export * from "./plugins/index.js";

export const createI18NStorageOperations = () => {
    return [
        new LocalesStorageOperationsProviderDdbPlugin(),
        new SystemStorageOperationsProviderDdbPlugin()
    ];
};

export default () => {
    return createI18NStorageOperations();
};
