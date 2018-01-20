const getters = {
  sidebar: state => state.app.sidebar,
  user: state => state.auth.user,
  loading: state => state.app.loading,
  menuItems: state => state.app.menuItems
}
export default getters
