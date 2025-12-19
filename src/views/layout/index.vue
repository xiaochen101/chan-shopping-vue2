<template>
  <div>
    <!-- 二级路由出口 -->
    <router-view></router-view>
    <van-tabbar active-color="rgb(11,174,255)" inactive-color="#000"  v-model="active">
      <van-tabbar-item to="/home" icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/category" icon="apps-o">分类页</van-tabbar-item>
      <van-tabbar-item to="/cart" icon="shopping-cart-o">购物车</van-tabbar-item>
      <van-tabbar-item to="/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>

  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  data () {
    return {
      active: 0,
      routeTabMap: {
        '/home': 0,
        '/category': 1,
        '/cart': 2,
        '/user': 3
      }
    }
  },
  created () {
    this.active = this.routeTabMap[this.$route.path] || 0
  },
  watch: {
    '$route' (to) {
      this.active = this.routeTabMap[to.path] || 0
    }
  }
}
</script>

<style>

</style>
