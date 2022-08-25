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
          <div v-for="(usr, index) of users" :key="index">
            <p>{{ usr.userName }}</p>
            <input
              :id="`radio${index}`"
              type="radio"
              value="true"
              :checked="checked(usr.userId)"
            />
            <input :id="`radio${index}`" type="radio" value="false" />
          </div>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'PermissonPage',
  data() {
    return {
      users: [],
      userAccess: [],
      table: {
        data: [],
        header: [
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
  fetch() {
    this.getAllPermittedUsers()
    this.getAllUsers()
  },

  methods: {
    checked(id) {
      this.table.data.some(() => console.log(5))
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
