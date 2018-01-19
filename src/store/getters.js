const getters = {
  sidebar: state => state.app.sidebar,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  userId: state => state.user.id,
  roles: state => state.user.roles,
  menuItems: state => state.user.menuItems,
  loading: state => state.app.loading
}
export default getters
