<template>
  <v-container>
    <v-sheet rounded class="pa-5">
      <template v-if="docs.length > 0">
        <h5 v-if="docsAuthorMe.length > 0" class="text-h5 pt-4 pb-5">
          فایل های به اشتراک گذاشته شده توسط شما
        </h5>
        <v-row v-if="!$fetchState.pending">
          <v-col
            v-for="(doc, index) of docsAuthorMe"
            :key="index"
            cols="12"
            md="6"
            lg="3"
          >
            <v-card elevation="5">
              <v-card-title>{{ doc.title }}</v-card-title>
              <v-card-text>
                <p>
                  {{ doc.description }}
                </p>
                <p>نام فایل :{{ doc.fileName }}</p>
                <p>
                  سطح دسترسی:
                  <span v-if="doc?.documentAccess === 0"> خصوصی</span>
                  <span v-else-if="doc?.documentAccess === 1"> عمومی</span>
                </p>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  :to="{ name: 'docs-id', params: { id: doc.id } }"
                  color="primary"
                >
                  مشاهده
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <h5 v-if="docsShareForMe.length > 0" class="text-h5 pt-4 pb-5">
          فایل های به اشتراک گذاشته برای من
        </h5>
        <v-row v-if="!$fetchState.pending">
          <v-col
            v-for="(doc, index) of docsShareForMe"
            :key="index"
            cols="12"
            md="6"
            lg="3"
          >
            <v-card elevation="5">
              <v-card-title>{{ doc.title }}</v-card-title>
              <v-card-text>
                <p>
                  {{ doc.description }}
                </p>
                <p>نام فایل :{{ doc.fileName }}</p>
                <p>
                  سطح دسترسی:
                  <span v-if="doc?.documentAccess === 0"> خصوصی</span>
                  <span v-else-if="doc?.documentAccess === 1"> عمومی</span>
                </p>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  :to="{ name: 'docs-id', params: { id: doc.id } }"
                  color="primary"
                >
                  مشاهده
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </template>
      <template v-else>
        فایلی توسط شما آپلود نشده است جهت آپلود سند به<nuxt-link to="/upload">
          این قسمت</nuxt-link
        >
        مراجعه کنید
      </template>
    </v-sheet>
  </v-container>
</template>

<script>
export default {
  name: 'IndexPage',
  middleware: 'auth',
  data() {
    return {
      docs: [],
    }
  },
  async fetch() {
    try {
      const response = await this.$axios.get('document')
      if (response.status === 200) {
        this.docs = response.data
      } else {
        this.$nuxt.error({
          status: response?.status ?? 500,
          message:
            response?.data?.errors ??
            'کابر عزیز مشکلی پیش آمده است. ما به آن رسیدگی میکنیم',
        })
      }
    } catch (err) {
      if (err?.response?.data?.errors) {
        this.$nuxt.error({
          status: err?.response.status ?? 500,
          message: err.response.data.errors,
        })
      } else {
        this.$nuxt.error({
          status: err?.response?.status ?? 500,
          message:
            err?.message ??
            'کابر عزیز مشکلی پیش آمده است. ما به آن رسیدگی میکنیم',
        })
      }
    }
  },
  computed: {
    docsAuthorMe() {
      return this.docs.filter(
        (doc) => doc.ownerUserId === this.$auth.user.userId
      )
    },
    docsShareForMe() {
      return this.docs.filter(
        (doc) => doc.ownerUserId !== this.$auth.user.userId
      )
    },
  },
  mounted() {
    if (this.$store.state.hints.index !== true) {
      this.$store.commit('SET_SNACK_BAR_OPTION', {
        message: 'در این صفحه تمامی سند های قابل دسترس را مشاهده میکنید',
        color: 'info',
        status: 200,
      })
      this.$store.commit('SET_HINTS', 'index')
    }
  },
}
</script>

<style></style>
