export const state = () => ({
  expanded: true,
  user: {}
})

export const mutations = {
  setExpanded(state, value) {
    state.expanded = value
  },
  setUser(state, value) {
    state.user = {...value}
  }
}
