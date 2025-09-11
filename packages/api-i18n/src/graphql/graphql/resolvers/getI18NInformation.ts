import type { GraphQLFieldResolver } from "@webiny/handler-graphql/types";
import type { I18NContext } from "~/types";

const resolver: GraphQLFieldResolver<any, any, I18NContext> = (_, __, context) => {
    const { i18n } = context;
    return {
        currentLocales: i18n.getCurrentLocales(),
        defaultLocale: i18n.getDefaultLocale(),
        locales: i18n.getLocales()
    };
};

export default resolver;
