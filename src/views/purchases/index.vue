<template>
 <div class="app-container">
    <h1>Meus pedidos</h1>
    <div class="purchases-container" v-loading="isLoadingPurchases">
      <el-row>
        <el-col>
          <el-table :data="purchases" empty-text="Nenhuma compra realizada">
            <el-table-column prop="shortId" label="Código do pedido"></el-table-column>
            <el-table-column sortable sort-by="date" label="Pedido realizado em">
              <template slot-scope="scope">
                <span>{{scope.row.purchaseDate | date}}</span>
              </template>
            </el-table-column>
            <el-table-column sortable sort-by="totalPrice" label="Total do pedido">
              <template slot-scope="scope">
                <span>{{scope.row.totalPrice | currency}}</span>
              </template>
            </el-table-column>
            <el-table-column label="Status">
              <template slot-scope="scope">
                <span>
                  {{scope.row.status}}
                  <i class="el-icon-fa-check enviado"></i>
                </span>
              </template>
            </el-table-column>
            <el-table-column label="Detalhes"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
 </div>
</template>

<script>
export default {
  data() {
    return {
      isLoadingPurchases: true
    }
  },
  created() {
    this.$store.dispatch('fetchUserPurchases')
      .then(() => {
        this.isLoadingPurchases = false
      })
      .catch(err => {
        console.log(err)
        this.isLoadingPurchases = false
      })
  },
  computed: {
    purchases() {
      return this.$store.getters.userPurchases
    }
  }
}
</script>

<style>
.enviado {
  color: green;
}
</style>
