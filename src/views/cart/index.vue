<template>
  <div class="app-container">
    <h1>Carrinho</h1>
    <el-row>
      <el-col>
        <el-table :data="cartItems" empty-text="Nenhum item no carrinho">
          <el-table-column>
            <template slot-scope="scope">
              <img :src="scope.row.cover" class="albumCover">
            </template>
          </el-table-column>
          <el-table-column prop="title" label="Álbum"></el-table-column>
          <el-table-column prop="artist" label="Artista"></el-table-column>
          <el-table-column label="Preço unit." min-width="100">
            <template slot-scope="scope">
              <span>{{scope.row.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}}</span>
            </template>
          </el-table-column>
          <el-table-column label="Quantidade" min-width="150">
            <template slot-scope="scope">
              <el-input-number controls-position="right" :min="1" @change="recalculateSubTotal($event, scope.row)" v-model="scope.row.quantity" size="mini"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column label="Subtotal" min-width="100">
            <template slot-scope="scope">
              <span>{{scope.row.subTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}}</span>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-button size="mini" @click.prevent.native="removeFromCart(scope.row)" type="danger">
                <i class="el-icon-fa-times"></i>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <div v-if="hasItemsInTheCart()">
      <h3 class="totalPriceLabel">Total: {{totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}}</h3>
      <el-button :loading="loading" type="success" plain id="btn-finishOrder" @click.prevent.native="checkoutPurchase">
        Finalizar pedido
        <i class="el-icon-fa-check"></i>
      </el-button>
    </div>
  </div>
</template>

<script>
import { translateFirebaseErrorCodeToMessage } from '@/utils/firebaseErrorMessages'

export default {
  data() {
    return {
      loading: false
    }
  },
  methods: {
    recalculateSubTotal(newQuantity, album) {
      album.quantity = newQuantity
      this.$store.dispatch('recalculateSubTotal', album)
      this.$store.dispatch('calculateTotalPrice')
    },
    removeFromCart(album) {
      this.$store.dispatch('removeFromCart', album)
      this.$store.dispatch('calculateTotalPrice')
    },
    hasItemsInTheCart() {
      return this.cartItems.length > 0
    },
    checkoutPurchase() {
      this.loading = true
      this.$store.dispatch('checkoutPurchase')
        .then(() => {
          this.loading = false
          this.$store.dispatch('cleanCart')
          this.$notify({ type: 'success', title: 'Sucesso', message: 'Compra efetuada!' })
        })
        .catch((err) => {
          console.log(err)
          this.loading = false
          const message = translateFirebaseErrorCodeToMessage(err.code)
          this.$notify({ type: 'error', title: 'Falha ao fazer login', message })
        })
    }
  },
  computed: {
    cartItems() {
      const cart = this.$store.getters.cart
      return cart ? cart.albums : []
    },
    totalPrice() {
      const cart = this.$store.getters.cart
      return cart ? cart.totalPrice : 0.0
    }
  }
}
</script>

<style>
.albumCover {
  width: 100px;
  height: 70px;
}
#btn-finishOrder {
  margin: 0 auto;
  display: block;
}
#totalPriceCard {
  margin: 0 auto;
  display: block;
  margin-top: 2em;
}
.totalPriceLabel {
  text-align: center;
}
</style>
