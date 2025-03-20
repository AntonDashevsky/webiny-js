## MH
---------------

## NEXT PR
- group variant removal?
- top app bar menu items via config (packages/app-admin/src/base/ui/UserMenu.tsx)
  - user menu okta/a0 - kill AddUserMenu
  - icons on user menu
    - kreso locale selctor
    - kreso updated user menu
- No routes matched location "/" Error Component Stack
- Password field is not contained in a form...
- hcms menu bug
- what's this for? packages/app-apw/src/plugins/cms/MenuGroupRenderer.tsx:11
- sidebar rerenders?
  - layout component not used?
  - secureRoute wrapping layout also kills sidebar?
  - gotta implement ls-based storing of open/closed state
  - HasPermissions instead of SecureRoute helps!
- Tenant.Name/Logo
- decorate sidebar items
- DropdownMenu icon=<svg...> or icon=<Item.Icon src={<Svg
- 45px
- bc Leo
- check icons
  - packages/app-admin-ui/src/modules/Navigation/wby-logo.png
  - packages/app-admin-ui/src/modules/Dashboard/icons/twitter.svg
- packages/app-admin-ui/src/modules/Overlays/Dialog.tsx
- DISCUSS
  ```
   <Menu.Item
      icon={<InfoIcon />}
      label={"Support"}
      action={<Menu.Item.Action element={<MoreIcon />} />}
  />
  ```