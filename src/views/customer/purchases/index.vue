<template>
 <div class="app-container" v-loading="isLoadingSales">
    <h1>Meus pedidos</h1>
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
    this.$store.dispatch('fetchUserPurchases')
      .then(() => {
        this.isLoadingSales = false
      })
      .catch(err => {
        console.log(err)
        this.isLoadingSales = false
      })
  },
  computed: {
    sales() {
      const userPurchases = this.$store.getters.userPurchases
      return orderBy(userPurchases, 'purchaseDate', 'desc')
    }
  }
}
</script>

<style>
.sent {
  color: green;
}
</style>
