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
          <el-table-column label="Preço unit.">
            <template slot-scope="scope">
              <span>{{scope.row.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}}</span>
            </template>
          </el-table-column>
          <el-table-column label="Quantidade">
            <template slot-scope="scope">
              <el-input-number controls-position="right" :min="1" @change="recalculateSubTotal($event, scope.row)" v-model="scope.row.quantity" size="mini"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column label="Subtotal">
            <template slot-scope="scope">
              <span>{{scope.row.subTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}}</span>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-button size="mini" @click.prevent.native="removeFromCart(scope)" type="danger">
                <i class="el-icon-fa-times"></i>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row>
      <el-col :md="6">
        <el-card id="totalPriceCard" v-if="cartItems.length > 0">
          <div slot="header" class="clearfix">
            <h3 class="totalPriceLabel">Total: {{totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}}</h3>
          </div>
          <div class="total">
            <el-button type="success" plain id="btn-finishOrder">
              Finalizar pedido
              <i class="el-icon-fa-check"></i>
            </el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      DeletePopOverIsVisible: false
    }
  },
  methods: {
    recalculateSubTotal(newQuantity, album) {
      album.quantity = newQuantity
      this.$store.dispatch('recalculateSubTotal', album)
    },
    removeFromCart(album) {
      this.$store.dispatch('removeFromCart', album)
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
