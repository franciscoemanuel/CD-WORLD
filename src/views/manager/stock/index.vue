<template>
  <div class="app-container">
    <h1>Em estoque</h1>
    <div class="purchases-container" v-loading="isLoadingAlbums">
      <el-row>
        <el-col>
          <el-table :data="albums" empty-text="Nenhuma compra realizada">
            <el-table-column prop="id" label="ID"></el-table-column>
              <el-table-column label="Capa">
                <template slot-scope="scope">
                  <img :src="scope.row.cover" class="albumCover">
                </template>
              </el-table-column>
            <el-table-column sortable sort-by="title" label="Título" prop="title"></el-table-column>
            <el-table-column sortable sort-by="artist" prop="artist" label="Artista"></el-table-column>
            <el-table-column sortable sort-by="genre" label="Gênero" prop="genre"></el-table-column>
            <el-table-column label="Preço de venda" sortable sort-by="sellingPrice">
              <template slot-scope="scope">
                <span>{{scope.row.sellingPrice | currency}}</span>
              </template>
            </el-table-column>
            <el-table-column sortable sort-by="stock" prop="stock" label="Quantidade"></el-table-column>
            <el-table-column label="Editar">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click.prevent.native="editAlbum(scope.row)">
                  <i class="el-icon-fa-pencil"></i>
                </el-button>
              </template>
            </el-table-column>
            <el-table-column label="Remover">
              <template slot-scope="scope">
                <el-button size="mini" type="danger" @click.prevent.native="removeAlbum(scope.row)">
                  <i class="el-icon-fa-times"></i>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>

    <el-dialog title="Editar CD" :visible.sync="editDialogIsVisible">
      <el-form :model="selectedAlbum" :rules="editFormRules" ref="selectedAlbum">
        <el-form-item prop="title" label="Título">
          <el-input name="title" v-model="selectedAlbum.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="artist" label="Artista">
          <el-input name="artist" v-model="selectedAlbum.artist" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="genre" label="Gênero">
          <el-input name="genre" v-model="selectedAlbum.genre" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="cover" label="Imagem de capa (URL)">
          <el-input name="cover" v-model="selectedAlbum.cover" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="sellingPrice" label="Preço de venda">
          <el-input-number name="sellingPrice" v-model="selectedAlbum.sellingPrice" size="mini" :min="0" :controls="false"></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button :disabled="isUpdatingAlbum" size="mini" @click="editDialogIsVisible = false">Cancelar</el-button>
        <el-button :loading="isUpdatingAlbum" size="mini" type="primary" @click.prevent.native="confirmAlbumEdit()">Editar</el-button>
      </span>
    </el-dialog>

    <el-dialog title="Excluir" :visible.sync="removeAlbumDialog" width="30%">
      <span>Tem certeza disso?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="removeAlbumDialog = false">Cancelar</el-button>
        <el-button type="primary" @click="confirmAlbumRemoval()">Cofirmar</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { translateFirebaseErrorCodeToMessage } from '@/utils/firebase'

export default {
  computed: {
    albums() {
      return this.$store.getters.loadedAlbums
    }
  },
  data() {
    return {
      editDialogIsVisible: false,
      selectedAlbum: {},
      isUpdatingAlbum: false,
      isLoadingAlbums: false,
      editFormRules: {
        title: [{ required: true, trigger: 'blur', message: 'Insira o nome do cd' }],
        artist: [{ required: true, trigger: 'blur', message: 'Insira o nome do artista' }],
        cover: [{ required: true, trigger: 'blur', message: 'Insira o link para a imagem do álbum' }],
        genre: [{ required: true, trigger: 'blur', message: 'Insira o gênero músical' }],
        sellingPrice: [{ required: true, trigger: 'blur', message: 'Insira o preço de venda do álbum' }]
      },
      removeAlbumDialog: false
    }
  },
  methods: {
    editAlbum(oldAlbumData) {
      this.selectedAlbum = oldAlbumData
      this.editDialogIsVisible = true
    },
    confirmAlbumEdit() {
      this.$refs.selectedAlbum.validate(valid => {
        if (valid) {
          this.isUpdatingAlbum = true
          const newAlbumData = this.selectedAlbum
          this.$store.dispatch('updateAlbumDate', newAlbumData)
            .then(() => {
              this.isUpdatingAlbum = false
              this.editDialogIsVisible = false
              this.$notify({ type: 'success', title: 'Sucesso', message: 'Álbum editado com sucesso!' })
            })
            .catch(err => {
              console.log(err)
              const message = translateFirebaseErrorCodeToMessage(err.code)
              this.$notify({ type: 'error', title: 'Falha ao realizar cadastro', message })
              this.isUpdatingAlbum = false
            })
        }
      })
    },
    removeAlbum(albumToRemove) {
      this.removeAlbumDialog = true
      this.selectedAlbum = albumToRemove
    },
    confirmAlbumRemoval() {
      const albumToRemove = this.selectedAlbum
      this.removeAlbumDialog = false
      this.$store.dispatch('removeAlbum', albumToRemove)
        .then(() => {
          this.$notify({ type: 'success', title: 'Sucesso', message: 'Álbum removido com sucesso!' })
        })
        .catch(err => {
          console.log(err)
          const message = translateFirebaseErrorCodeToMessage(err.code)
          this.$notify({ type: 'error', title: 'Falha ao realizar cadastro', message })
        })
    }
  },
  created() {
    this.isLoadingAlbums = true
    this.$store.dispatch('loadAlbums')
      .then(() => {
        this.isLoadingAlbums = false
      })
      .catch(err => {
        console.log(err)
        this.isLoadingAlbums = false
      })
  }
}
</script>

<style>
  .albumCover {
    width: 100px;
    height: 70px;
  }
</style>
