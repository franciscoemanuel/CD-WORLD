<template>
  <div class="menu-wrapper">
    <template v-for="item in items">

      <router-link :to="item.link" :key="item.title">
        <el-menu-item :index="item.link" class="submenu-title-noDropdown">
          <span>{{item.title}}</span>
          <i :class="item.icon">
              <el-badge :value="itemsOnCart" v-if="item.icon === 'el-icon-fa-shopping-cart'"></el-badge>
          </i>
        </el-menu-item>
      </router-link>

    </template>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    items: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    itemsOnCart() {
      const cart = this.$store.getters.cart
      return cart ? cart.albums.length : 0
    }
  }
}
</script>

<style>
.el-menu-item [class^=el-icon-] {
  text-align: unset;
  color: #f3f3f3;
}
</style>

