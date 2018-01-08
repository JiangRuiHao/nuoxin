import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
const Home = resolve => require(['@/pages/Home/Home.vue'], resolve)
const Cake = resolve => require(['@/pages/Cake/Cake.vue'], resolve)
const Gift = resolve => require(['@/pages/Gift/Gift.vue'], resolve)
const Cart = resolve => require(['@/pages/Cart/Cart.vue'], resolve)
const Mine = resolve => require(['@/pages/Mine/Mine.vue'], resolve)
const Login = resolve => require(['@/pages/Login/Login.vue'], resolve)
const Account = resolve => require(['@/pages/Account/Account.vue'], resolve)
const About = resolve => require(['@/pages/About/About.vue'], resolve)
const KeFu = resolve => require(['@/pages/KeFu/KeFu.vue'], resolve)
const MyIndent = resolve => require(['@/pages/MyIndent/MyIndent.vue'], resolve)
const Bank = resolve => require(['@/pages/Bank/Bank.vue'], resolve)
const ProductParticulars = resolve => require(['@/pages/Product-particulars/Product-particulars.vue'], resolve)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/cake',
      name: 'cake',
      component: Cake
    },
    {
      path: '/gift',
      name: 'gift',
      component: Gift
    },
    {
      path: '/cart',
      name: 'name',
      component: Cart
    },
    {
      path: '/mine',
      name: 'mine',
      component: Mine
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/account',
      name: 'account',
      component: Account
    },
    {
      path: '/product-particulars/:id',
      name: 'product-particulars',
      component: ProductParticulars
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/kefu',
      name: 'kefu',
      component: KeFu
    },
    {
      path: '/myindent',
      name: 'myindent',
      component: MyIndent
    },
    {
      path: '/bank',
      name: 'bank',
      component: Bank
    }
  ]
})
