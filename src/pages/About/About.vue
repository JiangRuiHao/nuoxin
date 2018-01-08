<template>
  <div class="about">
    <header-white2 title='关于我们' v-show="aboutBol"></header-white2>
    <header-white2 title='关于发票' v-show="!aboutBol"></header-white2>
    <div class="we" v-show="aboutBol">
        <img src="http://wx01.lecake.com/shop/lecake/theme/xth2/tpls/wechat/images_new/customer/header.jpg" alt="" width="100%">
        <h2>体验诺心LE CAKE之旅</h2>
        <p>倘若，没有走访世界各个都市的奇幻旅程，也许今日就无法将如此美妙的蛋糕时刻与更多的人分享，更不会找到它的名字"诺心LE CAKE"。诺心LE CAKE的创始人在游历各地的旅程中，品尝了独特创意的美食。而这行程中的点滴回忆，使她迸发出了烘培臻品蛋糕的灵感。</p>
        <p>于是，为了找寻黄金比例蛋糕配方的她，寻遍了世界各地的上等食材，潜心研究终将诺心LE CAKE完美呈现。也许，是法国巴黎浪漫午后，街边咖啡馆一抹淡淡的幽香；是美国纽约的精彩夜晚，顶级餐厅里甜点的香软绵密；是日本东京的可爱点心铺里，让人爱不释手的精致糕点。又或是香港好味大排档里浓香的丝滑奶茶。就是这些特色滋味，被诺心LE CAKE的创始人统统打包带回。为了将这些欢乐的蛋糕滋味分享给更多的人体验，我们将各国的传统蛋糕工艺与上等原料结合，使用适合的黄金比度烘焙出真正的精致蛋糕。诺心LE CAKE就这样优雅的出现在国人的生活中。</p>
        <p>诺心LE CAKE倡导用心烘培，秉持品质用心、服务用心、创意用心的理念，每个季节、假日，都会设计不同的产品及包装，用心将诺心LE CAKE打造成您眼中的精致礼物首选之一。我们尊崇欧洲黄金比例配方，烘焙浓情备至的甜蜜礼物，爱与欢乐、爱与分享，由我们为您与家人温馨送上。</p>
    </div>
    <div class="FB" v-show="!aboutBol">
        <h1>电子发票常见问题解答</h1>
        <p class="wenti">1.什么是电子发票？</p>
        <p class="answer">电子发票就是电子形式的发票，其发票代码、开票机构、金额等信息以及打印后版式均与纸质发票相同。电子发票在保管、查询、调阅时更加便捷。</p>
        <p class="wenti">2.我是否可以使用电子发票报销？</p>
        <p class="answer">电子发票是税务局认可的有效付款凭证，支持企业报销，请先确认所属公司是否支持电子发票报销</p>
        <p class="wenti">3.我可否定义电子发票的开票内容，如购买商品选择餐饮消费？</p>
        <p class="answer">很抱歉，开票内容默认为蛋糕或食品，不允许修改。</p>
        <p class="wenti">4.开票金额就是订单金额吗？</p>
        <p class="answer">所有商品仅按顾客实际支付现金金额开具发票，但不包括蛋糕卡、优惠券、储值卡、积分等方式支付的金额部分。</p>
        <p class="wenti">5.多个订单合并开电子发票是否支持？</p>
        <p class="answer">很抱歉，暂时无法满足您的需求</p>
        <p class="wenti">6.我的电子发票抬头写错了，需要重开发票如何操作？</p>
        <p class="answer">很抱歉，已开具的电子发票不支持重开发票</p>
        <p class="wenti">7.开具电子发票后是否可以换开纸质发票？</p>
        <p class="answer">很抱歉，已开具的电子发票不可以换纸质发票</p>
        <p class="wenti">8.顾客下单后，什么时间能获得电子发票？</p>
        <p class="answer">一般在整单签收后0-2个工作日即可获得电子发票</p>
        <p class="wenti">9.已经收到的电子发票，请问还可以修改发票内容吗？</p>
        <p class="answer">很抱歉，已收到的电子发票是不能再修改发票</p>
        <p class="wenti">10.顾客在下单时选择电子发票，在未开具前，顾客能否修改发票信息？</p>
        <p class="answer">很抱歉，一旦提交电子发票信息后就不能修改任何内容。</p>
        <p class="red">友情提醒：提交发票时请确认您的发票信息</p>
    </div>
  </div>
</template>

<script>
import HeaderWhite2 from '@/components/Header-white2/Header-white2'
export default {
  created () {
    this.headTitle = '关于我们'
  },
  data () {
    return {
      headTitle: ''
    }
  },
  components: {
    HeaderWhite2
  },
  computed: {
    aboutBol () {
      return this.$store.state.aboutBol
    }
  }
}
</script>

<style lang="less" scoped>
.about {
    width: 100%;
    height: 100%;
    margin: 3.5rem 0 1rem 0;
    h2 {
        font-weight: bold;
        margin: 10px 0;
        font-size: 1rem;
        text-indent: 1.2rem;
    }
    p {
        padding:0 1.2rem;
        font-size: 1rem;
        margin: 0 0 0.5rem 0;
        line-height: 1.7rem;
    }

    h1 {
        text-align: center;
        line-height: 4rem;
        font-size: 1.2rem;
        margin: 0;
    }
    .wenti {
        font-weight: bold;
    }
    .answer {
        margin-bottom: 1rem;
    }
    .red {
        color: #ff4001;
    }
}
</style>

