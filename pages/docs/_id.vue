<template>
  <v-container>
    <row>
      <v-col v-if="!$fetchState.pending" cols="12">
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
            <div class="text-center">
              <v-dialog v-model="dialog" width="500">
                <template #activator="{ on, attrs }">
                  <v-btn color="error" v-bind="attrs" v-on="on"> حذف </v-btn>
                </template>

                <v-card>
                  <v-card-title class="text-h6">
                    از حذف سند {{ doc.title }} مطمئن هستید ؟
                  </v-card-title>

                  <v-card-actions>
                    <v-btn color="primary" text @click="deletDoc"> بله </v-btn>
                    <v-btn color="green" text @click="dialog = false">
                      خیر
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>

            <v-btn
              class="mr-3"
              :to="{ name: 'docs-edit-id', params: { id: doc.id } }"
              color="yellow"
            >
              تغییر
            </v-btn>
            <v-btn class="mr-3" color="green" @click="downloadDoc">
              بارگیری سند
            </v-btn>
            <v-btn
              v-if="doc.ownerUserId === $auth.user.userId"
              class="mr-3"
              :to="{
                name: 'docs-permisson-id',
                params: { id: $route.params.id },
              }"
              color="blue"
            >
              اشتراک گذاری
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </row>
  </v-container>
</template>

<script>
export default {
  name: 'DocIdPage',
  middleware: 'auth',
  data() {
    return {
      doc: null,
      dialog: false,
    }
  },
  async fetch() {
    try {
      const response = await this.$axios.get(
        `document/${this.$route.params.id}`
      )
      if (response.status === 200) {
        this.doc = response.data
      } else if (response?.data?.errors) {
        this.$store.commit('SET_SNACK_BAR_OPTION', {
          message: response.data.errors,
          color: 'error',
          status: response.status,
        })
      } else {
        this.$nuxt.error({
          status: response?.status ?? 500,
          message:
            response?.errors ??
            'کابر عزیز مشکلی پیش آمده است. ما به آن رسیدگی میکنیم',
        })
      }
    } catch (err) {
      if (err?.response?.data?.errors) {
        this.$store.commit('SET_SNACK_BAR_OPTION', {
          message: err?.response.data.errors,
          color: 'error',
          status: err?.response.status,
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
    async downloadDoc() {
      try {
        const response = await this.$axios.get(
          `Document/Download/${this.$route.params.id}`,
          { responseType: 'blob' }
        )
        if (response.status !== 200) {
          if (response?.data?.errors) {
            this.$store.commit('SET_SNACK_BAR_OPTION', {
              message:
                response?.data?.errors ??
                'کابر عزیز مشکلی پیش آمده است. ما به آن رسیدگی میکنیم',
              color: 'error',
              status: response?.status ?? 500,
            })
          }
        } else {
          const url = window.URL.createObjectURL(new Blob([response.data]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'file.pdf') // or any other extension
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          this.$store.commit('SET_SNACK_BAR_OPTION', {
            message: 'براگیری شروع شد',
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
    async deletDoc() {
      try {
        const response = await this.$axios.delete(
          `document/${this.$route.params.id}`
        )
        if (response.status === 200) {
          this.$router.push('/')
          this.$store.commit('SET_SNACK_BAR_OPTION', {
            message: 'سند با موفقیت حذف شد',
            color: 'green',
            status: 200,
          })
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
      }
    },
  },
}
</script>

<style></style>
