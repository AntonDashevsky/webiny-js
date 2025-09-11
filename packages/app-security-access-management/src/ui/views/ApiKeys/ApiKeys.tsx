import * as React from "react";
import { SplitView, LeftPanel, RightPanel } from "@webiny/app-admin/components/SplitView/index.js";
import type { ApiKeysDataListProps } from "./ApiKeysDataList.js";
import { ApiKeysDataList } from "./ApiKeysDataList.js";
import type { ApiKeyFormProps } from "./ApiKeyForm.js";
import { ApiKeyForm } from "./ApiKeyForm.js";

export interface ApiKeysProps {
    listProps?: ApiKeysDataListProps;
    formProps?: ApiKeyFormProps;
}
export const ApiKeys = ({ formProps = {}, listProps = {} }: ApiKeysProps) => {
    return (
        <SplitView>
            <LeftPanel>
                <ApiKeysDataList {...listProps} />
            </LeftPanel>
            <RightPanel>
                <ApiKeyForm {...formProps} />
            </RightPanel>
        </SplitView>
    );
};
