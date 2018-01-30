<template>
  <div class="app-container" v-loading="isLoadingPurchase">
    <el-dialog title="Detalhes das compra" v-if="purchase" center fullscreen :visible.sync="isVisible" @close="updateParentProp">
       <el-row>
        <el-col :span="24">
          <el-button @click="print" center type="primary" class="print no-print" size="mini">Imprimir <i class="el-icon-fa-print"></i></el-button>
          <table class="printer-ticket">
            <thead>
              <tr>
                <th class="title" colspan="3">CD-WORLD</th>
              </tr>
              <tr>
                <th colspan="3">{{purchase.purchaseDate | date}}</th>
              </tr>
              <tr>
                <th colspan="3">
                  Av. do Ferroviário, 75 - Centro, Maceió - AL, 57020-600 <br />
                  10.825.373/0001-55
                </th>
              </tr>
              <tr>
                <th class="ttu" colspan="3">
                  <b>Cupom não fiscal</b>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="header">
                <td>Álbum</td>
                <td>Quantidade</td>
                <td>SubTotal</td>
              </tr>
            </tbody>
            <tbody v-for="album in purchase.albums" :key="album.id">
              <tr class="top">
                <td colspan="3">{{album.title}} - {{album.artist}}</td>
              </tr>
              <tr>
                <td>{{album.sellingPrice | currency}}</td>
                <td>{{album.quantity}}</td>
                <td>{{album.subTotal | currency}}</td>
              </tr>
              <tr>
                <td>Código: {{album.id}}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="sup ttu p--0">
                <td colspan="3">
                  <b>Totais</b>
                </td>
              </tr>
              <tr class="ttu">
                <td colspan="2">Sub-total</td>
                <td align="right">{{purchase.totalPrice | currency}}</td>
              </tr>
              <tr class="ttu">
                <td colspan="2">Taxa de serviço</td>
                <td align="right">R$ 0,00</td>
              </tr>
              <tr class="ttu">
                <td colspan="2">Desconto</td>
                <td align="right">0,0%</td>
              </tr>
              <tr class="ttu">
                <td colspan="2">Total</td>
                <td align="right">{{purchase.totalPrice | currency}}</td>
              </tr>
              <tr class="sup ttu p--0">
                <td colspan="3">
                  <b>Pagamentos</b>
                </td>
              </tr>
              <tr class="ttu">
                <td colspan="2">Voucher</td>
                <td align="right">{{purchase.totalPrice | currency}}</td>
              </tr>
              <tr class="ttu">
                <td colspan="2">Dinheiro</td>
                <td align="right">R$0,00</td>
              </tr>
              <tr class="ttu">
                <td colspan="2">Total pago</td>
                <td align="right">{{purchase.totalPrice | currency}}</td>
              </tr>
              <tr class="ttu">
                <td colspan="2">Troco</td>
                <td align="right">R$0,00</td>
              </tr>
              <tr class="sup">
                <td colspan="3" align="center">
                  <b>Pedido: {{purchase.shortId}}</b>
                </td>
              </tr>
              <tr class="sup">
                <td colspan="3" align="center">
                  https://cd-world.firebaseapp.com
                </td>
              </tr>
            </tfoot>
          </table>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['purchaseId', 'visibility'],
  data() {
    return {
      isVisible: this.visibility,
      isLoadingPurchase: true,
      purchase: null
    }
  },
  created() {
    this.$store.dispatch('fetchPurchase', this.purchaseId)
      .then(returnedPurchase => {
        this.purchase = returnedPurchase
        this.isLoadingPurchase = false
      })
      .catch(err => {
        console.log(err)
        this.isLoadingPurchase = false
      })
  },
  methods: {
    updateParentProp(isVisible) {
      this.$emit('update:visibility', false)
    },
    print() {
      console.log(window.print())
    }
  }
}
</script>

<style lang="less" scoped>
@color-gray: #BCBCBC;
.text {
	&-center { text-align: center; }
}
.ttu { text-transform: uppercase; }

.printer-ticket {
  margin: 0 auto;
	display: table !important;
	width: 100%;
	max-width: 400px;
	font-weight: light;
	line-height: 1.3em;
	@printer-padding-base: 10px;
	&, & * {
		font-family: Tahoma, Geneva, sans-serif;
		font-size: 10px;
	}

	th:nth-child(2),
	td:nth-child(2) {
		width: 50px;
	}

	th:nth-child(3) ,
	td:nth-child(3) {
		width: 90px; text-align: right;
	}

	th {
		font-weight: inherit;
		padding: @printer-padding-base 0;
		text-align: center;
		border-bottom: 1px dashed @color-gray;
	}
	tbody {
		tr:last-child td { padding-bottom: @printer-padding-base; }
	}
	tfoot {
		.sup td {
			padding: @printer-padding-base 0;
			border-top: 1px dashed @color-gray;
		}
		.sup.p--0 td { padding-bottom: 0; }
	}

	.title { font-size: 1.5em; padding: @printer-padding-base*1.5 0; }
	.top {
		td { padding-top: @printer-padding-base; }
	}
	.last td { padding-bottom: @printer-padding-base; }
}
.header {
  font-weight: bold;
}
.print {
  margin: 0 auto;
  display: block;
}
@media print
{
    .no-print, .no-print *
    {
        display: none !important;
    }
}
</style>
