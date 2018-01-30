const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase)

exports.removeFromStock = functions.database.ref('/sales/{saleId}/albums/{albumId}').onWrite(event => {
  const snapshot = event.data
  const albumSold = snapshot.val()
  const { id, quantity } = albumSold
  return admin.database().ref('albums').child(id).once('value')
    .then(data => {
      const albumData = data.val()
      const newStock = (albumData.stock - quantity)
      return admin.database().ref('albums').child(id).update({ stock: newStock })
    })
    .catch(err => {
      console.log(err)
    })
})