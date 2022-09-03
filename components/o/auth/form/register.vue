<template>
  <!-- قبل از ریویو این بخش به بخش زیر مراجعه نمایید -->
  <!-- /docs/register.txt -->
  <M-BoxForm :submit="submitRegisterForm">
    <v-row>
      <v-col cols="6">
        <M-BoxInput
          v-model="registerFormData.username"
          rules="required|min:5|max:100"
          label="نام کاربری*"
          solo
        ></M-BoxInput>
      </v-col>
      <v-col cols="6">
        <M-BoxInput
          v-model="registerFormData.email"
          rules="required|min:5|max:100|email"
          label="ایمیل*"
          type="email"
          solo
        ></M-BoxInput>
      </v-col>
      <v-col cols="6">
        <M-BoxInput
          v-model="registerFormData.password"
          rules="required|min:8|max:100"
          type="password"
          label="رمزعبور*"
          solo
        ></M-BoxInput>
      </v-col>
      <v-col cols="6">
        <M-BoxInput
          v-model="passwordRepeat"
          rules="required|min:8|max:100|confirmed:رمزعبور*"
          type="password"
          label="تکرار رمز عبور*"
          solo
        ></M-BoxInput>
      </v-col>
      <v-col cols="6">
        <M-BoxInput
          v-model="registerFormData.nationalCode"
          rules="min:3|max:10"
          type="text"
          label="کد ملی"
          solo
        ></M-BoxInput>
      </v-col>
      <v-col cols="6">
        <M-BoxInput
          v-model="registerFormData.firstName"
          rules="required|min:3|max:30"
          type="text"
          label="نام*"
          solo
        ></M-BoxInput>
      </v-col>
      <v-col cols="6">
        <M-BoxInput
          v-model="registerFormData.lastName"
          rules="min:3|max:30"
          type="text"
          label="نام خانوادگی"
          solo
        ></M-BoxInput>
      </v-col>
      <v-col cols="6">
        <M-BoxSelect
          v-model="registerFormData.educationLevel"
          solo
          rules="required"
          label="مقطع تحصیلی*"
          :items="educationLevelItems"
          item-text="text"
          item-value="value"
        >
        </M-BoxSelect>
      </v-col>
      <v-col cols="6">
        <M-BoxInput
          v-model="registerFormData.job"
          rules="min:3|max:30"
          type="text"
          label="شغل"
          solo
        ></M-BoxInput>
      </v-col>
      <v-col cols="6">
        <M-BoxInput
          v-model="registerFormData.fatherName"
          rules="min:3|max:30"
          type="text"
          label="نام پدر"
          solo
        ></M-BoxInput>
      </v-col>
      <v-col cols="6">
        <M-BoxInput
          v-model="registerFormData.phoneNumber"
          rules="length:11"
          type="number"
          label="شماره تلفن همراه"
          solo
        ></M-BoxInput>
      </v-col>
      <v-col cols="6">
        <M-BoxInput
          v-model="registerFormData.homeNumber"
          rules="length:10"
          type="number"
          label="شماره تلفن منزل"
          solo
        ></M-BoxInput>
      </v-col>
      <v-col cols="12">
        <M-BoxTextarea
          v-model="registerFormData.address"
          rules="min:10|max:100"
          type="text"
          label="آدرس محل سکونت"
          solo
        ></M-BoxTextarea>
      </v-col>
    </v-row>
    <v-btn type="submit" block color="primary"> ثبت نام </v-btn>
  </M-BoxForm>
</template>

<script>
export default {
  name: 'RegisterFormOrganism',
  data() {
    return {
      educationLevelItems: [
        { text: 'ابتدایی', value: 1 },
        { text: 'متوسطه اول', value: 2 },
        { text: 'متوسطه دوم', value: 3 },
        { text: 'دیپلوم', value: 4 },
        { text: 'لیسانس', value: 5 },
        { text: 'دکترا', value: 6 },
        { text: 'سایر', value: 0 },
      ],
      passwordRepeat: '',
      registerFormData: {
        username: '',
        email: '',
        password: '',
        nationalCode: '',
        firstName: '',
        lastName: '',
        fatherName: '',
        educationLevel: null,
        job: '',
        phoneNumber: '',
        homeNumber: '',
        address: '',
      },
    }
  },
  methods: {
    async submitRegisterForm() {
      try {
        const response = await this.$axios.$post(
          'Identity/Register',
          this.registerFormData
        )
        if (response.isSuccess !== true) {
          if (response?.errors) {
            this.$store.commit('SET_SNACK_BAR_OPTION', {
              message: response.errors,
              color: 'error',
              status: response.status,
            })
          } else {
            this.$nuxt.error({
              status: response.status ?? 500,
              message:
                response.errors ??
                'کابر عزیز مشکلی پیش آمده است. ما به آن رسیدگی میکنیم',
            })
          }
        } else if (response.isSuccess === true) {
          this.$store.commit('SET_SNACK_BAR_OPTION', {
            message: 'ثبت نام شما با موفقت انجام شد',
            color: 'green',
            status: 200,
          })
          this.$router.push('/login')
        }
      } catch (err) {
        this.$store.commit('SET_SNACK_BAR_OPTION', {
          message:
            err.response?.data?.errors ??
            'کابر عزیز مشکلی پیش آمده است. ما به آن رسیدگی میکنیم',
          color: 'error',
          status: err.response.status,
        })
      }
    },
  },
}
</script>

<style></style>
