import * as Yup from 'yup'

export const initialValuesLogin = {
  email: '',
  password: '',
}

export const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter email in correct format')
    .required('email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(3, 'Password must be at least 3 characters')
    .max(50, 'Too Long!'),
})

export const initialValuesForgotEmail = {
  email: '',
}

export const validationSchemaForgotEmail = Yup.object().shape({
  email: Yup.string()
    .email('Please enter email in correct format')
    .matches(/^[ a-zA-Z0-9.@]+$/, "This email doesn't seem to be valid")
    .required('email is required'),
})

export const initialValuesSwagOrderForm1stStep = {
  selectedDate: '',
  textarea: '',
  swagPack: false,
  Warehousing: false,
  graphicDesign: false,
  pickAndPack: false,
  notSure: false,
}

export const initialValuesWriteReview = {
  ratings: 5,
  name: '',
  email: '',
  review_title: '',
  review: '',
}
export const validationSchemaWriteReview = Yup.object().shape({
  // ratings: Yup.number.min(1).max(5),
  name: Yup.string().required(),
  email: Yup.string()
    .email('Please enter email in correct format')
    .required('email is required'),
  review_title: Yup.string().required(),
  review: Yup.string().min(30, 'Too Short!').max(300, 'Too Long!').required(),
})

export const validationSchemaSwagOrderForm1stStep = Yup.object().shape({
  // selectedDate: Yup.date(),
  // .matches(/^[ a-zA-Z]+$/, 'Please Enter Correct Name')
  // .min(2, 'Too Short!')
  // .max(70, 'Too Long!')
  // .required('Required'),
  textarea: Yup.string().min(10, 'Too Short!').max(70, 'Too Long!'),
  // .required('required'),
})

export const initialValuesRegister = {
  name: '',
  email: '',
  password: '',
  c_password: '',
}

export const initialValuesCartRegister = {
  name: '',
  lastName: '',
  email: '',
  password: '',
  c_password: '',
  number: '',
  companyName: '',
}

export const validationSchemaCartRegister = Yup.object().shape({
  name: Yup.string()
    .matches(/^[ a-zA-Z]+$/, 'Please Enter Correct Name')
    .min(2, 'Too Short!')
    .max(70, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .matches(/^[ a-zA-Z]+$/, 'Please Enter Correct Name')
    .min(2, 'Too Short!')
    .max(70, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Please enter email in correct format')
    .required('email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(3, 'Password must be at least 8 characters')
    .max(50, 'Too Long!')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
    ),
  c_password: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  number: Yup.string()
    .matches(/^[0-9]+$/, 'Incorrect Number')
    .min(10, 'Too Short')
    .max(10, 'Please enter valid number')
    .required('Required'),
  companyName: Yup.string(),
})

export const validationSchemaRegister = Yup.object().shape({
  name: Yup.string()
    .matches(/^[ a-zA-Z]+$/, 'Please Enter Correct Name')
    .min(2, 'Too Short!')
    .max(70, 'Too Long!')
    .required('Required'),

  email: Yup.string()
    .email('Please enter email in correct format')
    .required('email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(3, 'Password must be at least 8 characters')
    .max(50, 'Too Long!')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
    ),
  c_password: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
})

export const initialValuesContact = {
  companyName: '',
  firstName: '',
  lastName: '',
  number: '',
  email: '',
  ethicalSwagReferral: '',
  description: '',
  radio: false,
}

export const validationSchemaContact = Yup.object().shape({
  firstName: Yup.string()
    .matches(/^[ a-zA-Z]+$/, 'Please Enter Correct Name')
    .min(2, 'Too Short!')
    .max(70, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .matches(/^[ a-zA-Z]+$/, 'Please Enter Correct Name')
    .min(2, 'Too Short!')
    .max(70, 'Too Long!')
    .required('Required'),
  companyName: Yup.string()
    .matches(/^[ a-zA-Z]+$/, 'Special Characters are not allowed')
    .min(2, 'Too Short!')
    .max(70, 'Too Long!')
    .required('Required'),
  number: Yup.string()
    .matches(/^[0-9]+$/, 'Incorrect Number')
    .min(10, 'Too Short')
    .max(10, 'Please enter valid number')
    .required('Required'),
  ethicalSwagReferral: Yup.string()
    .min(15, 'Too Short!')
    .matches(/^[ a-zA-Z]+$/, 'Insert only normal character')
    .max(70, 'Too Long!')
    .required('Required'),
  description: Yup.string()
    .matches(/^[ a-zA-Z]+$/, 'Insert only normal character')
    .min(40, 'Too Short!')
    .max(200, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Please enter email in correct format')
    .matches(/^[ a-zA-Z0-9.@]+$/, 'Insert only normal character')
    .required('email is required'),
  radio: Yup.boolean().required('please select terms and condition'),
})

function isValidPostalCode(postalCode, countryCode) {
  let postalCodeRegex
  switch (countryCode) {
    case 'US':
      postalCodeRegex = /^([0-9]{5})(?:[-\s]*([0-9]{4}))?$/
      break
    case 'CA':
      postalCodeRegex = /^(?!.*[DFIOQU])[A-VXY][0-9][A-Z] ?[0-9][A-Z][0-9]$/
      break
    default:
      postalCodeRegex = /^(?:[A-Z0-9]+([- ]?[A-Z0-9]+)*)?$/
  }
  return postalCodeRegex.test(postalCode)
}

export const initialValuesShipping = {
  singleAddress: 'single',
  country: '',
  firstName: '',
  lastName: '',
  number: '',
  email: '',
  companyName: '',
  address: '',
  apartment: '',
  city: '',
  state: '',
  pin: '',
}

export const validationSchemaShipping = Yup.object().shape({
  singleAddress: Yup.string().required('Please select an address.'),
  country: Yup.string()
    .matches(/^[ a-zA-Z]+$/, 'Incorrect Country')
    .min(2, 'Too Short!')
    .max(70, 'Too Long!')
    .required('Required'),
  firstName: Yup.string()
    .matches(/^[ a-zA-Z]+$/, 'Please Enter Correct Name')
    .min(2, 'Too Short!')
    .max(70, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .matches(/^[ a-zA-Z]+$/, 'Please Enter Correct Name')
    .min(2, 'Too Short!')
    .max(70, 'Too Long!')
    .required('Required'),
  number: Yup.string()
    .matches(/^[0-9]+$/, 'Incorrect Number')
    .required('Please enter number')
    // .test('Digits only', 'digits_only', digitsOnly)
    .min(10, 'Too Short')
    .max(10, 'Please enter valid number'),
  email: Yup.string()
    .matches(/^[ a-zA-Z0-9.@]+$/, 'Insert only normal character')
    .email('Please enter email in correct format')
    .required('email is required'),
  companyName: Yup.string()
    .matches(/^[ a-zA-Z]+$/, 'Special Characters are not allowed')
    .min(2, 'Too Short!')
    .max(70, 'Too Long!')
    .required('Required'),
  address: Yup.string()
    .matches(/^[ a-zA-Z0-9-.:,]+$/, 'Insert only normal character')
    .min(2, 'Too Short!')
    .max(100, 'Too Long!')
    .required('Required'),
  apartment: Yup.string()
    .matches(/^[ a-zA-Z0-9]+$/, 'Special Characters are not allowed')
    .min(2, 'Too Short!')
    .max(10, 'Too Long!'),
  city: Yup.string()
    .min(2, 'Too Short!')
    .max(15, 'Too Long')
    .matches(/^[ a-zA-Z]+$/, 'Special Characters are not allowed')
    .required('Required'),
  state: Yup.string()
    .matches(/^[ a-zA-Z]+$/, 'Special Characters are not allowed')
    .min(2, 'Too Short!')
    .max(15, 'Too Long!')
    .required('Required'),
  pin: Yup.string().required('Required'),
})

export const initialValuesSwag = {
  email: '',
  password: '',
  selectedDate: new Date().toISOString().split('T')[0],
  content: '',
  inputCheckBox: false,
}

export const validationSchemaSwag = Yup.object().shape({
  content: Yup.string()
    .matches(/^[ a-zA-Z]+$/, 'Insert only normal character')
    .min(40, 'Too Short!')
    .max(200, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Please enter email in correct format')
    .matches(/^[ a-zA-Z0-9.@]+$/, 'Insert only normal character')
    .required('email is required'),
  inputCheckBox: Yup.boolean(),
})

export const initialValuesNewLetter = {
  email: '',
}

export const validationNewsLetter = Yup.object().shape({
  email: Yup.string()
    .email('Please enter email in correct format')
    .matches(/^[ a-zA-Z0-9.@]+$/, 'Insert only normal character')
    .required('email is required'),
})

export const initialValuesOtp = {
  OTP1: '',
  OTP2: '',
  OTP3: '',
  OTP4: '',
  OTP5: '',
  OTP6: '',
}

export const validationSchemaOtp = Yup.object().shape({
  OTP1: Yup.string().required('Required'),
  OTP2: Yup.string().required('Required'),
  OTP3: Yup.string().required('Required'),
  OTP4: Yup.string().required('Required'),
  OTP5: Yup.string().required('Required'),
  OTP6: Yup.string().required('Required'),
})

export const initialValuesReset = {
  new_password: '',
  confirm_password: '',
}

export const validationSchemaReset = Yup.object().shape({
  new_password: Yup.string()
    .required('Password is required')
    .min(3, 'Password must be at least 8 characters')
    .max(50, 'Too Long!'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('new_password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
})

export const initialUserValues = {
  username: '',
  email: '',
  password: '',
  confirm_password: '',
  role: '',
}

export const initialOrderDetailAddressValues = {
  address: '',
  country: '',
  number: '',
  city: '',
  state: '',
  postalCode: '',
}

export const validationSchemaOrderDetailAddress = Yup.object().shape({
  address: Yup.string()
    .matches(/^[ a-zA-Z0-9-.:,]+$/, 'Insert only normal character')
    .min(2, 'Too Short!')
    .max(100, 'Too Long!')
    .required('Required'),
  country: Yup.string()
    .matches(/^[ a-zA-Z]+$/, 'Incorrect Country')
    .min(2, 'Too Short!')
    .max(70, 'Too Long!')
    .required('Required'),
  number: Yup.string()
    .matches(/^[0-9]+$/, 'Incorrect Number')
    .required('Please enter number')
    .min(10, 'Too Short')
    .max(10, 'Please enter valid number'),
  city: Yup.string()
    .min(2, 'Too Short!')
    .max(15, 'Too Long')
    .matches(/^[ a-zA-Z]+$/, 'Special Characters are not allowed')
    .required('Required'),
  state: Yup.string()
    .matches(/^[ a-zA-Z]+$/, 'Special Characters are not allowed')
    .min(2, 'Too Short!')
    .max(15, 'Too Long!')
    .required('Required'),
  postalCode: Yup.string()
    .matches(/^[ a-zA-Z0-9]+$/, 'Special Characters are not allowed')
    .required('Required')
    .min(2, 'Too Short')
    .max(10, 'Too Long'),
})
