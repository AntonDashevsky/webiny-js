import React from "react";
import { ReactComponent as SearchIcon } from "@material-design-icons/svg/outlined/search.svg";
import { ReactComponent as TrashIcon } from "@material-design-icons/svg/outlined/delete_forever.svg";
import EmptyView from "@webiny/app-admin/components/EmptyView.js";
import { EmptyOuter, EmptyWrapper } from "./Empty.styled.js";
import { useTrashBin } from "~/Presentation/hooks/index.js";

export const Empty = () => {
    const { vm } = useTrashBin();

    return (
        <EmptyWrapper>
            <EmptyOuter>
                {vm.isSearchView ? (
                    <EmptyView icon={<SearchIcon />} title={"No items found."} action={null} />
                ) : (
                    <EmptyView
                        icon={<TrashIcon />}
                        title={`Nothing found in the trash: items left in the trash are automatically deleted after ${vm.retentionPeriod}.`}
                        action={null}
                    />
                )}
            </EmptyOuter>
        </EmptyWrapper>
    );
};
