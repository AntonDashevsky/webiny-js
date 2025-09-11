import React from "react";
import { ReactComponent as EditIcon } from "@webiny/icons/edit.svg";
import { useGetEditPageUrl } from "~/modules/pages/PagesList/hooks/useGetEditPageUrl.js";
import { usePage } from "~/modules/pages/PagesList/hooks/usePage.js";
import { PageListConfig } from "~/modules/pages/configs";

const { OptionsMenuLink } = PageListConfig.Browser.Page.Action;

export const Edit = () => {
    const { page } = usePage();
    const { getEditPageUrl } = useGetEditPageUrl();

    return <OptionsMenuLink icon={<EditIcon />} label={"Edit"} to={getEditPageUrl(page.id)} />;
};
