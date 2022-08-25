<template>
  <section class="login-form-container">
    <nuxt-link
      to="/"
      class="text-h6 text-center d-block text-decoration-none primary--text"
    >
      File Sharing
    </nuxt-link>
    <p class="text-subtitle-1 text-center">
      برای ورود به File Sharing اطلاعات زیر را وارد کنید
    </p>
    <O-AuthFormLogin></O-AuthFormLogin>
    <NuxtLink
      class="v-btn mt-3 v-btn--block v-btn--is-elevated v-btn--has-bg theme--light v-size--default"
      to="/register"
    >
      ثبت نام
    </NuxtLink>
  </section>
</template>

<script>
export default {
  name: 'LoginPage',
  layout: 'auth',
  mounted() {
    this.$store.commit('SET_SNACK_BAR_OPTION', {
      message: 'لطفا برای ورود نام کاربری و رمز عبور خود را وارد نمایید',
      color: 'info',
      status: 200,
    })
  },
}
</script>

<style></style>
