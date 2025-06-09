import React from "react";

import { AdvancedSearch as AdvancedSearchComponent, type AdvancedSearchProps } from "./AdvancedSearch.js";
import { AdvancedSearchConfigs } from "./AdvancedSearchConfigs.js";
import { AcoWithConfig } from "~/config/index.js";

export * from "./GraphQLInputMapper.js";
export * from "./gateways/index.js";
export * from "./useFilterRepository.js";
export * from "./useInputField.js";

export const AdvancedSearch = (props: AdvancedSearchProps) => {
    return (
        <>
            <AcoWithConfig>
                <AdvancedSearchComponent {...props} />
            </AcoWithConfig>
            <AdvancedSearchConfigs />
        </>
    );
};
