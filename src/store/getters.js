const getters = {
  sidebar: state => state.app.sidebar,
  user: state => state.auth.user,
  loading: state => state.app.loading,
  menuItems: state => state.app.menuItems,
  loadedAlbums: state => state.album.loadedAlbums,
  cart: state => state.purchase.cart,
  userPurchases: state => state.purchase.userPurchases
}
export default getters
