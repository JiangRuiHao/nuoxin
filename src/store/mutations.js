export default {
  GET_CITYS (state, data) {
    state.citys = data
  },
  CHANGE_GLYPHICON (state, item) {
    state.glyphicon = item.city
  },
  GET_BANNER (state, data) {
    state.banner = data
    // console.log('首页轮播图数据')
    // console.log(state.banner)
  },
  GET_CLASSIFYS (state, data) {
    state.classifys = data
    // console.log(state.classifys)
  },
  GET_ALLPRO (state, data) {
    let NewAllPro = []
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].products.length; j++) {
        NewAllPro.push(data[i].products[j])
      }
    }
    state.allPro = NewAllPro
    state.cakeGiftPro = NewAllPro
    for (let j = 0; j < state.giftPro.length; j++) {
      state.cakeGiftPro.push(state.giftPro[j])
    }
  },
  GET_RECOMMENDPRO (state, data) {
    let NewRecommendPro = []
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].products.length; j++) {
        NewRecommendPro.push(data[i].products[0])
        break
      }
    }
    state.recommendPro = NewRecommendPro
    // console.log(state.recommendPro)
  },
  GET_BOUTIQUEPRO (state, data) {
    state.boutiquePro = data
    // console.log(state.boutiquePro)
  },
  GET_GIFTPRO (state, data) {
    state.giftPro = data
    // console.log(state.giftPro)
  },
  CHANGE_SCREENING_BOL (state) {
    state.ScreeningBol = !state.ScreeningBol
  },
  ADD_CART (state, data) {
    state.carts.push(data)
    state.cartsShowBol = true
  },
  NO_USER_ADD (state, item) {
    let carts = state.carts
    let Bol = true
    for (let i = 0; i < carts.length; i++) {
      if (carts[i].product_id === item.product_id) {
        console.log('找到商品,加一')
        carts[i].proNum++
        if (carts[i].proNum >= 1) {
          state.carts[i].proDelBol = false
        }
        Bol = false
        break
      }
    }
    if (Bol) {
      state.carts.push(item)
      state.cartsShowBol = true
    }
  },
  SUB_PRO (state, data) {
    for (let i = 0; i < state.carts.length; i++) {
      if (state.carts[i].product_id === data.product_id) {
        state.carts[i].proNum--
        if (state.carts[i].proNum <= 1) {
          state.carts[i].proDelBol = true
        }
        break
      }
    }
  },
  DEL_PRO (state, data) {
    // console.log(state.carts)
    for (let i = 0; i < state.carts.length; i++) {
      if (state.carts[i].product_id === data.product_id) {
        state.carts.splice(i, 1)
        break
      }
    }
    // console.log(state.carts)
    if (state.carts.length === 0) {
      state.cartsShowBol = false
    }
  },
  SAVE_USERINFO (state, data) {
    state.userInfo = data
  },
  SAVE_CARTS (state, data) {
    // console.log('登陆后的carts')
    // console.log(data)
    state.cartsShowBol = false
    state.carts = data
    if (state.carts.length > 0) {
      state.cartsShowBol = true
    } else {
      state.cartsShowBol = false
    }
    for (let i = 0; i < state.carts.length; i++) {
      if (state.carts[i].proNum > 1) {
        state.carts[i].proDelBol = false
      }
    }
  },
  UPDATE_CART (state, data) {
    // console.log(data.id)
    for (let i = 0; i < state.carts.length; i++) {
      if (state.carts[i].id === data.id) {
        state.carts[i].proNum++
        if (state.carts[i].proNum > 1) {
          state.carts[i].proDelBol = false
        }
        break
      }
    }
  },
  SWITCH_SELECT (state, data) {
    state.carts[state.carts.indexOf(data)].selected =
    !state.carts[state.carts.indexOf(data)].selected
  },
  ALL_SELECTED (state) {
    let carts = state.carts
    let Bol = false
    for (let i = 0; i < carts.length; i++) {
      if (!carts[i].selected) {
        Bol = true
      }
    }
    if (Bol) {
      for (let j = 0; j < carts.length; j++) {
        carts[j].selected = true
      }
    } else {
      for (let k = 0; k < carts.length; k++) {
        carts[k].selected = false
      }
    }
  },
  GET_CARTS_SELECT_PRO (state) {
    let arr = []
    for (let i = 0; i < state.carts.length; i++) {
      if (state.carts[i].selected) {
        arr.push(state.carts[i])
      }
    }
    state.cartsSelectPro = arr
    // state.
    // console.log(state.cartsSelectPro)
  },
  SAVE_SITES (state, data) {
    state.sites = data
  },
  SAVE_SITE (state, obj) {
    for (let i = 0; i < state.sites.length; i++) {
      state.sites[i].select = false
    }
    state.sites.push(obj)
    state.nowSite = obj
    // console.log(state.sites)
    if (state.nowSite.id) {
      for (let j = 0; j < state.sites.length; j++) {
        if (state.nowSite.id === state.sites[j].id) {
          state.sites[j].select = true
          break
        }
      }
    }
  },
  CHANGE_USE_SITE (state, obj) {
    for (let i = 0; i < state.sites.length; i++) {
      state.sites[i].select = false
    }
    obj.select = true
    state.nowSite = obj
  },
  CHANGE_ABOUT_BOL (state, Bol) {
    state.aboutBol = Bol
  }
}
