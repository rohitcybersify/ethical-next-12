import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import images from '../constants/images'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import useFetch from '../lib/useFetch'
import { FaEye } from 'react-icons/fa'
import { FaEyeSlash } from 'react-icons/fa6'
import Styles from '../styles/Login.module.css'
import { toast } from 'react-toastify'
import {
  initialValuesRegister,
  validationSchemaRegister,
} from '../lib/validationSchemas'
import EthicalLogo from '../components/EthicalLogo/EthicalLogo'
import { setuserId, setVerifyToken } from '../redux-setup/authSlice'
import { useDispatch } from 'react-redux'

const register = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [terms, setTerms] = useState(false)
  const [showEye, setShowEye] = useState(false)

  const [loadQuery, { response, loading, error }] = useFetch(
    `/testregister`,
    {
      method: 'post',
    },
    'formdata'
  )

  useEffect(() => {
    if (response) {
      dispatch(setVerifyToken(response?.verification_token))
      toast.success(
        'Registration successful! Please check your email to verify your account',
        {
          position: 'top-center',
          autoClose: 1500,
        }
      )
      router.push('/login')
    }
    if (error) {
      toast.error(error?.response?.data?.error?.email[0], {
        position: 'top-center',
        autoClose: 1500,
      })
    }
  }, [response, error])

  const onSubmit = async (values) => {
    try {
      let formData = new FormData()
      formData.append('name', values.name)
      formData.append('email', values.email)
      formData.append('password', values.password)
      formData.append('c_password', values.c_password)

      loadQuery(formData)
    } catch (error) {
      return
    } finally {
    }
  }

  const handleCheckboxChange = (event) => {
    setTerms((current) => !current)
  }
  return (
    <>
      <div className={Styles.login_wrapper}>
        <div className={Styles.login_container}>
          <div className={Styles.login_content}>
            <div className={Styles.login_img_content}>
              <EthicalLogo />
            </div>
            <Formik
              initialValues={initialValuesRegister}
              validationSchema={validationSchemaRegister}
              onSubmit={onSubmit}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <Form className={Styles.form}>
                  <div className={Styles.input_box}>
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter name"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className={Styles.error}
                    />
                  </div>

                  <div className={Styles.input_box}>
                    <Field
                      type="text"
                      id="email"
                      name="email"
                      placeholder="Enter email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className={Styles.error}
                    />
                  </div>

                  <div className={Styles.input_box}>
                    <Field
                      type={showEye ? 'text' : 'password'}
                      id="password"
                      name="password"
                      placeholder="Enter password"
                    />
                    {showEye ? (
                      <FaEyeSlash
                        fontSize={20}
                        cursor="pointer"
                        onClick={() => setShowEye(false)}
                        className={Styles.login_eye}
                      />
                    ) : (
                      <FaEye
                        fontSize={20}
                        cursor="pointer"
                        onClick={() => setShowEye(true)}
                        className={Styles.login_eye}
                      />
                    )}

                    <ErrorMessage
                      name="password"
                      component="div"
                      className={Styles.error}
                    />
                  </div>
                  <div className={Styles.input_box}>
                    <Field
                      type={showEye ? 'text' : 'password'}
                      id="c_password"
                      name="c_password"
                      placeholder="Confirm password"
                    />
                    <ErrorMessage
                      name="c_password"
                      component="div"
                      className={Styles.error}
                    />
                  </div>
                  <div className={Styles.input_radio_content}>
                    <div className={Styles.custom_checkbox}>
                      <input
                        type="checkbox"
                        name="terms"
                        value={terms}
                        onChange={handleCheckboxChange}
                        id="checkBox"
                      />
                      <label htmlFor="checkBox">
                        I agree to the{' '}
                        <a>terms & conditions and privacy policy</a>
                      </label>
                    </div>
                  </div>

                  <div className={Styles.input_box}>
                    <button
                      type="submit"
                      disabled={
                        loading ||
                        Object.keys(errors).length > 0 ||
                        !terms ||
                        Object.values(values).some((value) => value === '') ||
                        values.password !== values.c_password
                      }
                    >
                      Submit
                    </button>
                  </div>
                  <div className={Styles.input_box}>
                    <p className={Styles.registered_text}>
                      Already have an account?
                      <span onClick={() => router.push('/login')}>Login</span>
                    </p>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  )
}

export default register
