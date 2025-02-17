import React, { useState } from "react";
import get from "lodash/get.js";
import { useRouter } from "@webiny/react-router";
import { useSnackbar } from "@webiny/app-admin/hooks/useSnackbar.js";
import { i18n } from "@webiny/app/i18n/index.js";
import { CircularProgress } from "@webiny/ui/Progress/index.js";
import {
    GET_CONTENT_MODEL,
    GetCmsModelQueryResponse,
    GetCmsModelQueryVariables
} from "~/admin/graphql/contentModels.js";
import { useQuery } from "../../hooks/index.js";
import { CmsModel } from "~/types.js";
import { ModelProvider } from "~/admin/components/ModelProvider/index.js";

const t = i18n.ns("app-headless-cms/admin/content-entries");

interface ContentEntriesContainerProps {
    children: React.ReactNode;
}

export const ContentEntriesContainer = ({ children }: ContentEntriesContainerProps) => {
    const { params } = useRouter();
    const modelId = params?.modelId;
    const [contentModel, setContentModel] = useState<CmsModel | null>(null);
    const { history } = useRouter();
    const { showSnackbar } = useSnackbar();

    const { loading, error } = useQuery<GetCmsModelQueryResponse, GetCmsModelQueryVariables>(
        GET_CONTENT_MODEL,
        {
            skip: !modelId,
            variables: {
                modelId: modelId as string
            },
            onCompleted: data => {
                const contentModel = get(data, "getContentModel.data", null);
                if (contentModel) {
                    return setContentModel(contentModel);
                }

                history.push("/cms/content-models");
                showSnackbar(
                    t`Could not load model "{modelId}". Redirecting...`({
                        modelId
                    })
                );
            }
        }
    );

    if (!contentModel || loading) {
        return <CircularProgress label={t`Loading content model...`} />;
    } else if (error) {
        showSnackbar(error.message);
        return null;
    }

    return <ModelProvider model={contentModel}>{children}</ModelProvider>;
};
