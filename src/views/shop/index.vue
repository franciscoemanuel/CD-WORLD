<template>
  <div class="app-container">
    <h1>Loja</h1>
    <div class="albums-container" v-loading="isLoadingAlbums">
      <el-row v-for="album in albums" :key="album.id">
        <el-col :sm="{span: 9, offset: 2}" :md="{span: 6}" :lg="{span: 5, offset: 1}" :xl="{span: 3}">
          <el-card :body-style="{ padding: '0px' }" class="album-container">
            <img :src="album.cover" class="image">
            <div style="padding: 5px;">
              <el-row>
                <el-col :span="18" >
                  <span class="albumTitle">{{album.title}}</span>
                </el-col>
                <el-col :span="6">
                  <span class="albumPrice">R$ {{album.price}}</span>
                </el-col>
              </el-row>
              <div class="bottom clearfix">
                <span class="albumArtist">{{album.artist}}</span>
                <span class="albumGenre">{{album.genre}}</span>
                <el-button type="primary" class="button addToCart" @click.native.prevent="addToCart">
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
    addToCart: () => {
      console.log('adicionou')
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
  }
  .albumPrice {
    color: green;
  }
  .albumGenre {
    display: block;
  }
  .album-container {
    line-height: 1.2em;
    margin-top: 1em;
  }
  .albumGenre {
    font-size: 0.8em;
  }
</style>
