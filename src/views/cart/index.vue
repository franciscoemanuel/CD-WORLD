<template>
  <div class="app-container">
    <h1>Carrinho</h1>
    <el-row>
      <el-col>
        <el-table :data="cartItems" empty-text="Nenhum item adicionado ao carrinho">
          <el-table-column>
            <template slot-scope="scope">
              <img :src="scope.row.cover" class="albumCover">
            </template>
          </el-table-column>
          <el-table-column prop="title" label="Álbum"></el-table-column>
          <el-table-column prop="artist" label="Artista"></el-table-column>
          <el-table-column prop="price" label="Preço unit."></el-table-column>
          <el-table-column label="Quantidade">
            <template slot-scope="scope">
              <el-input-number :min="1" size="small" :max="10"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column label="Subtotal"></el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  computed: {
    cartItems() {
      const cart = this.$store.getters.cart
      return cart ? cart.albums : []
    }
  }
}
</script>

<style>
.albumCover {
  width: 100px;
  height: 70px;
}
</style>
