<template>
  <v-container>
    <v-row>
      <v-col>
        <v-sheet rounded class="pa-5">
          <M-BoxForm
            :submit="submitEditForm"
            class="d-inline-block upload-form"
          >
            <h1 class="text-h5 mb-5">تغییر سند</h1>
            <M-BoxInput
              v-model="editFormData.code"
              rules="min:3|max:15"
              type="number"
              label="کد سند"
              solo
            ></M-BoxInput>

            <M-BoxInput
              v-model="editFormData.title"
              rules="required|min:3|max:30"
              label="عنوان"
              solo
            ></M-BoxInput>
            <M-BoxSelect
              v-model="editFormData.documentAccess"
              rules="required"
              :items="documentAccessItems"
              item-value="value"
              item-text="text"
              label="سطح دسترسی"
              solo
            ></M-BoxSelect>
            <M-BoxTextarea
              v-model="editFormData.description"
              row="10"
              cols="40"
              rules="min:3|max:100"
              label="توضیحات"
              solo
            ></M-BoxTextarea>
            <v-btn color="primary" type="submit"> ارسال سند </v-btn>
          </M-BoxForm>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'EditDocPage',
  middleware: 'auth',
  data() {
    return {
      documentAccessItems: [
        { text: 'خصوصی', value: 0 },
        { text: 'عمومی', value: 1 },
      ],
      editFormData: {
        code: null,
        title: '',
        description: '',
        documentAccess: 0,
      },
    }
  },
  async fetch() {
    try {
      const response = await this.$axios.get(
        `document/${this.$route.params.id}`
      )
      if (response.status === 200) {
        this.editFormData.code = response.data.code
        this.editFormData.title = response.data.title
        this.editFormData.description = response.data.description
        this.editFormData.documentAccess = response.data.documentAccess
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
          status: err?.response?.status ?? 500,
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
    } finally {
      this.dialog = false
    }
  },
  methods: {
    async submitEditForm() {
      try {
        const response = await this.$axios.put(
          `document/${this.$route.params.id}`,
          this.editFormData
        )
        if (response.status !== 200) {
          if (response?.data?.errors) {
            this.$store.commit('SET_SNACK_BAR_OPTION', {
              message: response.data.errors,
              color: 'error',
              status: response.data.status,
            })
          } else {
            this.$nuxt.error({
              status: response?.status ?? 500,
              message:
                response?.errors ??
                'کابر عزیز مشکلی پیش آمده است. ما به آن رسیدگی میکنیم',
            })
          }
        } else {
          this.$store.commit('SET_SNACK_BAR_OPTION', {
            message: 'سند با موفقیت آپلود شد',
            color: 'green',
            status: 200,
          })
        }
      } catch (err) {
        if (err?.response?.data?.errors) {
          this.$store.commit('SET_SNACK_BAR_OPTION', {
            message: err.response.data.errors,
            color: 'error',
            status: err?.response?.status ?? 500,
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
  },
}
</script>

<style></style>
