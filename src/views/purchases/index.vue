<template>
 <div class="app-container">
    <h1>Minhas compras</h1>
    <div class="purcchases-container" v-loading="isLoadingPurchases">
      <el-row>
        <el-col>
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

</style>
