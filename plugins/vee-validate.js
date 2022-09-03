import { extend } from 'vee-validate'
import {
  numeric,
  min,
  max,
  alpha,
  email,
  required,
  length,
  confirmed,
} from 'vee-validate/dist/rules'

extend('numeric', {
  ...numeric,
  message: '{_field_} باید حتما عدد باشد',
})

extend('confirmed', {
  ...confirmed,
  message: 'رمز عبور شما مطابقت ندارد',
})

extend('email', {
  ...email,
  message: '{_field_} وارد شده صحیح نیست',
})

extend('length', {
  ...length,
  message: '{_field_} باید {length} رقمی باشد',
})

// extend('between', {
//   ...between,
//   message: '{_field_} باید بین {min} , {max} باشد',
// })

extend('phone-number', {
  validate: (phoneNumber) => /^09(\d){9}$/.test(phoneNumber),
  message: '{_field_} وارد شده درست نیست',
})

extend('required', {
  ...required,
  message: '{_field_} حتما باید پر شود',
})

extend('min', {
  ...min,
  message: '{_field_} نباید کم تر از {length} باشد',
})

extend('max', {
  ...max,
  message: '{_field_} نباید بیشتر از {length} باشد',
})

extend('alpha', {
  ...alpha,
  message: 'فقط حرف وارد کنید',
})
