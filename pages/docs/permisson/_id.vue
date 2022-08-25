<template>
  <v-container v-if="!$fetchState.pending">
    <v-row>
      <v-col>
        <v-sheet rounded class="pa-5">
          <h3 class="h5 pb-5">کابرانی که دسترسی به این فایل دارند</h3>
          <v-data-table :items="table.data" :headers="table.header">
          </v-data-table>
        </v-sheet>
      </v-col>
      <v-col cols="12" md="4">
        <v-sheet rounded class="pa-5">
          <v-combobox
            v-model="userAccess"
            :items="users"
            item-value="userId"
            item-text="userName"
            chips
          ></v-combobox>
          <div>
            <v-radio-group v-model="radioGroup">
              <v-radio
                v-for="n in [
                  { value: 1, text: 'دسترسی داشته باشد' },
                  { value: 0, text: 'دسترسی نداشته باشد' },
                ]"
                :key="n.value"
                :label="n.text"
                :value="n.value"
              ></v-radio>
            </v-radio-group>
            <v-btn color="primary" @click="setPermisson"> ارسال </v-btn>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'PermissonPage',
  middleware: 'auth',
  data() {
    return {
      users: [],
      radioGroup: 1,
      userAccess: null,
      table: {
        data: [],
        header: [
          {
            text: 'id',
            value: 'userId',
          },
          {
            text: 'نام کاربری',
            value: 'userName',
          },
          {
            text: 'نام',
            value: 'firstName',
          },
          {
            text: 'نام خانوادگی',
            value: 'lastName',
          },
        ],
      },
    }
  },
  async fetch() {
    await this.getAllUsers()
    await this.getAllPermittedUsers()
  },
  methods: {
    async setPermisson() {
      try {
        const response = await this.$axios.post('Permission', {
          targetUserId: this.userAccess.userId,
          documentId: Number(this.$route.params.id),
          haveAccess: Boolean(this.radioGroup),
        })
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
          this.getAllPermittedUsers()
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
    async getAllUsers() {
      try {
        const response = await this.$axios.get(`Identity/GetAllUsers/`)
        if (response.status === 200) {
          this.users = response.data
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
    async getAllPermittedUsers() {
      try {
        const response = await this.$axios.get(
          `Permission/${this.$route.params.id}`
        )
        if (response.status === 200) {
          this.table.data = response.data
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
