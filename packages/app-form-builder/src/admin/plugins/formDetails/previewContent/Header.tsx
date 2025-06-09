import React from "react";
import { css } from "emotion";
import { Typography } from "@webiny/ui/Typography/index.js";
import { Grid, Cell } from "@webiny/ui/Grid/index.js";
import { PublishRevision, EditRevision, DeleteForm, RevisionSelector } from "./HeaderComponents/index.js";
import { type FbFormDetailsPluginRenderParams, type FbRevisionModel } from "~/types.js";

const headerTitle = css({
    "&.mdc-layout-grid": {
        borderBottom: "1px solid var(--mdc-theme-on-background)",
        color: "var(--mdc-theme-text-primary-on-background)",
        background: "var(--mdc-theme-surface)",
        paddingTop: 10,
        paddingBottom: 9,
        ".mdc-layout-grid__inner": {
            alignItems: "center"
        }
    }
});

const pageTitle = css({
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
});

const headerActions = css({
    justifyContent: "flex-end",
    marginRight: "-15px",
    display: "flex",
    alignItems: "center"
});

interface HeaderProps extends FbFormDetailsPluginRenderParams {
    revision: FbRevisionModel;
    selectRevision: (revision: FbRevisionModel) => void;
}

const Header = (props: HeaderProps) => {
    const { revision } = props;
    return (
        <React.Fragment>
            {revision && (
                <Grid className={headerTitle}>
                    <Cell span={8} className={pageTitle}>
                        <Typography use="headline5">{revision.name}</Typography>
                    </Cell>
                    <Cell span={4} className={headerActions}>
                        <RevisionSelector {...props} />
                        <EditRevision {...props} />
                        <PublishRevision {...props} />
                        <DeleteForm {...props} />
                    </Cell>
                </Grid>
            )}
        </React.Fragment>
    );
};

export default Header;
