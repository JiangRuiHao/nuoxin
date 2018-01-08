import http from 'axios'
import api from '@/api'
export default {
  getCitys ({commit}) {
    let url = api.host + 'citys'
    http.get(url)
      .then(res => {
        commit('GET_CITYS', res.data)
      })
  },
  changeGlyphicon ({commit}, item) {
    commit('CHANGE_GLYPHICON', item)
  },
  // 获取首页的banner轮播图数据
  getBanner ({commit}) {
    let bannerUrl = api.host + 'banner'
    // console.log(bannerUrl)
    http.get(bannerUrl)
      .then(res => {
        commit('GET_BANNER', res.data)
      })
  },
  // 获取所有的分类
  getClassifys ({commit}) {
    let classifysUrl = api.host + 'classifys'
    http.get(classifysUrl)
      .then(res => {
        commit('GET_CLASSIFYS', res.data)
      })
  },
  // 获取所有商品数据
  getAllPro ({commit}) {
    let allProUrl = api.host + 'classifys'
    http.get(allProUrl)
      .then(res => {
        commit('GET_ALLPRO', res.data)
      })
  },
  // 获取推荐商品数据
  getRecommendPro ({commit}) {
    let allProUrl = api.host + 'classifys'
    http.get(allProUrl)
      .then(res => {
        commit('GET_RECOMMENDPRO', res.data)
      })
  },
  // 获取精品商品数据
  getBoutiquePro ({commit}) {
    let boutiqueProUrl = api.host + 'BoutiquePro'
    http.get(boutiqueProUrl)
      .then(res => {
        commit('GET_BOUTIQUEPRO', res.data)
      })
  },
  // 获取礼品商品数据
  getGiftPro ({commit}) {
    let giftProUrl = api.host + 'giftPro'
    http.get(giftProUrl)
      .then(res => {
        commit('GET_GIFTPRO', res.data)
      })
  },
  // 更改筛选页的值ScreeningBol
  changeScreeningBol ({commit}) {
    commit('CHANGE_SCREENING_BOL')
  },
  // 注册/登录
  login ({commit}, phone) {
    let url = api.host + 'users?phone=' + phone
    console.log(url)
    return http.get(url)
      .then(res => {
        // console.log(res.data)
        if (res.data.length > 0) {
          let data = res.data[0]
          // console.log(res.data)
          commit('SAVE_USERINFO', data)
          // 获取该用户的地址信息
          let getSiteUrl = api.host + 'users/' + data.id + '/sites'
          // console.log(getSiteUrl)
          http.get(getSiteUrl)
            .then(res => {
              commit('SAVE_SITES', res.data)
            })

          let getCartsUtl = api.host + 'users/' + data.id + '/carts'
          // console.log(getCartsUtl)
          http.get(getCartsUtl)
            .then(res => {
              // 获取该用户的购物车,存到后台中
              commit('SAVE_CARTS', res.data)
            })
          return '登陆成功'
        } else {
          let userObj = {
            phone: phone,
            level: 'LEV1',
            current_score: 0,
            selectedSite: {}
          }
          return http.post(url, userObj)
            .then(res => {
              console.log(res.data)
              commit('SAVE_USERINFO', res.data)
              return '注册成功'
            })
        }
      })
  },
  // 添加商品(有用户登录时)
  addPro (store, item) {
    let carts = store.state.carts
    let addBol = true
    for (let i = 0; i < carts.length; i++) {
      if (carts[i].product_id === item.product_id) {
        addBol = false
        let changeCartsUrl = api.host + 'carts/' + carts[i].id
        http.get(changeCartsUrl)
          .then(res => {
            if (res.data.id) {
              let NewCartObj = res.data
              NewCartObj.proNum++
              return http.put(changeCartsUrl, NewCartObj)
            }
          })
            .then(res => {
              store.commit('UPDATE_CART', res.data)
              return '更新成功'
            })
        break
      }
    }
    if (addBol) {
      let addUrl = api.host + 'carts'
      return http.post(addUrl, item)
        .then(res => {
          store.commit('ADD_CART', res.data)
          return '添加商品成功'
        })
    }
  },
  // 添加商品(没有用户登录时)
  no_user_add ({commit}, item) {
    commit('NO_USER_ADD', item)
  },
  // 减少商品(有用户登录时)
  subPro (store, item) {
    let carts = store.state.carts
    for (let i = 0; i < carts.length; i++) {
      if (Number(carts[i].product_id) === Number(item.product_id)) {
        if (carts[i].proNum > 1) {
          // 更新proNum
          let changeCartsUrl = api.host + 'carts/' + carts[i].id
          return http.get(changeCartsUrl)
            .then(res => {
              if (res.data.id) {
                let NewCartObj = res.data
                NewCartObj.proNum--
                return http.put(changeCartsUrl, NewCartObj)
              }
            })
              .then(res => {
                store.commit('SUB_PRO', carts[i])
                console.log('减少商品成功')
                return '更新成功'
              })
        }
      }
    }
  },
  // 减少商品(没有用户登录时)
  no_user_sub ({commit}, item) {
    commit('SUB_PRO', item)
  },
  // 移除商品(有用户登录时)
  delPro (store, item) {
    let carts = store.state.carts
    for (let i = 0; i < carts.length; i++) {
      if (Number(carts[i].product_id) === Number(item.product_id)) {
        if (carts[i].proNum === 1) {
          let delCartUrl = api.host + 'carts/' + carts[i].id
          return http.delete(delCartUrl)
            .then(res => {
              store.commit('DEL_PRO', item)
              console.log('移除商品成功')
              return '删除成功'
            })
        }
      }
    }
  },
  // 移除商品(没有用户登录时)
  no_user_del ({commit}, item) {
    commit('DEL_PRO', item)
  },
  // 更改勾选
  switchSelect ({commit}, item) {
    commit('SWITCH_SELECT', item)
  },
  // 控制全选
  allSelected ({commit}) {
    commit('ALL_SELECTED')
  },
  // 获取勾选的商品数据
  getCartsSelectPro ({commit}) {
    commit('GET_CARTS_SELECT_PRO')
  },
  // 结算页保存地址
  saveSite (store, obj) {
    let url = api.host + 'sites'
    // 保存到数据库中
    http.post(url, obj)
      .then(res => {
        // 将数据保存到vuex中
        store.commit('SAVE_SITE', res.data)
      })
  },
  // 切换地址
  changeUseSite (store, obj) {
    let url = api.host + 'users/' + store.state.userInfo.id
    // console.log(url)
    http.get(url)
      .then(res => {
        if (res.data.id > 0) {
          res.data.selectedSite = obj
          // console.log(res.data)
          http.put(url, res.data)
        }
      })
    store.commit('CHANGE_USE_SITE', obj)
  },
  changeAboutBol ({commit}, Bol) {
    commit('CHANGE_ABOUT_BOL', Bol)
  }
}
