- below wby logo horizontal bar not vsible
- sidebar rerenders?
- routes
- admin config provider always around menu?
- useNavigation
- footer visuals ... dropdown menus links
- top right menu
- locales selector
- security issue with admin config

## PAVEL
- tags for header/footer??
- footer dropdown menus / adding links 🤦‍
- max stack exceed CMS menus
- admin logo / title API
- group if click/path is not provided?
  - in general, how to specify a chapter? API question
- $first / $last
- router in app, exposed via Admin cfg
- packages/app-admin-rmwc/src/modules/Layout.tsx
- AdminConfig.use
- Missing <SecurityProvider> in the component hierarchy!
  - packages/app-security-access-management/src/index.tsx:32
- withStaticProps / where to put?
- packages/app-admin/src/base/ui/Navigation.tsx:38 - LEGACYPLUGIN
- makes sense to export route from admin config and auto wrap it with routerConfig? Avoid this:
  ```
  <AdminConfig>
      <Menu
          name={"home"}
          after={"$last"}
          element={<Menu.Item label={"Home"} icon={<DashboardIcon />} path={"/"} />}
      />
      <Menu
          name={"settings"}
          before={"$first"}
          element={
              <Menu.Item label={"Settings"} icon={<SettingsIcon />} path={"/settings"} />
          }
      />
  </AdminConfig>

  <RouterConfig>
      <Route
          name={"home"}
          path={"/"}
          element={
              <Layout title={"Welcome!"}>
                  <Dashboard />
              </Layout>
          }
      />
  </RouterConfig>
  ```
