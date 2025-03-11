- below wby logo horizontal bar not vsible
- sidebar rerenders?
- routes
- admin config provider always around menu?
- useNavigation
- footer visuals ... dropdown menus links
- top right menu
- security issue with admin config

- P:
- admin logo / title API
- footer
- group if click/path is not provided?
- $first / $last
- router in app, exposed via Admin cfg
- AdminConfig.use
- withStaticProps / where to put?
- tags for header/footer??
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
