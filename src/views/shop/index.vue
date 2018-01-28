<template>
  <div class="app-container">
    <h1>Loja</h1>
    <div class="albums-container" v-loading="isLoadingAlbums">
      <el-row>
        <el-col v-for="album in albums" :key="album.id" :sm="{span: 9, offset: 2}" :md="{span: 6}" :lg="{span: 5, offset: 1}" :xl="{span: 3}">
          <el-card :body-style="{ padding: '0px' }" class="album-container">
            <img :src="album.cover" class="image">
            <div style="padding: 15px;">
              <el-row>
                <el-col :span="18" :xl="17">
                  <span class="albumTitle">{{album.title}}</span>
                </el-col>
                <el-col :span="6" :xl="7">
                  <span class="albumPrice">R${{album.price}}</span>
                </el-col>
              </el-row>
              <div class="bottom clearfix">
                <span class="albumArtist">{{album.artist}}</span>
                <span class="albumGenre">{{album.genre}}</span>
                <el-button type="primary" class="button addToCart" @click.native.prevent="addToCart(album)">
                  Adicionar ao carrinho
                  <i class="el-icon-fa-cart-plus" aria-hidden="true"></i>
                </el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoadingAlbums: true
    }
  },
  methods: {
    addToCart(album) {
      const albumsInCart = this.$store.getters.cart.albums
      if (albumsInCart.find(albumInCart => albumInCart.id === album.id)) {
        this.$notify.info({ message: 'O item já foi adicionado ao carrinho' })
        return
      }
      this.$store.dispatch('addToCart', album)
      this.$store.dispatch('calculateTotalPrice')
      this.$notify({ type: 'success', title: 'Sucesso', message: 'Item adicionado ao carrinho' })
    }
  },
  created() {
    this.$store.dispatch('loadAlbums')
      .then(() => {
        this.isLoadingAlbums = false
      })
  },
  computed: {
    albums() {
      return this.$store.getters.loadedAlbums
    }
  }
}
</script>

<style>
  .image {
    display: block;
    margin: 0 auto;
    width: 250px;
    height: 250px;
  }
  .albumTitle {
    font-weight: bold;
  }
  .addToCart {
    width: 100%;
    padding: 0.5em;
  }
  .albumPrice {
    color: green;
  }
  .albumGenre {
    display: block;
  }
  .album-container {
    line-height: 1.5em;
    margin-top: 1em;
  }
  .albumGenre {
    font-size: 0.8em;
  }
</style>
