const getters = {
  sidebar: state => state.app.sidebar,
  user: state => state.auth.user,
  loading: state => state.app.loading,
  menuItems: state => state.app.menuItems,
  loadedAlbums: state => state.album.loadedAlbums,
  cart: state => state.sale.cart,
  userPurchases: state => state.sale.userPurchases,
  loadedSales: state => state.sale.loadedSales,
  loadedStorePurchases: state => state.purchase.loadedStorePurchases
}
export default getters
