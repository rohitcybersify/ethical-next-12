import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { FaEye } from 'react-icons/fa'
import { FaEyeSlash } from 'react-icons/fa6'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import useFetch from '../lib/useFetch'
import { useDispatch, useSelector } from 'react-redux'
import {
  setCartId,
  setRole,
  setuserId,
  setUserEmail,
  setUserName,
} from '../redux-setup/authSlice'
import { setViewItem } from '../redux-setup/adminSlice'
import { toast } from 'react-toastify'
import EthicalLogo from '../components/EthicalLogo/EthicalLogo'
import { initialValuesLogin, validationSchema } from '../lib/validationSchemas'
import Styles from '../styles/Login.module.css'

const login = () => {
  const dispatch = useDispatch()
  const [showEye, setShowEye] = useState(false)
  const router = useRouter()
  const [terms, setTerms] = useState(false)

  const [loadQuery, { response, loading, error }] = useFetch(
    `/auth/login`,
    {
      method: 'post',
    },
    'formdata'
  )

  const page = useSelector((state) => state.auth.currentPage)

  useEffect(() => {
    if (response) {
      localStorage.setItem('token_swag', response?.data?.accessToken)
      localStorage.setItem('userId', response?.id)
      dispatch(setUserName(response?.data?.name))
      dispatch(setRole(response?.data?.role[0]))
      dispatch(setUserEmail(response?.data?.email))
      dispatch(setuserId(response?.data?.id))
      if (response?.data?.role[0] === 'super admin') {
        router.push('/super-admin/dashboard')
        dispatch(setViewItem(true))
      } else if (response?.data?.role[0] === 'company') {
        if (page !== null) {
          router.push(page)
        } else {
          router.push('/')
        }
      }
      toast.success('Logged in sucessfully', {
        position: 'top-center',
        autoClose: 1500,
      })
    } else if (error) {
      toast.error(error?.response?.data.message, {
        position: 'top-center',
        autoClose: 1500,
      })
    }
  }, [response, error])

  const onSubmit = async (values) => {
    try {
      let formData = new FormData()
      formData.append('email', values.email)
      formData.append('password', values.password)
      loadQuery(formData)
    } catch (error) {
      return
    }
  }

  const handleChange = (event) => {
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
              initialValues={initialValuesLogin}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ values }) => (
                <>
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
                      <Field
                        type={showEye ? 'text' : 'password'}
                        id="password"
                        name="password"
                        placeholder="Enter Password"
                        autoComplete="off"
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
                      <label
                        className={Styles.forgot_password}
                        onClick={() => router.push('/forgot')}
                      >
                        Forgot Password?
                      </label>
                    </div>

                    <div className={Styles.input_box}>
                      <button
                        type="submit"
                        disabled={
                          loading || values.email == '' || values.password == ''
                        }
                      >
                        Login
                      </button>
                    </div>

                    <div className={Styles.input_box}>
                      <p className={Styles.registered_text}>
                        Dont have an account?
                        <span onClick={() => router.push('/register')}>
                          Register
                        </span>
                      </p>
                    </div>
                  </Form>
                </>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  )
}

export default login
