export default {
  // 统计购物车的商品总数
  cartsLen (state) {
    let result = 0
    for (let i = 0; i < state.carts.length; i++) {
      result += state.carts[i].proNum
    }
    return result
  },
  // 控制全选状态的变量
  isAllSelect (state) {
    let isAllSelect = true
    for (let i = 0; i < state.carts.length; i++) {
      if (!state.carts[i].selected) {
        isAllSelect = false
        break
      }
    }
    return isAllSelect
  },
  // 统计购物车中的所有商品价格并相加(总价)
  total (state) {
    let result = 0
    for (let i = 0; i < state.carts.length; i++) {
      if (state.carts[i].selected) {
        result += (state.carts[i].proNum * state.carts[i].proPrice)
      }
    }
    return result
  }
}
