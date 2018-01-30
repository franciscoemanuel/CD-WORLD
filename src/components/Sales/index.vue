<template>
 <div class="app-container">
    <div class="purchases-container">
      <el-row>
        <el-col>
          <el-table :data="sales" empty-text="Nenhuma compra realizada">
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
export default {
  props: ['sales'],
  data() {
    return {
      detailDialogIsVisible: false,
      selectedPurchaseId: null
    }
  },
  methods: {
    showDetail(purchase) {
      this.selectedPurchaseId = purchase.id
      this.detailDialogIsVisible = true
    }
  }
}
</script>

<style>
.sent {
  color: green;
}
</style>
