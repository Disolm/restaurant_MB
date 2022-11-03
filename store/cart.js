export const state = () => ({
  isShowCart: false,
})

export const mutations = {
  invertState(state, val) {
    state.isShowCart = val
  }
}

export const getters = {
  getStatus(state) {
    return state.isShowCart
  }
}
