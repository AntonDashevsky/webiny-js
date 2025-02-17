import createCruds from "./plugins/crud/index.js";
import graphql from "./plugins/graphql.js";
import triggerHandlers from "./plugins/triggers/index.js";
import validators from "./plugins/validators/index.js";
import formsGraphQL from "./plugins/graphql/form.js";
import formSettingsGraphQL from "./plugins/graphql/formSettings.js";
import formBuilderPrerenderingPlugins from "~/plugins/prerenderingHooks/index.js";
import { FormBuilderStorageOperations } from "~/types.js";

export interface CreateFormBuilderParams {
    storageOperations: FormBuilderStorageOperations;
}

export const createFormBuilder = (params: CreateFormBuilderParams) => {
    return [
        createCruds(params),
        graphql,
        triggerHandlers,
        validators,
        formsGraphQL,
        formSettingsGraphQL,
        formBuilderPrerenderingPlugins()
    ];
};
