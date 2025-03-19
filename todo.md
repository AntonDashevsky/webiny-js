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

```
<AdminConfig>
    <IsRootTenant>
        <Menu
            name={"tenantManager"}
            element={
                <Menu.Link
                    icon={<TenantManagerIcon/>}
                    label={"Tenant Manager"}
                    path={"/tenants"}
                />
            }
        />

        <Route
            name={"tenantManager.tenants"}
            exact
            path={"/tenants"}
            element={
                <Layout title={"Tenant Manager - Tenants"}>
                    <TenantsView/>
                </Layout>
            }
        />
    </IsRootTenant>
</AdminConfig>
```
