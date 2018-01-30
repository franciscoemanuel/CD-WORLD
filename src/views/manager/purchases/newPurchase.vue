<template>
  <div class="app-container">
    <el-row>
      <el-col>
        <el-form :model="newAlbumForm" :rules="formRules" ref="newAlbumForm">
          <el-form-item prop="title" label="Título">
            <el-input name="title" v-model="newAlbumForm.title" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item prop="artist" label="Artista">
            <el-input name="artist" v-model="newAlbumForm.artist" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item prop="genre" label="Gênero">
            <el-input name="genre" v-model="newAlbumForm.genre" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item prop="cover" label="Imagem de capa (URL)">
            <el-input name="cover" v-model="newAlbumForm.cover" auto-complete="off"></el-input>
          </el-form-item>
          <el-row>
            <el-col :sm="{span: 6}" :lg="{span: 5}">
              <el-form-item prop="stock" label="Quantidade comprada">
                <el-input-number size="mini" name="stock" v-model="newAlbumForm.stock" :min="0" :controls="false"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :sm="{span: 6, offset: 2}" :lg="{span: 5}">
              <el-form-item prop="buyingPrice" label="Preço de compra">
                <el-input-number size="mini" name="buyingPrice" v-model="newAlbumForm.buyingPrice" :min="0" :controls="false"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :sm="{span: 6, offset: 2}" :lg="{span: 5}">
              <el-form-item prop="price" label="Preço de venda">
                <el-input-number size="mini" name="price" v-model="newAlbumForm.price" :min="0" :controls="false"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-button type="primary" icon="el-icon-fa-check" :loading="isInsertingAlbum" @click.prevent.native="insertNewAlbum()">Finalizar</el-button>
          <el-button icon="el-icon-fa-check">Cancelar</el-button>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { pick } from 'lodash'
import { translateFirebaseErrorCodeToMessage } from '@/utils/firebase'

export default {
  data() {
    return {
      newAlbumForm: {
        title: '',
        artist: '',
        genre: '',
        cover: '',
        price: '',
        buyingPrice: '',
        stock: ''
      },
      formRules: {
        title: [{ required: true, trigger: 'blur', message: 'Insira o nome do cd' }],
        artist: [{ required: true, trigger: 'blur', message: 'Insira o nome do artista' }],
        cover: [{ required: true, trigger: 'blur', message: 'Insira o link para a imagem do álbum' }],
        genre: [{ required: true, trigger: 'blur', message: 'Insira o gênero músical' }],
        price: [{ required: true, trigger: 'blur', message: 'Insira o preço de venda do álbum' }],
        buyingPrice: [{ required: true, trigger: 'blur', message: 'Insira o preço de compra do álbum' }],
        stock: [{ required: true, trigger: 'blur', message: 'Insira a quantidade comprada' }]
      },
      isInsertingAlbum: false
    }
  },
  methods: {
    insertNewAlbum() {
      this.$refs.newAlbumForm.validate(valid => {
        if (valid) {
          this.isInsertingAlbum = true
          const albumProps = ['title', 'artist', 'genre', 'price', 'cover', 'stock']
          const albumData = pick(this.newAlbumForm, albumProps)
          this.$store.dispatch('insertNewAlbum', albumData)
            .then(() => {
              this.isInsertingAlbum = false
              this.$notify({ type: 'success', title: 'Sucesso', message: 'Registro de compra inserido!' })
            })
            .catch(err => {
              console.log(err)
              const message = translateFirebaseErrorCodeToMessage(err.code)
              this.$notify({ type: 'error', title: 'Falha ao realizar cadastro', message })
              this.isInsertingAlbum = true
            })
        }
      })
    }
  }
}
</script>

<style>

</style>
