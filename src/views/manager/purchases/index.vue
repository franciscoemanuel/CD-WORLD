<template>
  <div class="app-container">
    <h1>Compras da loja</h1>
    <el-button type="primary" icon="el-icon-plus" @click.prevent.native="newPurchase()">Nova compra</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    newPurchase() {
      this.$router.push('/compras/nova-compra')
    }
  }
}
</script>

<style>

</style>
