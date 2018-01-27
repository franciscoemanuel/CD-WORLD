<template>
 <div class="app-container" v-loading="isLoadingPurchases">
    <h1>Meus pedidos</h1>
    <div class="purchases-container">
      <el-row>
        <el-col>
          <el-table :data="purchases" empty-text="Nenhuma compra realizada">
            <el-table-column prop="shortId" label="Código do pedido"></el-table-column>
            <el-table-column sortable sort-by="purchaseDate" label="Pedido realizado em">
              <template slot-scope="scope">
                <span>{{scope.row.purchaseDate | date}}</span>
              </template>
            </el-table-column>
            <el-table-column sortable sort-by="totalPrice" label="Total do pedido">
              <template slot-scope="scope">
                <span>{{scope.row.totalPrice | currency}}</span>
              </template>
            </el-table-column>
            <el-table-column label="Status">
              <template slot-scope="scope">
                <span>
                  {{scope.row.status}}
                  <i class="el-icon-fa-check sent"></i>
                </span>
              </template>
            </el-table-column>
            <el-table-column label="Detalhes">
              <template slot-scope="scope">
                <el-button size="mini" @click.prevent.native="showDetail(scope.row)">
                  <i class="el-icon-fa-eye"></i>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <app-purchase-detail-dialog v-if="detailDialogIsVisible" :purchaseId="selectedPurchaseId" :visibility.sync="detailDialogIsVisible"></app-purchase-detail-dialog>
 </div>
</template>

<script>
import { orderBy } from 'lodash'
export default {
  data() {
    return {
      isLoadingPurchases: true,
      detailDialogIsVisible: false,
      selectedPurchaseId: null
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
  methods: {
    showDetail(purchase) {
      console.log(purchase.id)
      this.detailDialogIsVisible = true
      this.selectedPurchaseId = purchase.id
    }
  },
  computed: {
    purchases() {
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
