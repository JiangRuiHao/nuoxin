<template>
  <div id="app">
    <router-view/>
    <tab-bar v-show="tabBarBol"></tab-bar>
  </div>
</template>

<script>
import TabBar from '@/components/TabBar/TabBar'
export default {
  created () {
    // 初始化操作
    // 首页的bannar数据,
    this.$store.dispatch('getBanner')
    // 所有分类数据
    this.$store.dispatch('getClassifys')
    // 所有商品(不包含精品数据)
    this.$store.dispatch('getAllPro')
    // 推荐商品数据
    this.$store.dispatch('getRecommendPro')
    // 精品商品数据
    this.$store.dispatch('getBoutiquePro')
    // 礼品商品数据
    this.$store.dispatch('getGiftPro')
    // 获取定位城市数据
    this.$store.dispatch('getCitys')
  },
  name: 'app',
  components: {
    TabBar
  },
  computed: {
    tabBarBol () {
      return this.$store.state.tabBarBol
    }
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
#app, html, body {
  width: 100%;
  box-sizing: border-box;
  background: #fff;
}
</style>
