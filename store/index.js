export const state = () => ({
  expanded: true,
  user: {
    name: "Usuário Teste",
    email: "user@teste.com"
  }
})

export const mutations = {
  setExpanded(state, value) {
    state.expanded = value
  },
  setUser(state, value) {
    state.user = {...value}
  }
}
