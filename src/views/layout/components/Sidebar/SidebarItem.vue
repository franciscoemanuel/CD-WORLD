<template>
  <div class="menu-wrapper">
    <template v-for="item in items">

      <router-link :to="item.link" :key="item.title">
        <el-menu-item :index="item.link" class="submenu-title-noDropdown">
          <i :class="item.icon"></i>
          <span>{{item.title}}</span>
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
  }
}
</script>

<style>
.el-menu-item [class^=el-icon-] {
  text-align: unset;
  color: #f3f3f3;
}
</style>

