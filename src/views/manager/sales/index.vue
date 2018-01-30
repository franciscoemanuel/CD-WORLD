<template>
  <div class="app-container">
      <h1>Vendas efetuadas</h1>
      <app-sales-table :sales="sales"></app-sales-table>
  </div>
</template>

<script>
import { orderBy } from 'lodash'

export default {
  data() {
    return {
      isLoadingSales: true
    }
  },
  created() {
    this.$store.dispatch('fetchSales')
      .then(() => {
        this.isLoadingPurchases = false
      })
      .catch(err => {
        console.log(err)
        this.isLoadingPurchases = false
      })
  },
  computed: {
    sales() {
      const sales = this.$store.getters.loadedSales
      return orderBy(sales, 'purchaseDate', 'desc')
    }
  }
}
</script>

<style>

</style>
