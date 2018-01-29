<template>
  <div class="app-container" v-loading="isLoadingAlbums">
    <el-popover ref="genrePopOver" width="400" trigger="click">
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">Todos</el-checkbox>
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group v-model="checkedGenres" @change="handleCheckedGenresChange">
        <el-checkbox v-for="genre in genreOptions" :label="genre" :key="genre">{{genre}}</el-checkbox>
      </el-checkbox-group>
    </el-popover>

    <el-row :gutter="10">
      <el-col :xs="{offset: 1}" :sm="{span: 14, offset: 4}" :md="{span: 12, offset: 4}" :xl="{span: 6, offset: 8}" class="input-container">
        <el-input  size="small" placeholder="Pesquise por um álbum" v-model="searchText" class="input-with-select" @keyup.enter.native="searchAlbums">
          <el-select v-model="searchOption" slot="prepend">
            <el-option label="Título" value="title"></el-option>
            <el-option label="Artista" value="artist"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click.prevent.native="searchAlbums"></el-button>
        </el-input>
      </el-col>
      <el-col :xs="{span: 24, offset: 10}" :sm="{span: 2}">
        <el-button id="btn-genre" v-popover:genrePopOver size="small">Genêros <i class="el-icon-fa-music"></i></el-button>
      </el-col>
     </el-row>
    <div class="albums-container">
      <el-row>
        <el-col v-for="album in albums" :key="album.id" :sm="{span: 9, offset: 2}" :md="{span: 6}" :lg="{span: 5, offset: 1}" :xl="{span: 3}">
          <el-card :body-style="{ padding: '0px' }" class="album-container">
            <div class="image-container">
              <img :src="album.cover" class="image outOfStock">
            </div>
            <div style="padding: 15px;">
              <el-row>
                <el-col :span="18" :xl="17">
                  <span class="albumTitle">{{album.title}}</span>
                </el-col>
                <el-col :span="6" :xl="7">
                  <span class="albumPrice">{{album.price | currency}}</span>
                </el-col>
              </el-row>
              <div class="bottom clearfix">
                <span class="albumArtist">{{album.artist}}</span>
                <span class="albumGenre">{{album.genre}}</span>
                <el-button :type="hasStock(album) ? 'primary' : 'danger'" :disabled="!hasStock(album)" class="button addToCart" @click.native.prevent="addToCart(album)">
                  <span v-if="hasStock(album)">
                    Adicionar ao carrinho
                    <i class="el-icon-fa-cart-plus" aria-hidden="true"></i>
                  </span>
                  <span v-else>
                    Fora de estoque
                    <i class="el-icon-fa-times"></i>
                  </span>
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
import { filter, startsWith } from 'lodash'

export default {
  data() {
    return {
      checkAll: false,
      isLoadingAlbums: true,
      searchOption: 'title',
      searchText: '',
      checkedGenres: ['Rap & Hip-Hop', 'Indie rock'],
      genreOptions: ['Indie rock', 'Rap & Hip-Hop', 'Eletrônica'],
      isIndeterminate: true,
      albums: []
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
    },
    searchAlbums() {
      const searchFor = this.searchOption
      const text = this.searchText
      const albums = this.$store.getters.loadedAlbums
      const filteredAlbums = filter(albums, album => {
        return startsWith(album[searchFor].toLowerCase(), text.toLowerCase())
      })
      this.albums = text ? filteredAlbums : albums
    },
    handleCheckAllChange(val) {
      this.checkedGenres = val ? this.genreOptions : []
      this.isIndeterminate = false
      const albums = this.$store.getters.loadedAlbums
      this.albums = this.checkedGenres.length ? albums : []
    },
    handleCheckedGenresChange(val) {
      const genres = val
      const albums = this.$store.getters.loadedAlbums
      const filteredAlbums = filter(albums, album => genres.includes(album.genre))
      this.albums = filteredAlbums
    },
    hasStock(album) {
      return album.stock > 0
    }
  },
  created() {
    this.$store.dispatch('loadAlbums')
      .then(() => {
        this.isLoadingAlbums = false
      })
  },
  computed: {
    loadedAlbums() {
      return this.$store.getters.loadedAlbums
    }
  },
  watch: {
    loadedAlbums(newValue) {
      this.albums = newValue
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
  .el-select .el-input {
    width: 90px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .el-select-dropdown {
    min-height: 90px;
  }
  #input-search {
    min-width: 200px;
  }
  .input-container {
    margin-bottom: 1em;
  }
</style>
