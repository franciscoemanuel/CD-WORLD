const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase)

exports.removeFromStock = functions.database.ref('/purchases/{purchasesId}/albums/{albumId}').onWrite(event => {
  const snapshot = event.data
  const albumPurchased = snapshot.val()
  const { id, quantity } = albumPurchased
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
