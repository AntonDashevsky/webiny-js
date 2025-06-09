import React from "react";
import { type FilesRenderChildren } from "react-butterfiles";

import { useFileManagerApi } from "~/index.js";
import { NoPermission } from "~/components/NoPermission/index.js";
import { NoResults } from "~/components/NoResults/index.js";
import { DropFilesHere } from "~/components/DropFilesHere/index.js";

interface EmptyViewProps {
    browseFiles: FilesRenderChildren["browseFiles"];
    isSearchResult?: boolean;
}

export const Empty = ({ browseFiles, isSearchResult }: EmptyViewProps) => {
    const { canRead } = useFileManagerApi();

    if (!canRead) {
        return <NoPermission />;
    }
    if (isSearchResult) {
        return <NoResults />;
    }

    return <DropFilesHere empty onClick={() => browseFiles()} />;
};
