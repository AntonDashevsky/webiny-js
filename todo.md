## MH

ATM

- top app bar menu items via config (packages/app-admin/src/base/ui/UserMenu.tsx)
  - user menu okta/a0 - kill AddUserMenu
  - icons on user menu
    - kreso locale selctor
    - kreso updated user menu
    - action not visible in suppot

---

- No routes matched location "/" Error Component Stack
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
- dropdown links .... not clickable the whole zone.. prolly revisit and do the same thing as with the sidebar
- 45px
- footer separator
- bc Leo
- target={"\_blank"} on menu.link
- <Menu.Support.Link `to` instead of `path`
- refactor Dropdown.Link / Dropdown.Item
- check icons
  - packages/app-admin-ui/src/modules/Navigation/wby-logo.png
  - packages/app-admin-ui/src/modules/Dashboard/icons/twitter.svg
- packages/app-admin-ui/src/modules/Overlays/Dialog.tsx
- Password field is not contained in a form...
