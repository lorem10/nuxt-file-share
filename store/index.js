export const state = () => ({
  mini: false,
  snackbar: {
    message: '',
    color: 'error',
    status: 0,
  },
  hints: {
    index: false,
    login: false,
    register: false,
    upload: false,
  },
})

export const mutations = {
  SET_MINI: (state) => (state.mini = !state.mini),
  SET_SNACK_BAR_OPTION: (state, value) => {
    state.snackbar.message = value.message
    state.snackbar.color = value.color
    state.snackbar.status = value.status
  },
  SET_HINTS: (state, value) => {
    state.hints[value] = true
  },
}
