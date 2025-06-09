import React from "react";
import { css } from "emotion";
import { ReactComponent as DownButton } from "@material-design-icons/svg/round/arrow_drop_down.svg";
import { Menu, MenuItem } from "@webiny/ui/Menu/index.js";
import { ButtonDefault } from "@webiny/ui/Button/index.js";
import { Icon } from "@webiny/ui/Icon/index.js";
import { Typography } from "@webiny/ui/Typography/index.js";
import { useRevisions } from "~/pageEditor/hooks/useRevisions.js";
import { type RevisionItemAtomType } from "~/pageEditor/state/index.js";
import { useNavigatePage } from "~/admin/hooks/useNavigatePage.js";

const buttonStyle = css({
    "&.mdc-button": {
        color: "var(--mdc-theme-text-primary-on-background) !important"
    }
});

const menuList = css({
    ".mdc-deprecated-list-item": {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "baseline",
        textAlign: "left"
    }
});

enum RevisionStatusEnum {
    PUBLISHED = "published",
    LOCKED = "locked",
    DRAFT = "draft"
}
const getStatus = (revision: RevisionItemAtomType): RevisionStatusEnum => {
    if (revision.published) {
        return RevisionStatusEnum.PUBLISHED;
    } else if (revision.locked && !revision.published) {
        return RevisionStatusEnum.LOCKED;
    }
    return RevisionStatusEnum.DRAFT;
};

export const RevisionsDropdownMenu = () => {
    const [revisions] = useRevisions();
    const { navigateToPageEditor } = useNavigatePage();

    return (
        <Menu
            className={menuList}
            onSelect={evt => {
                navigateToPageEditor(revisions[evt.detail.index].id);
            }}
            handle={
                <ButtonDefault className={buttonStyle}>
                    Revisions <Icon icon={<DownButton />} />
                </ButtonDefault>
            }
        >
            {revisions.map(rev => {
                const status = getStatus(rev);
                return (
                    <MenuItem key={rev.id} disabled={status !== RevisionStatusEnum.DRAFT}>
                        <Typography use={"body2"}>v{rev.version}</Typography>
                        <Typography use={"caption"}>({status}) </Typography>
                    </MenuItem>
                );
            })}
        </Menu>
    );
};
