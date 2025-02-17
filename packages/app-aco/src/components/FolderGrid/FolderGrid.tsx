import React from "react";

import { FolderProvider } from "~/contexts/folder.js";
import { Folder } from "~/components/FolderGrid/Folder.js";
import { Grid } from "~/components/FolderGrid/styled.js";
import { AcoWithConfig } from "~/config/index.js";
import { FolderItem } from "~/types.js";

interface FolderGridProps {
    folders: FolderItem[];
    onFolderClick: (id: string) => void;
}

export const FolderGrid = ({ folders, onFolderClick }: FolderGridProps) => {
    if (folders.length === 0) {
        return null;
    }

    return (
        <AcoWithConfig>
            <Grid>
                {folders.map(folder => (
                    <FolderProvider key={folder.id} folder={folder}>
                        <Folder onClick={onFolderClick} />
                    </FolderProvider>
                ))}
            </Grid>
        </AcoWithConfig>
    );
};
