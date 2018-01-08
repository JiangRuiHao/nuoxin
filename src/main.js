// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// {自己添加的开始
// 引入store下的js文件
import store from './store'
// 引入通用的字体大小(随着屏幕大小而改变,以iPhone5字体大小为基础,注:iPhone5的字体大小为10px)
import './common/reset.js'
// 引入mint-ui部分模块及通用样式
import { Lazyload, MessageBox, Swipe, SwipeItem } from 'mint-ui'
import 'mint-ui/lib/style.css'
// 引入element-ui部分模块
import { Button, Icon } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入axios模块
import axios from 'axios'
// mint-ui使用
Vue.prototype.$http = axios

Vue.use(Lazyload)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.prototype.$msg = MessageBox

Vue.component(Button.name, Button)
Vue.use(Icon)

// 监听全局路由变化
router.beforeEach((to, from, next) => {
  if (to.path === '/' || to.path === '/cake' || to.path === '/gift' || to.path === '/cart' || to.path === '/mine') {
    store.state.tabBarBol = true
    // document.body.scrollTop = 0
    // document.documentElement.scrollTop = 0
  } else {
    store.state.tabBarBol = false
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }
  next()
})
// 自己添加的结束}

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // 自己添加的store
  store,
  template: '<App/>',
  components: { App }
})
