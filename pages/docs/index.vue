<template>
  <v-container>
    <v-sheet rounded class="pa-5">
      <M-BoxForm :submit="SubmitFormSearch">
        <v-row>
          <v-col cols="12" md="6" lg="4">
            <M-BoxInput
              v-model="TitleSearch"
              solo
              label="جست و جو بر اساس عنوان"
              roles="min:3|max:20"
            ></M-BoxInput>
          </v-col>

          <v-col cols="12" md="6" lg="4">
            <M-BoxInput
              v-model="CodeSearch"
              type="number"
              label="جست و جو بر اساس کد"
              solo
              roles="min:3|max:20"
            ></M-BoxInput>
          </v-col>
          <v-col>
            <v-btn color="primary" type="submit"> جست و جو </v-btn>
          </v-col>
        </v-row>
      </M-BoxForm>

      <v-row>
        <v-col cols="12">
          <v-col
            v-for="(doc, index) of docs"
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
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>

<script>
export default {
  name: 'DocsPage',
  middleware: 'auth',
  data() {
    return {
      docs: [],
      TitleSearch: '',
      CodeSearch: '',
    }
  },
  async fetch() {
    try {
      const response = await this.$axios.get('document', {
        params: {
          filterCode: this.CodeSearch,
          filterTitle: this.TitleSearch,
        },
      })
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
  methods: {
    SubmitFormSearch() {
      this.$fetch()
    },
  },
}
</script>

<style></style>
