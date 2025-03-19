## SH / Next PR

- No routes matched location "/" Error Component Stack
- hcms menu bug
- what's this for? packages/app-apw/src/plugins/cms/MenuGroupRenderer.tsx:11
- sidebar rerenders?
  - layout component not used?
  - secureRoute wrapping layout also kills sidebar?
  - gotta implement ls-based storing of open/closed state
  - HasPermissions instead of SecureRoute helps!
- Tenant.Name/Logo
- footer componente (zamaskirani tags)
  - plus support dropodown menu (- Menu.Support)
- decorate sidebar items
- top app bar menu items via config (packages/app-admin/src/base/ui/UserMenu.tsx)
  - user menu okta/a0 - kill AddUserMenu
- DropdownMenu icon=<svg...> or icon=<Item.Icon src={<Svg
- dropdown links .... not clickable the whole zone.. prolly revisit and do the same thing as with the sidebar
- kreso locale selctor

```ts
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
            {/*// >>>or<<< set propsa*/}
            {/*<Tenant.Name value={"Webiny"} element={<>Webiny</>} />*/}
            {/*<Tenant.Logo src={"https://..."} element={<MyCompanyIcon/>} />*/}

            {/*/!*<Menu.Support element={AKO HOCU OVERRIDAT} label={MOJ CUSTOM LABEL}>*!/*/}
            {/*    <Menu.Support.Item name={'slack'} remove={true} />*/}
            {/*/!*</Menu.Support>*!/*/}
        </>
    );
};
```

- check icons
  - packages/app-admin-ui/src/modules/Navigation/wby-logo.png
  - packages/app-admin-ui/src/modules/Dashboard/icons/twitter.svg
- packages/app-admin-ui/src/modules/Overlays/Dialog.tsx
- Password field is not contained in a form...

## Changes

1. `app-admin-rmwc` renamed to `app-admin-ui`
2. removed OmniSearch
3. HeaderBar component
4. sidebar minor fixes (removed classes in root, chevrn pos fix...)
5. updated code in all components
6. first/last fix by Pavel
7. ddown menu item - readonly

## Concerns
- bring back AddMenu
- packages/app-apw/src/plugins/cms/MenuGroupRenderer.tsx
- 64 to 45