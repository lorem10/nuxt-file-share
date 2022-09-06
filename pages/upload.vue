<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-sheet class="rounded pa-5">
          <M-BoxForm
            :submit="submitUploadForm"
            class="d-inline-block upload-form"
          >
            <h1 class="text-h5 mb-5">بارگذاری سند</h1>
            <M-BoxInput
              v-model="uploadFormData.code"
              rules="min:3|max:15"
              type="number"
              label="کد سند"
              solo
            ></M-BoxInput>

            <M-BoxInput
              v-model="uploadFormData.title"
              rules="required|min:3|max:30"
              label="عنوان*"
              solo
            ></M-BoxInput>
            <M-BoxSelect
              v-model="uploadFormData.documentAccess"
              rules="required"
              :items="documentAccessItems"
              item-value="value"
              item-text="text"
              label="سطح دسترسی"
              solo
            ></M-BoxSelect>
            <M-BoxInput
              v-model="uploadFormData.fileName"
              rules="min:3|max:30"
              label="اسم فایل"
              hint="میتوانید اسم فایل آپلود شده را تغییر دهید"
              solo
            ></M-BoxInput>
            <M-BoxTextarea
              v-model="uploadFormData.description"
              row="10"
              cols="40"
              rules="min:3|max:100"
              label="توضیحات"
              solo
            ></M-BoxTextarea>
            <v-file-input
              v-model="uploadFormData.file"
              required
              solo
              label="انتخاب فایل*"
            />
            <v-btn color="primary" type="submit"> ارسال سند </v-btn>
          </M-BoxForm>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'UploadPage',
  middleware: 'auth',
  data() {
    return {
      documentAccessItems: [
        { text: 'خصوصی', value: 0 },
        { text: 'عمومی', value: 1 },
      ],
      uploadFormData: {
        code: '',
        title: '',
        description: '',
        documentAccess: 0,
        file: null,
        fileName: '',
      },
    }
  },
  mounted() {
    if (this.$store.state.hints.upload !== true) {
      this.$store.commit('SET_SNACK_BAR_OPTION', {
        message:
          'در صفحه میتوانید سند خود را بارگزاری نمایید، فیلد کد سند اختیاری میباشد',
        color: 'info',
        status: 200,
      })
    }
    this.$store.commit('SET_HINTS', 'upload')
  },
  methods: {
    initFormData() {
      const formData = new FormData()
      formData.append('Code', this.uploadFormData.code)
      formData.append('Title', this.uploadFormData.title)
      formData.append('Description', this.uploadFormData.description)
      formData.append('DocumentAccess', this.uploadFormData.documentAccess)
      formData.append('File', this.uploadFormData.file)
      formData.append('FileName', this.uploadFormData.fileName)
      return formData
    },

    async submitUploadForm() {
      try {
        const response = await this.$axios.post('document', this.initFormData())
        if (response.status !== 201) {
          if (response?.data?.errors) {
            this.$store.commit('SET_SNACK_BAR_OPTION', {
              message: response.data.errors,
              color: 'error',
              status: response.status,
            })
          } else {
            this.$nuxt.error({
              status: response?.status ?? 500,
              message:
                response.data?.errors ??
                'کابر عزیز مشکلی پیش آمده است. ما به آن رسیدگی میکنیم',
            })
          }
        } else {
          this.$store.commit('SET_SNACK_BAR_OPTION', {
            message: 'سند با موفقیت آپلود شد',
            color: 'green',
            status: 200,
          })
          this.$router.push('/')
        }
      } catch (err) {
        if (err?.response?.data?.errors) {
          this.$store.commit('SET_SNACK_BAR_OPTION', {
            message: err.response.data.errors,
            color: 'error',
            status: err?.status ?? 500,
          })
        } else {
          this.$nuxt.error({
            status: err?.status ?? 500,
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
