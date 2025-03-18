import React from "react";
import { AdminConfig } from "@webiny/app-serverless-cms";

const { Menu } = AdminConfig;

import { ReactComponent as AuditLogsIcon } from "@material-design-icons/svg/outlined/assignment.svg";
import { ReactComponent as FormBuilderIcon } from "@material-design-icons/svg/outlined/check_box.svg";
import { ReactComponent as HeadlessCmsIcon } from "@material-design-icons/svg/outlined/wysiwyg.svg";
import { ReactComponent as PageBuilderIcon } from "@material-design-icons/svg/outlined/table_chart.svg";
import { ReactComponent as InfoIcon } from "@material-design-icons/svg/outlined/info.svg";
import { ReactComponent as ChatIcon } from "@material-design-icons/svg/outlined/chat.svg";
import { ReactComponent as GithubIcon } from "@material-design-icons/svg/outlined/gite.svg";
import { ReactComponent as DocsIcon } from "@material-design-icons/svg/outlined/summarize.svg";
import { ReactComponent as ApiPlaygroundIcon } from "@material-design-icons/svg/outlined/swap_horiz.svg";
import { ReactComponent as MoreVertIcon } from "@material-design-icons/svg/outlined/more_vert.svg";
import { ReactComponent as FileManagerIcon } from "@material-design-icons/svg/outlined/insert_drive_file.svg";
import { ReactComponent as DashboardIcon } from "@material-design-icons/svg/outlined/space_dashboard.svg";

export const Extension = () => {
    return (
        <>
            {/*<AdminConfig>*/}
            {/*<Project.Logo = img.src */}
            {/*    <Project.Title = webin*/}

            {/*// >>>or<<< set propsa*/}
            {/*<Tenant.Name value={"Webiny"} element={<>Webiny</>} />*/}
            {/*<Tenant.Logo src={"https://..."} element={<MyCompanyIcon/>} />*/}

            {/*<Menu.Footer */}
            {/*    name={"cognito.settings"}*/}
            {/*    parent={"settings"}*/}
            {/*    element={<Menu.Link label={"Admin Users"} path={'/'} />}*/}
            {/*/>*/}

            {/*/!*<Menu.Support element={AKO HOCU OVERRIDAT} label={MOJ CUSTOM LABEL}>*!/*/}
            {/*    <Menu.Support.Item name={'slack'} remove={true} />*/}
            {/*/!*</Menu.Support>*!/*/}
            {/*</AdminConfig>*/}
        </>
    );
};
