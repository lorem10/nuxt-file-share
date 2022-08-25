<template>
  <v-navigation-drawer
    v-model="right"
    floating
    :mini-variant.sync="mini"
    app
    right
  >
    <v-list-item v-if="$auth.loggedIn" class="px-2">
      <v-list-item-content>
        <v-list-item-title> {{ $auth.user.userName }}</v-list-item-title>
        <v-list-item-subtitle> {{ $auth.user.email }} </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-list dense nav>
      <v-list-item
        v-for="item in navigationitems"
        :key="item.title"
        link
        :to="item.link"
        color="primary"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'NavigationComp',

  data() {
    return {
      navigationitems: [
        {
          title: 'خانه',
          link: '/',
          icon: 'mdi-home',
        },
        {
          title: 'بارگذاری سند',
          link: '/upload',
          icon: 'mdi-file-document-multiple-outline',
        },
        {
          title: 'اسناد',
          link: '/docs',
          icon: 'mdi-file-document-outline',
        },
      ],
      right: true,
    }
  },

  computed: {
    // use for v-model : mini drawer state
    mini: {
      get() {
        return this.$store.state.mini
      },
      set(val) {
        this.$store.commit('SET_MINI', val)
      },
    },
  },

  methods: {
    // use in parent component
    toggleRight() {
      this.right = !this.right
    },
  },
}
</script>

<style scoped></style>
