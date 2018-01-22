<template>
  <div class="app-container">
    <h1>Loja</h1>
    </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('loadAlbums')
  },
  computed: {
    albums() {
      return this.$store.getters.loadedAlbums
    }
  }
}
</script>

<style>

</style>
