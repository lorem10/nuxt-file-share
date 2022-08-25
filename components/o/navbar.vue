<template>
  <!-- observer form -->
  <v-app-bar elevation="0" app dark color="primary" dense>
    <v-app-bar-nav-icon
      class="d-inline-flex d-lg-none"
      @click.stop="toggleDrawer"
    />

    <v-btn
      icon
      large
      class="ml-4 d-none d-lg-inline-flex"
      @click.stop="toggleMini"
    >
      <v-icon v-show="mini">mdi-menu-open</v-icon>
      <v-icon v-show="!mini">mdi-dots-vertical</v-icon>
    </v-btn>

    <v-app-bar-title>File Shering</v-app-bar-title>

    <v-spacer />

    <M-DarkModeSwitcher />
    <v-btn icon dark @click="$auth.logout()">
      <v-icon>mdi-location-exit</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: 'NavbarComp',
  computed: {
    // mini navigarion drawer state
    mini() {
      return this.$store.getters.mini
    },
  },
  methods: {
    // toggle navigarion drawer
    toggleDrawer() {
      this.$emit('toggle-drawer')
    },
    // toggle mini navigarion drawer
    toggleMini() {
      this.$store.commit('SET_MINI')
    },
  },
}
</script>

<style scoped></style>
