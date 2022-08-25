<template>
  <section
    class="register-form-container overflow-auto screen-height py-10 fill px-5"
  >
    <nuxt-link
      to="/"
      class="text-h6 text-center d-block text-decoration-none primary--text"
    >
      File Sharing
    </nuxt-link>
    <p class="text-subtitle-1 text-center">
      برای ثبت نام به File Sharing اطلاعات زیر را وارد کنید
    </p>
    <O-AuthFormRegister></O-AuthFormRegister>
    <NuxtLink
      class="v-btn mt-3 v-btn--block v-btn--is-elevated v-btn--has-bg theme--light v-size--default"
      to="/login"
    >
      ورود
    </NuxtLink>
  </section>
</template>

<script>
export default {
  name: 'RegisterPage',
  layout: 'auth',

  mounted() {
    this.$store.commit('SET_SNACK_BAR_OPTION', {
      message: 'برای ثبت نام، اطلاعات خود را وارد نمایید. فقط فیلد های دارای ستاره الزامی میباشند',
      color: 'info',
      status: 200,
    })
  },
}
</script>

<style></style>
