import * as React from "react";
import { SplitView, LeftPanel, RightPanel } from "@webiny/app-admin/components/SplitView";
import type { ApiKeysDataListProps } from "./ApiKeysDataList";
import { ApiKeysDataList } from "./ApiKeysDataList";
import type { ApiKeyFormProps } from "./ApiKeyForm";
import { ApiKeyForm } from "./ApiKeyForm";

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
