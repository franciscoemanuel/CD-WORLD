<template>
  <div class="app-container" v-loading="isLoadingPurchases">
    <el-row>
      <el-col :span="21">
        <h1>Compras da loja</h1>
      </el-col>
      <el-col :span="2">
        <el-button id="btn-nova-compra" type="primary" size="mini" icon="el-icon-plus" @click.prevent.native="newPurchase()">Nova compra</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
         <el-table :data="storePurchases" empty-text="Nenhuma compra realizada">
            <el-table-column prop="id" label="Código da compra"></el-table-column>
            <el-table-column sortable sort-by="purchaseDate" label="Data da compra">
              <template slot-scope="scope">
                <span>{{scope.row.purchaseDate | date}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="albumData.title" label="Nome do CD"></el-table-column>
            <el-table-column prop="albumData.artist" label="Artista"></el-table-column>
            <el-table-column sortable sort-by="buyingPrice" label="Preço Unit.">
              <template slot-scope="scope">
                <span>{{scope.row.buyingPrice | currency}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="stock" label="Qtd. comprada"></el-table-column>            
            <el-table-column sortable sort-by="totalBuyingPrice" label="Total">
              <template slot-scope="scope">
                <span>{{scope.row.totalBuyingPrice | currency}}</span>
              </template>
            </el-table-column>
          </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { orderBy } from 'lodash'
export default {
  data() {
    return {
      isLoadingPurchases: true
    }
  },
  methods: {
    newPurchase() {
      this.$router.push('/compras/nova-compra')
    }
  },
  created() {
    this.$store.dispatch('fetchStorePurchases')
      .then(() => {
        this.isLoadingPurchases = false
      })
      .catch(err => {
        console.log(err)
        this.isLoadingPurchases = false
      })
  },
  computed: {
    storePurchases() {
      const storePurchases = this.$store.getters.loadedStorePurchases
      return orderBy(storePurchases, 'purchaseDate', 'desc')
    }
  }
}
</script>

<style>
#btn-nova-compra{
  margin-top: 1.5em;
}
</style>
