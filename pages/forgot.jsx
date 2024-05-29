import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import useFetch from '../lib/useFetch'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Styles from '../styles/Login.module.css'
import images from '../constants/images'
import {
  initialValuesForgotEmail,
  initialValuesOtp,
  initialValuesForgotPassword,
  validationSchemaOtp,
  validationSchemaForgotPassword,
  validationSchemaForgotEmail,
  initialValuesReset,
  validationSchemaReset,
} from '../lib/validationSchemas'

import { toast } from 'react-toastify'

const forgot = () => {
  const router = useRouter()
  const [isOtpSent, setIsOtpSent] = useState(false)
  const [emailEntered, setEmailEntered] = useState('')
  const [showPasswords, setShowPasswords] = useState(false)
  const [isEmail, setIsEmail] = useState(true)

  const [
    emailLoadQuery,
    { response: emailResponse, loading: emailLoading, error: emailError },
  ] = useFetch(
    `/auth/forget-password`,
    {
      method: 'post',
    },
    'formdata'
  )

  const [
    resetloadQuery,
    { response: resetResponse, loading: resetLoading, error: resetError },
  ] = useFetch(
    `/auth/password-reset`,
    {
      method: 'post',
    },
    'formdata'
  )
  const [
    otploadQuery,
    { response: otpResponse, loading: otpLoading, error: otpError },
  ] = useFetch(
    `/auth/validate/otp`,
    {
      method: 'post',
    },
    'formdata'
  )

  const onEmailSubmit = async (values) => {
    try {
      let formData = new FormData()
      formData.append('email', values.email)
      setEmailEntered(values.email)
      emailLoadQuery(formData)
    } catch (error) {
      return
    }
  }

  const onOtpSubmit = (values) => {
    const data = {
      email: emailEntered,
      otp:
        values.OTP1 +
        values.OTP2 +
        values.OTP3 +
        values.OTP4 +
        values.OTP5 +
        values.OTP6,
    }
    try {
      otploadQuery(data)
    } catch (err) {
      return
    }
  }

  const onResetPassword = async (values) => {
    try {
      const data = {
        email: emailEntered,
        password: values.new_password,
        password_confirmation: values.confirm_password,
      }
      resetloadQuery(data)
    } catch (err) {
      return
    }
  }

  useEffect(() => {
    if (emailResponse) {
      setIsEmail(false)
      setIsOtpSent(true)
      toast.success(emailResponse?.message, {
        position: 'top-center',
        autoClose: 1500,
      })
    } else if (emailError) {
      toast.error(emailError?.response?.data?.error?.email[0], {
        position: 'top-center',
        autoClose: 1500,
      })
    }
  }, [emailResponse, emailError])

  useEffect(() => {
    if (otpResponse) {
      toast.success(otpResponse?.message, {
        position: 'top-center',
        autoClose: 1500,
      })
      setIsOtpSent(false)
      setShowPasswords(true)
    } else if (otpError) {
      toast.error(otpError?.response?.data?.message, {
        position: 'top-center',
        autoClose: 1500,
      })
    }
  }, [otpResponse, otpError])

  useEffect(() => {
    if (resetResponse) {
      toast.success(resetResponse?.message, {
        position: 'top-center',
        autoClose: 1500,
      })
      setEmailEntered('')
      router.push('/login')
    } else if (resetError) {
      toast.error(resetError?.response?.data?.message?.password[0], {
        position: 'top-center',
        autoClose: 1500,
      })
    }
  }, [resetResponse, resetError])

  return (
    <>
      {isEmail && (
        <div className={Styles.login_wrapper}>
          <div className={Styles.login_container}>
            <div className={Styles.login_content}>
              <div className={Styles.login_img_content}>
                <Image src={images.ethical_swag} />
              </div>
              <Formik
                initialValues={initialValuesForgotEmail}
                validationSchema={validationSchemaForgotEmail}
                onSubmit={onEmailSubmit}
              >
                {({ values, errors }) => (
                  <Form className={Styles.form}>
                    <div className={Styles.input_box}>
                      <Field
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Enter email"
                        autoComplete="off"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className={Styles.error}
                      />
                    </div>
                    <div className={Styles.input_box}>
                      <button
                        type="submit"
                        className={Styles.reset_password}
                        disabled={
                          values.email == '' || errors.email || emailLoading
                        }
                      >
                        Submit Email
                      </button>
                    </div>
                    <div className={Styles.input_box}>
                      <p>
                        Don't have an account?
                        <span onClick={() => router.push('/register')}>
                          Register
                        </span>
                      </p>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}

      {isOtpSent && (
        <>
          <div
            className={`${Styles.login_wrapper} ${
              isOtpSent ? Styles.otp_field : ''
            }`}
          >
            <div className={Styles.login_container}>
              <div className={Styles.login_content}>
                <div className={Styles.login_img_content}>
                  <Image src={images.ethical_swag} />
                </div>
                <Formik
                  initialValues={initialValuesOtp}
                  validationSchema={validationSchemaOtp}
                  onSubmit={onOtpSubmit}
                >
                  {({ values, errors }) => (
                    <Form className={Styles.form}>
                      <div
                        className={`${Styles.input_box} ${
                          isOtpSent ? Styles.boxes : ''
                        }`}
                      >
                        <Field
                          type="text"
                          id="OTP1"
                          name="OTP1"
                          autoComplete="off"
                        />
                        <Field
                          type="text"
                          id="OTP2"
                          name="OTP2"
                          autoComplete="off"
                        />
                        <Field
                          type="text"
                          id="OTP3"
                          name="OTP3"
                          autoComplete="off"
                        />
                        <Field
                          type="text"
                          id="OTP4"
                          name="OTP4"
                          autoComplete="off"
                        />
                        <Field
                          type="text"
                          id="OTP5"
                          name="OTP5"
                          autoComplete="off"
                        />
                        <Field
                          type="text"
                          id="OTP6"
                          name="OTP6"
                          autoComplete="off"
                        />
                        <ErrorMessage
                          name="OTP"
                          component="div"
                          className={Styles.error}
                        />
                      </div>
                      <div className={Styles.input_box}>
                        <button
                          type="submit"
                          className={Styles.reset_password}
                          disabled={otpLoading}
                        >
                          Send
                        </button>
                      </div>
                      <div className={Styles.input_box}>
                        <p>
                          Don't have an account?
                          <span onClick={() => router.push('/register')}>
                            Register
                          </span>
                        </p>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </>
      )}

      {showPasswords && (
        <div className={Styles.login_wrapper}>
          <div className={Styles.login_container}>
            <div className={Styles.login_content}>
              <div className={Styles.login_img_content}>
                <Image src={images.ethical_swag} />
              </div>
              <Formik
                initialValues={initialValuesReset}
                validationSchema={validationSchemaReset}
                onSubmit={onResetPassword}
              >
                {({ values, error }) => (
                  <Form className={Styles.form}>
                    <>
                      <div className={Styles.input_box}>
                        <Field
                          type="password"
                          id="email"
                          name="new_password"
                          placeholder="Enter new password"
                        />
                        <ErrorMessage
                          name="new_password"
                          component="div"
                          className={Styles.error}
                        />
                      </div>
                      <div className={Styles.input_box}>
                        <Field
                          type="password"
                          id="password"
                          name="confirm_password"
                          placeholder="Confirm new password"
                        />
                        <ErrorMessage
                          name="confirm_password"
                          component="div"
                          className={Styles.error}
                        />
                      </div>
                    </>

                    <div className={Styles.input_box}>
                      <button
                        type="submit"
                        className={Styles.reset_password}
                        disabled={values.new_password == ''}
                      >
                        Reset Password
                      </button>
                    </div>
                    <div className={Styles.input_box}>
                      <p>
                        Don't have an account?
                        <span onClick={() => router.push('/register')}>
                          Register
                        </span>
                      </p>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default forgot
