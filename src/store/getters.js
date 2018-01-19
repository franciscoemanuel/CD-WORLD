const getters = {
  sidebar: state => state.app.sidebar,
  user: state => state.auth.user,
  loading: state => state.app.loading
}
export default getters
