<template>
  <div class="app-container">
    <el-row>
      <el-col>
        <el-form :model="newPurchaseForm" :rules="formRules" ref="newPurchaseForm">
          <el-form-item prop="title" label="Título">
            <el-input name="title" v-model="newPurchaseForm.title" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item prop="artist" label="Artista">
            <el-input name="artist" v-model="newPurchaseForm.artist" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item prop="genre" label="Gênero">
            <el-input name="genre" v-model="newPurchaseForm.genre" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item prop="cover" label="Imagem de capa (URL)">
            <el-input name="cover" v-model="newPurchaseForm.cover" auto-complete="off"></el-input>
          </el-form-item>
          <el-row>
            <el-col :sm="{span: 6}" :lg="{span: 4}">
              <el-form-item prop="stock" label="Quantidade comprada">
                <el-input-number @input="calculateTotalBuyingPrice()" size="mini" name="stock" v-model="newPurchaseForm.stock" :min="0" :controls="false"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :sm="{span: 6, offset: 2}" :lg="{span: 4}">
              <el-form-item prop="buyingPrice" label="Preço unit. de compra">
                <el-input-number @input="calculateTotalBuyingPrice()" size="mini" name="buyingPrice" v-model="newPurchaseForm.buyingPrice" :min="0.0" :controls="false"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :sm="{span: 6, offset: 2}" :lg="{span: 4}">
              <el-form-item prop="sellingPrice" label="Preço unit. de venda">
                <el-input-number size="mini" name="sellingPrice" v-model="newPurchaseForm.sellingPrice" :min="0.0" :controls="false"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :sm="{span: 6}" :lg="{span: 4, offset: 2}">
              <el-form-item prop="totalBuyingPrice" label="Preço total da compra">
                <el-input-number size="mini" name="totalBuyingPrice" v-model="newPurchaseForm.totalBuyingPrice" :min="0.0" :controls="false"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item prop="purchaseDate" label="Data da compra">
            <el-date-picker
              v-model="newPurchaseForm.purchaseDate"
              type="date" format="dd/MM/yyyy" :clearable="false"
              placeholder="Pick a day">
            </el-date-picker>
          </el-form-item>
          <el-button type="primary" icon="el-icon-fa-check" :loading="isInsertingAlbum" @click.prevent.native="insertNewAlbum()">Finalizar</el-button>
          <el-button icon="el-icon-fa-check">Cancelar</el-button>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { pick, set, get } from 'lodash'
import { translateFirebaseErrorCodeToMessage } from '@/utils/firebase'

export default {
  data() {
    const validateNumberGTZero = (rule, value, callback) => {
      if (value <= 0) {
        callback(new Error('Insira um valor maior que zero'))
      } else {
        callback()
      }
    }
    return {
      albumProps: ['title', 'artist', 'genre', 'cover', 'sellingPrice', 'stock'],
      purchaseProps: ['buyingPrice', 'purchaseDate', 'totalBuyingPrice', 'stock'],
      newPurchaseForm: {
        title: '',
        artist: '',
        genre: '',
        cover: '',
        sellingPrice: '',
        purchaseDate: '',
        stock: 0,
        buyingPrice: 0,
        totalBuyingPrice: 0
      },
      formRules: {
        title: [{ required: true, trigger: 'blur', message: 'Insira o nome do cd' }],
        artist: [{ required: true, trigger: 'blur', message: 'Insira o nome do artista' }],
        cover: [{ required: true, trigger: 'blur', message: 'Insira o link para a imagem do álbum' }],
        genre: [{ required: true, trigger: 'blur', message: 'Insira o gênero músical' }],
        sellingPrice: [
          { required: true, trigger: 'blur', message: 'Insira o preço de venda do álbum' },
          { validator: validateNumberGTZero, trigger: 'blur' }
        ],
        buyingPrice: [
          { required: true, trigger: 'blur', message: 'Insira o preço de compra do álbum' },
          { validator: validateNumberGTZero, trigger: 'blur' }
        ],
        stock: [
          { required: true, trigger: 'blur', message: 'Insira a quantidade comprada' },
          { validator: validateNumberGTZero, trigger: 'blur' }
        ],
        totalBuyingPrice: [
          { required: true, trigger: 'blur', message: 'Insira a quantidade comprada' },
          { validator: validateNumberGTZero, trigger: 'blur' }
        ]
      },
      isInsertingAlbum: false
    }
  },
  methods: {
    insertNewAlbum() {
      this.$refs.newPurchaseForm.validate(valid => {
        if (valid) {
          this.isInsertingAlbum = true
          const newAlbum = pick(this.newPurchaseForm, this.albumProps)
          this.$store.dispatch('insertNewAlbum', newAlbum)
            .then(albumId => {

              const newPurchase = pick(this.newPurchaseForm, this.purchaseProps)
              set(newPurchase, 'albumId', albumId)
              return this.$store.dispatch('insertNewPurchase', newPurchase)
            })
            .then(() => {
              this.isInsertingAlbum = false
              this.$notify({ type: 'success', title: 'Sucesso', message: 'Registro de compra inserido!' })
              this.newPurchaseForm = {}
              this.$router.push('/compras')
            })
            .catch(err => {
              console.log(err)
              const message = translateFirebaseErrorCodeToMessage(err.code)
              this.$notify({ type: 'error', title: 'Falha ao realizar cadastro', message })
              this.isInsertingAlbum = true
            })
        }
      })
    },
    calculateTotalBuyingPrice() {
      const unitPrice = get(this.newPurchaseForm, 'buyingPrice')
      const stockQuantity = get(this.newPurchaseForm, 'stock')
      if (!unitPrice | !stockQuantity) return
      const totalPrice = unitPrice * stockQuantity
      set(this.newPurchaseForm, 'totalBuyingPrice', totalPrice)
    }
  }
}
</script>

<style>

</style>
