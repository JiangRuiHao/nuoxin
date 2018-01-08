<template>
  <div class="account">
    <!-- 选择地址 -->
    <div class="chooseSite" @click="chooseSite()">
        <div class="no-site" v-show="!nowSite.id">请选择配送地址<span class="el-icon-edit"></span></div>
        <div class="have-site" v-show="nowSite.id">
            <p>{{nowSite.personName}} <span>{{nowSite.personPhone}}</span></p>
            <p>{{nowSite.province}} {{nowSite.cityName}} {{nowSite.conty}} {{nowSite.Address}} {{nowSite.doorplate}}</p>
        </div>
    </div>
    <!-- 新建地址 -->
    <div class="buildSiteDiv" v-show="SaveSiteBol">
        <div class="build_site_content">
            <span class="glyphicon glyphicon-user">收货人:</span>
            <input type="text" class="build_site_input" v-model="personName">
        </div>
        <div class="build_site_content">
            <span class="el-icon-mobile-phone">手机号:</span>
            <input type="text" class="build_site_input" v-model="personPhone">
        </div>
        <div class="build_site_content">
            <span class="el-icon-location-outline">省市县:</span>
            <select name="" id="" class="province" v-model="province">
                <option value="">请选择省</option>
                <option>{{county.province}}</option>
            </select>
            <select name="" id="" class="city" v-model="cityName">
                <option value="">请选择...</option>
                <option>{{county.city}}</option>
            </select>
            <select name="" id="" class="conty" v-model="conty">
                <option value="">请选择...</option>
                <option v-for="(item, index) in county.county" :key="index">{{item}}</option>
            </select>
        </div>
        <div class="build_site_content">
            <span class="span">详细地址:</span>
            <input type="text" class="build_site_input" v-model="Address">
        </div>
        <div class="build_site_content">
            <span class="span">门牌号:</span>
            <input type="text" class="build_site_input" placeholder="如:1栋101号" v-model="doorplate">
        </div>
        <div class="save_site" @click="saveSite()">保存</div>
    </div>
    <!-- 罗列已有地址 -->
    <div class="select_site" v-show="SiteBol">
        <div class="Site_title">
            <span class="site">请选择地址</span>
            <span class="off" @click="offSite()">x关闭</span>
        </div>
        <ul class="site_ul">
            <li @click.stop="UseSite(item)" v-for="(item, index) in sites" :key="index">
                <p class="xmdh">{{item.personName}} <span>{{item.personPhone}}</span></p>
                <p class="address">{{item.province}} {{item.cityName}} {{item.conty}}</p>
                <span class="site_check" :class="{select: item.select}"></span>
                <span class="el-icon-edit redact" @click.stop="editSite(item)">编辑</span>
            </li>
        </ul>
        <div class="build_site" @click="buildNewSite()">
            新增地址
        </div>
    </div>
    <div class="heide" v-show="SiteBol" @click.stop="offSite()"></div>
    <!-- 结算商品罗列 -->
    <div class="commodity" v-for="(item, index) in cartsSelectPro" :key="item.product_id">
        <img :src="item.imgs.big" width="30%">
        <span class="proname_1">{{item.proName}}</span>
        <span class="proEnglishName_1">{{item.proEName}}</span>
        <span class="proPrice_1">￥{{item.proPrice}}</span>
        <span class="proNum_1">x{{item.proNum}}</span>
    </div>
    <!-- 配送时间 -->
    <div class="deliveryTime">
        <span class="glyphicon glyphicon-time hours"></span>
        <span class="time">配送时间</span>
        <input type="datetime-local" class="nyr">
        <div class="select">
            <select name="" class="selectTime" @change="changeValue1()" v-model="res1">
                <option value="">请选择</option>
                <option v-for="(item, index) in Time1" :key="index">{{item}}</option>
            </select> -
            <select name="" class="selectTime selectTimeLast" @change="changeValue2()" v-model="res2">
                <option value="">请选择</option>
                <option v-for="(item, index) in Time2" :key="index">{{item}}</option>
            </select>
        </div>
    </div>
    <!-- 优惠券等 -->
    <div class="coupon">
        <div class="coupon1" @click="useCoupon1()">
            <span class="glyphicon glyphicon-tags juan"></span>
            <span>优惠券</span>
            <span class="el-icon-arrow-right morejuan"></span>
            <span class="no-use">未使用</span>
        </div>
        <div class="coupon1" @click="useCoupon2()">
            <span class="glyphicon glyphicon-tags juan"></span>
            <span class="juan2">蛋糕券/月饼兑换券&nbsp;&nbsp;<span class="hint">不可与优惠券同时使用</span></span>
            <span class="el-icon-arrow-right morejuan"></span>
            <span class="no-use">未使用</span>
        </div>
    </div>
    <!-- 发票 -->
    <div class="bill">
        <span class="el-icon-tickets fapiao"></span>
        <span>普通发票</span>
        <span class="fapiao2" :class="{selectFapiao: FaPiaoBol}" @click="bill()"></span>
    </div>
    <div class="FaPiaoDiv" v-show="FaPiaoBol">
        <span class="proposer">
            发票申请:
            <span class="personage" :class="{BgWhite: !CompanyInputBol}" @click="CompanyInputBol = false">个人</span>
            <span class="company" :class="{BgWhite: CompanyInputBol}" @click="CompanyInputBol = true">单位</span>
        </span>
        <div class="CompanyInput" v-show="CompanyInputBol">
            <input type="text" placeholder="请填写单位名称" class="write_content">
            <input type="text" placeholder="纳税人识别号" class="write_content">
            <p>为了您能顺利报销,请准确填写纳税人识别号</p>
        </div>
        <span class="FaPiaoContent">
            发票内容:
            <span class="Content">蛋糕</span>
        </span>
        <div class="saveFaPiao" @click="saveInvoice()">保存</div>
    </div>
    <!-- 支付方式 -->
    <div class="payment">
        <div class="choosePayment">
            <span class="glyphicon glyphicon-erase zf"></span>
            <span>选择支付方式</span>
        </div>
        <div class="choosePayment">
            <span class="zfb zf"></span>
            <span>支付宝</span>
            <span class="choose" :class="{select: payIndex === 0}" @click="payIndex = 0"></span>
        </div>
        <div class="choosePayment">
            <span class="yl zf"></span>
            <span>银联支付</span>
            <span class="choose" :class="{select: payIndex === 1}" @click="payIndex = 1"></span>
        </div>
        <div class="choosePayment">
            <span class="jhlzf zf"></span>
            <span>建行龙支付</span>
            <span class="choose" :class="{select: payIndex === 2}" @click="payIndex = 2"></span>
        </div>
    </div>
    <!-- 总价详情 -->
    <div class="PayDetail">
        <p class="detail">金额明细</p>
        <div class="proMoney">
            <span>商品金额</span>
            <span class="money">¥{{total.toFixed(2)}}</span>
        </div>
        <div class="proMoney">
            <span>运费</span>
            <span class="money">¥0.00</span>
        </div>
        <div class="proMoney">
            <span>优惠</span>
            <span class="money">¥0.00</span>
        </div>
        <div class="actualPay">
            <div class="actualMoney">
                <span>实付 ¥{{total.toFixed(2)}}</span>
            </div>
        </div>
    </div>
    <!-- 提交订单 -->
    <div class="submit" @click="submit()">
        提交订单
    </div>
    <!-- 成功提交 -->
    <div class="successSubmit" v-show="successBol">
        <div><img src="./images/success.jpg"></div>
        <p>恭喜您,订单提交成功</p>
        <p><span class="time">{{num}}</span> 秒返回首页</p>
    </div>
    <div class="successBg" v-show="successBol"></div>
    <!-- 优惠卷 -->
    <div class="coupons_div" :class="{height: ConponsBol}">
        <p>优惠券<span @click="yes()">确定</span></p>
        <div class="no_use">
            不使用优惠券
            <span></span>
        </div>
        <div class="useNum">
            <input type="text" class="conpons_num" placeholder="输入已有的优惠券">
            <span class="use_btn">使用</span>
        </div>
        <div class="coupons">
            <span><i>5</i>折</span>
            <span id="juan">
                蛋糕5折优惠卷
                <p>2017-11-01至2017-11-30</p>
            </span>
        </div>
    </div>
    <div class="coupons_div_bg" v-show="ConponsBol"></div>
    <!-- ConponsBol -->
    <!-- 支付界面 -->
    <div class="pay" v-show="0">
      <div class="zhifu">
          <span class="el-icon-close"></span>
          支付
      </div>
      <div class="money">
          ¥:
          <input type="number" class="Paymoney">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created () {
    for (let i = 0; i < this.citys.length; i++) {
      if (this.citys[i].city === this.$store.state.glyphicon) {
        this.county = this.citys[i]
        break
      }
    }
    // console.log(this.county)
  },
  data () {
    return {
      // 控制支付方式的变量
      payIndex: 0,
      // 控制发票显示隐藏的变量
      FaPiaoBol: false,
      // 控制发票显示时切换发票申请人的变量,兼控制单位申请时显示隐藏单位的输入框
      CompanyInputBol: false,
      Time1: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'],
      Time2: ['11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'],
      res1: '',
      res2: '',
      num: 3,
      successBol: false,
      // 控制地址的变量
      SiteBol: false,
      // 控制新增地址(编辑地址)Div显示隐藏
      SaveSiteBol: false,
      // 控制优惠卷
      ConponsBol: false,
      // 控制对象变量(初始化)
      personName: '',
      personPhone: '',
      province: '',
      cityName: '',
      conty: '',
      Address: '',
      doorplate: '',
      county: []
    }
  },
  computed: {
    // 购物车勾选的商品数据
    cartsSelectPro () {
      return this.$store.state.cartsSelectPro
    },
    // 购物车中被勾选的商品总价
    total () {
      return this.$store.getters.total
    },
    citys () {
      return this.$store.state.citys
    },
    sites () {
      return this.$store.state.sites
    },
    userInfo () {
      return this.$store.state.userInfo
    },
    nowSite () {
      return this.$store.state.nowSite
    }
  },
  methods: {
    // 发票事件
    bill () {
      this.FaPiaoBol = !this.FaPiaoBol
      this.CompanyInputBol = false
    },
    // 提交订单事件
    submit () {
      let index1 = this.Time1.indexOf(this.res1)
      let index2 = this.Time2.indexOf(this.res2)
      if (index1 >= 0 && index2 >= 0 && this.nowSite.id) {
        this.successBol = true
        if (this.successBol) {
          let timer
          timer = setInterval(() => {
            this.num--
            console.log(this.num)
            if (this.num <= 0) {
              clearInterval(timer)
              this.$router.push('/')
              this.successBol = false
              setTimeout(() => {
                this.num = 3
              }, 300)
            }
          }, 1000)
        }
        for (let i = 0; i < this.cartsSelectPro.length; i++) {
          this.$store.dispatch('delPro', this.cartsSelectPro[i])
        }
      } else {
        this.$msg('提示', '请检查地址和时间信息')
      }
    },
    // 配送下拉框1事件(联动)
    changeValue1 () {
      let index1 = this.Time1.indexOf(this.res1)
      let index2 = this.Time2.indexOf(this.res2)
      if (index1 > index2) {
        this.res2 = this.Time2[index1]
      }
    },
    // 配送下拉框2事件(联动)
    changeValue2 () {
      let index1 = this.Time1.indexOf(this.res1)
      let index2 = this.Time2.indexOf(this.res2)
      if (index1 > index2) {
        this.res1 = this.Time1[index2]
      }
    },
    // 选择地址事件
    chooseSite () {
      this.SiteBol = true
    },
    // 点击关闭地址列表事件
    offSite () {
      this.SiteBol = false
    },
    // 新建地址事件
    buildNewSite () {
      this.SiteBol = false
      this.SaveSiteBol = true
    },
    // 使用地址事件
    UseSite (item) {
      this.$store.dispatch('changeUseSite', item)
      this.SiteBol = false
    },
    // 编辑地址
    editSite (item) {
        //   console.log(item)
      console.log('编辑地址')
      this.SiteBol = false
        //   this.SiteBol = false
        //   this.SaveSiteBol = true
        //   this.personName = item.personName
        //   this.personPhone = item.personPhone
        //   this.province = item.province
        //   this.cityName = item.cityName
        //   this.conty = item.conty
        //   this.Address = item.Address
        //   this.doorplate = item.doorplate
    },
    // 保存地址
    saveSite () {
        //   console.log('保存地址')
      let reg = /^1[3578]\d{9}$/
      if (!reg.test(this.personPhone) || this.personName === '' || this.province === '' || this.cityName === '' || this.conty === '' || this.Address === '' || this.doorplate === '') {
        this.$msg('提示', '地址信息有误')
      } else {
        // console.log('保存地址')
        // console.log(this.personName, this.personPhone, this.province, this.cityName, this.conty, this.Address, this.doorplate)
        let userInfo = this.$store.state.userInfo
        let siteObj = {
          userId: userInfo.id,
          personName: this.personName,
          personPhone: this.personPhone,
          province: this.province,
          cityName: this.cityName,
          conty: this.conty,
          Address: this.Address,
          doorplate: this.doorplate,
          select: false
        }
        this.$store.dispatch('saveSite', siteObj)
          .then(res => {
            this.$msg('提示', '地址保存成功')
          })
        this.SaveSiteBol = false
        this.personName = ''
        this.personPhone = ''
        this.province = ''
        this.cityName = ''
        this.conty = ''
        this.Address = ''
        this.doorplate = ''
      }
    },
    // 保存发票事件
    saveInvoice () {
      console.log('保存发票')
      this.FaPiaoBol = false
    },
    // 优惠券事件
    useCoupon1 () {
      console.log('使用优惠券')
      this.ConponsBol = !this.ConponsBol
    },
    // 蛋糕卷事件
    useCoupon2 () {
      console.log('使用蛋糕卷(暂时使用优惠券的div)')
      this.ConponsBol = !this.ConponsBol
    },
    yes () {
      this.ConponsBol = !this.ConponsBol
    }
  }
}
</script>

<style lang="less" scoped>
.account {
    width: 100%;
    .chooseSite {
        width: 100%;
        height: 6rem;
        font-size: 1rem;
        background: #f9f9f9;
        .no-site {
            line-height: 6rem;
            text-align: center;
        }
        .have-site {
            color:#696969;
            padding-top: 0.1px;
            p {
                margin: 0;
                text-indent: 1.5rem;
            }
            p:first-child {
                margin: 1.1rem 0 1rem 0;
            }
        }
    }
    .select_site {
        width: 90%;
        background: #fff;
        margin-left: 5%;
        position: fixed;
        top: 5%;
        z-index: 100;
        .Site_title {
            width: 100%;
            height: 3rem;
            line-height: 3rem;
            font-size: 1rem;
            border-bottom: 1px solid #ac8e6a;
            .site {
                float: left;
                text-indent: 1rem;
            }
            .off {
                width: 20%;
                text-align: center;
                float: right;
                font-size: 1rem;
                color: #a38d6b;
            }
        }
        .site_ul {
            width: 90%;
            margin: 5% 0 0 5%;
            padding-top: 0.1px;
            li {
                width: 100%;
                font-size: 1rem;
                color: #696969;
                line-height: 1.5rem;
                list-style: none;
                text-indent: 1rem;
                border-bottom: 1px solid #e0dcd1;
                position: relative;
                p {
                    margin: 0;
                    margin-bottom: 1rem;
                }
                .xmdh {
                    margin-top: 1rem;
                }
                .site_check {
                    display: block;
                    width: 1.2rem;
                    height: 1.2rem;
                    position: absolute;
                    top: 20%;
                    right: 5%;
                    border-radius: 50%;
                    border: 1px solid #9c9c9c;
                }
                .select {
                    background: url('../Cart/images/checkbox-selectd.png');
                    background-size: contain;
                    border: none;
                }
                .redact {
                    position: absolute;
                    bottom: 15%;
                    right: 5%;
                }
            }
        }
        .build_site {
            width: 60%;
            height: 3rem;
            margin:1rem 0 1rem 20%;
            line-height: 3rem;
            text-align: center;
            font-size: 1rem;
            color: #fff;
            background: #ac8e6a;
        }
    }
    .heide {
        width: 100%;
        height: 100%;
        position: fixed;
        background: #000;
        z-index: 40;
        top: 0;
        opacity: 0.8;
    }
    .commodity {
        width: 100%;
        height: 100%;
        margin-top: 0.5rem;
        position: relative;
        img {
            margin: 0.5rem;
        }
        span {
            font-size: 1rem;
            position: absolute;
        }
        .proname_1 {
            top: 0.5rem;
        }
        .proEnglishName_1 {
            top: 30%;
        }
        .proPrice_1 {
            bottom: 0.5rem;
            font-size: 1.1rem;
        }
        .proNum_1 {
            bottom: 0.5rem;
            right: 1rem;
            font-size: 1.1rem;
        }
    }
    .deliveryTime {
        width: 100%;
        height: 3rem;
        background: #f9f9f9;
        margin-top: 0.5rem;
        line-height: 3rem;
        font-size: 1rem;
        .hours {
            color: #a38d6b;
            text-indent: 1rem;
        }
        .nyr {
            width: 25%;
            height: 3rem;
            border: none;
            margin-left: 2rem;
            outline: none;
            background: #f9f9f9;
        }
        .select {
            width: 40%;
            float: right;
            height: 100%;
            display: flex;
            justify-content: center;
            .selectTime {
                border: none;
                outline: none;
                margin-right: 1rem;
                background: #f9f9f9;
                font-size: 1rem;
                color: #555555;
            }
            .selectTimeLast {
                margin-left: 1rem;
            }
        }
    }
    .coupon {
        width: 100%;
        height: 5rem;
        margin-top: 0.5rem;
        .coupon1 {
            width: 100%;
            height: 2.5rem;
            span {
                font-size: 1rem;
                line-height: 2.5rem;
                color:#696969;
            }
            .juan {
                text-indent: 1rem;
                color: #a38d6b;
            }
            .morejuan {
                float: right;
                margin-right: 1rem;
            }
            .no-use {
                float: right;
                margin-right: 0.5rem;
            }
            .juan2 {
                .hint {
                    color: #bbbbbb;
                }
            }
        }
    }
    .bill {
        width: 100%;
        height: 3rem;
        background: #f9f9f9;
        margin-top: 0.5rem;
        line-height: 3rem;
        font-size: 1rem;
        display: flex;
        align-items: center;
        position: relative;
        .fapiao {
            text-indent: 1rem;
            color: #a38d6b;
        }
        .fapiao2 {
            width: 1.2rem;
            height: 1.2rem;
            border: 1px solid #9c9c9c;
            position: absolute;
            right: 1rem;
            border-radius: 50%;
        }
        .selectFapiao {
            background: url('../Cart/images/checkbox-selectd.png');
            background-size: 100% 100%;
            border: none;
        }
    }
    .FaPiaoDiv {
        width: 100%;
        background: #f9f9f9;
        .proposer {
            font-size: 1rem;
            padding: 0.5rem 0 0.5rem 1rem;
            display: block;
            margin-bottom: 0.5rem;
            .personage, .company {
                margin: 0 0.5rem;
                padding: 0.4rem;
                color: #afafaf;
            }
        }
        .BgWhite {
            background: #fff;
        }
        .write_content {
            width: 90%;
            height: 3rem;
            font-size: 1rem;
            border: none;
            margin: 0.5rem 0 0.3rem 5%;
            background: #f9f9f9;
            outline: none;
            border-bottom: 1px solid #e1dbcc;
        }
        p {
            font-size: 0.9rem;
            color: #df6119;
            text-indent: 1rem;
        }
        .FaPiaoContent {
            font-size: 1rem;
            padding: 0.5rem 0 0.5rem 1rem;
            .Content {
                margin: 0 0.5rem;
                padding: 0.4rem;
                color: #afafaf;
                background: #fff;
            }
        }
        .saveFaPiao {
            width: 30%;
            height: 3rem;
            background: #a6906c;
            font-size: 1rem;
            text-align: center;
            line-height: 3rem;
            color: #fff;
            margin: 1rem 0 0 35%;
        }
    }
    .payment {
        width: 100%;
        margin-top: 0.5rem;
        font-size: 1rem;
        color: #696969;
        .choosePayment {
            width: 100%;
            height: 3rem;
            line-height: 3rem;
            display: flex;
            align-items: center;
            position: relative;
            margin-top: 0.3rem;            
        }
        .zf {
            color: #a38d6b;
            text-indent: 1rem;
            margin-right: 0.3rem;
        }
        .choose {
            width: 1.2rem;
            height: 1.2rem;
            border-radius: 50%;
            border: 1px solid #9c9c9c;
            position: absolute;
            right: 1rem;
            box-sizing: border-box;
        }
        .select {
            background: url('../Cart/images/checkbox-selectd.png');
            background-size: contain;
            border: none;
        }
        .zfb, .yl, .jhlzf {
            width: 2.2rem;
            height: 2.2rem;
            display: inline;
            background: url('./images/zfb.jpg');
            background-size: contain;
            margin-left: 1rem;
        }
        .yl {
            background: url('./images/yl.jpg') no-repeat;
            background-size: 100% 100%;
        }
        .jhlzf {
            background: url('./images/jhlzf.jpg');
            background-size: contain;
        }
    }
    .PayDetail {
        width: 100%;
        margin-top: 0.5rem;
        font-size: 1.1rem;
        padding-top: 0.1px;
        border-top: 1px solid #a38d6b;
        p {
            margin-top: 1.5rem;
            text-align: center;  
            color: #a38d6b;       
        }
        .proMoney {
            width: 100%;
            height: 3rem;
            line-height: 3rem;
            text-indent: 1rem;
            color: #696969;
            .money {
                float: right;
                margin-right: 1rem;
                font-size: 1.2rem;
            }
        }
        .actualPay {
            width: 100%;
            height: 3rem;
            line-height: 3rem;
            .actualMoney {
                width: 40%;
                height: 100%;
                float: right;
                margin-right: 1rem;
                text-align: right;
                span {
                    color: #ff4001;
                }
            }
        }
    }
    .submit {
        width: 60%;
        height: 3.5rem;
        margin: 1.5rem 0;
        line-height: 3.5rem;
        text-align: center;
        background: #ac8e6a;
        font-size: 1rem;
        color: #fff;
        margin-left: 20%;
    }
    .buildSiteDiv {
        width: 100%;
        border-bottom: 1px solid #a38d6b;
        .build_site_content {
            width: 90%;
            margin-left: 5%;
            height: 3rem;
            line-height: 3rem;
            border-bottom: 1px solid #e0dcd1;
            margin-bottom: 0.5rem;     
            .build_site_input {
                width: 83%;
                height: 100%;
                float: right;
                border: none;
                outline: none;
                font-size: 1rem;
            }
            span {
                font-size: 1rem;
                color: #a6906c;
            }
            .span {
                margin-left: 0.3rem;
            }
            .province, .city, .conty {
                font-size: 1rem;
                outline: none;
                border: none;
                margin-left: 1rem;
            }
            .city, .conty {
                margin-left: 3%;
            }
        }
        .save_site {
            width: 40%;
            height: 3rem;
            font-size: 1rem;
            background: #ac8e6a;
            text-align: center;
            line-height: 3rem;
            color: #fff;
            margin: 0 0 1rem 30%;
        }
    }
    .successSubmit {
        width: 90%;
        background: #fff;
        position: fixed;
        z-index: 10;
        top: 30%;
        left: 5%;
        div{
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 1rem;
            img {
                width: 5rem;
            }
        }
        p {
            margin-top: 1rem;
            font-size: 1.2rem;
            color: #000;
            text-align: center;
            .time {
                font-size: 2rem;
                color: #f00;
            }
        }
    }
    .successBg, .coupons_div_bg {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        background: #000;
        opacity: 0.5;
    }
    .coupons_div {
        width: 100%;
        // height: 20rem;
        height: 0;
        position: fixed;
        z-index: 10;
        background: #fff;
        bottom: 0;
        transition: all 0.3s;
        p {
            text-indent: 2.5rem;
            height: 4rem;
            margin: 0;
            line-height: 4rem;
            font-size: 1rem;
            border-bottom: 1px solid #a38d6b;
            span {
                text-indent: 0;
                float: right;
                width: 15%;
                height: 100%;
                text-align: center;
                color: #a38d6b;
            }
        }
        .no_use {
            width: 90%;
            margin-left: 5%;
            border-bottom: 1px solid #ac8e6a;
            height: 4rem;
            line-height: 4rem;
            text-indent: 1rem;
            font-size: 1rem;
            span {
                width: 1.2rem;
                height: 1.2rem;
                float: right;
                border: 1px solid #9c9c9c;
                border-radius: 50%;
                margin-top: 5%;
            }
        }
        .useNum {
            width: 80%;
            height: 5rem;
            margin-left: 10%;
            .conpons_num {
                width: 70%;
                height: 3rem;
                margin-top: 2rem;
                border: none;
                border-bottom: 1px solid #a38d6b;
                outline: none;
                font-size: 1rem;
            }
            .use_btn {
                float: right;
                margin-top: 2rem;
                width: 30%;
                height: 3rem;
                line-height: 3rem;
                text-align: center;
                color: #fff;
                background: #ccc;
                border-radius: 3px;
                font-size: 1rem;
            }
        }
        .coupons {
            width: 80%;
            height: 5rem;
            margin: 5% 0 5% 10%;
            span {
                float: left;
                width: 30%;
                height: 100%;
                line-height: 5rem;
                text-align: center;
                color: #f00;
                background: #f1f1f1;
                font-size: 1.5rem;
                border-radius: 0 7px 7px 0;
                i {
                    font-size: 2rem;
                }
            }
            #juan {
                width: 70%;
                height: 100%;
                float: right;
                border-radius: 7px 0 0 7px;
                font-size: 1rem;
                text-indent: 1rem;
                text-align: left;
                line-height: 3rem;
                padding-top: 0.5rem;
                color: #444;
                p {
                    margin: 0;
                    line-height: 0;
                    text-indent: 1rem;
                    text-align: left;
                    color: #939393;
                    border: none;
                }
            }
        }
    }
    .pay {
        width: 90%;
        height: 20rem;
        margin-left: 5%;
        background: #fff;
        position: fixed;
        top: 20%;
        .zhifu {
            height: 3.5rem;
            width: 100%;
            line-height: 3.5rem;
            border: 1px solid #a38d6b;
            position: relative;
            text-align: center;
            font-size: 1.1rem;
            color: #f00;
            span {
                position: absolute;
                left: 0;
                top: 0;
                display: inline-block;
                height: 100%;
                width: 10%;
                line-height: 3.5rem;
                text-align: center;
                color: #000;
            }
        }
        .money {
            font-size: 2rem;
            text-indent: 2rem;
        }
        .Paymoney {
            width: 80%;
            height: 2.5rem;
            line-height: 2.5rem;
            border: 1px solid #424242;
            font-size: 1.1rem;
            margin: 3rem 0 1rem 0;
        }
    }
}
.height {
    height: 22rem !important;
}
</style>

