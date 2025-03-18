
- footer visuals ... dropdown menus links
- top right menu
- locales selector
- Menu.Support
- Tenant.Name/Logo
- footer componente (zamaskirani tags)
    - plus support dropodown menu
- decorate sidebar items
- user menu
- hcms menu bug
- packages/app-apw/src/plugins/cms/MenuGroupRenderer.tsx:11
- No routes matched location "/"  Error Component Stack

## SH / Next PR
- sidebar rerenders?
  - layout component not used?
  - secureRoute wrapping layout also kills sidebar?
  - gotta implement ls-based storing of open/closed state
  - HasPermissions instead of SecureRoute helps!
  
## PAVEL

- ✅ tags for header/footer??
- ✅ admin logo / title API
- ✅ router in app, exposed via Admin cfg
- ✅ packages/app-admin-rmwc/src/modules/Layout.tsx
- withStaticProps / where to put?
