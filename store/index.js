import createPersistedState from "vuex-persistedstate"
import Cookies from "js-cookie"

export const state = () => ({
  expanded: true,
})

export const mutations = {
  setExpanded(state, value) {
    state.expanded = value
  }
}
