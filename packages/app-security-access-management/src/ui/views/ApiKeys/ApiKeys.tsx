import * as React from "react";
import { SplitView, LeftPanel, RightPanel } from "@webiny/app-admin/components/SplitView/index.js";
import { ApiKeysDataList, type ApiKeysDataListProps } from "./ApiKeysDataList.js";
import { ApiKeyForm, type ApiKeyFormProps } from "./ApiKeyForm.js";

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
