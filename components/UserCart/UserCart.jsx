'use client'
import React, { useEffect, useState } from 'react'
import Styles from './UserCart.module.css'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import {
  initialValuesLogin,
  validationSchema,
} from '../../lib/validationSchemas'
import useFetch from '../../lib/useFetch'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import {
  setRole,
  setuserId,
  setRegisterCart,
  setUserEmail,
  setUserName,
} from '../../redux-setup/authSlice'

import SwagOrderForm from '../SwagOrderForm/SwagOrderForm'
import { useRouter } from 'next/router'

const UserCart = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const userId = useSelector((state) => state.auth.userId)

  const [selectedOption, setSelectedOption] = useState('New_client')
  const [values, setValues] = useState({
    email: '',
    password: '',
  })

  const [registerValues, setRegisterValues] = useState({
    name: '',
    lastName: '',
    email: '',
    companyName: '',
    password: '',
    c_password: '',
    phone_number: '',
  })

  const [errors, setErrors] = useState({
    name: '',
    lastName: '',
    email: '',
    companyName: '',
    password: '',
    c_password: '',
    phone_number: '',
  })

  const [
    registerQuery,
    {
      response: registerResponse,
      loading: registerLoading,
      error: registerError,
    },
  ] = useFetch(
    `/auth/check-email`,
    {
      method: 'post',
    },
    'formdata'
  )

  const registerValuesFromRedux = useSelector(
    (state) => state.auth.registerCart
  )

  const [loadQuery, { response, loading, error }] = useFetch(
    `/auth/login`,
    {
      method: 'post',
    },
    'formdata'
  )

  const handleChange = (e) => {
    const { name, value } = e.target
    setRegisterValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }))

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateInput(name, value),
    }))
  }

  const validateInput = (name, value) => {
    switch (name) {
      case 'name':
        return value.trim() === '' ? 'Name is required' : ''
      case 'lastName':
        return value.trim() === '' ? 'Last Name is required' : ''
      case 'companyName':
        return value.trim() === '' ? 'Company Name is required' : ''
      case 'email':
        return !/\S+@\S+\.\S+/.test(value) ? 'Invalid email address' : ''
      case 'password':
        return !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+/.test(
          value
        )
          ? 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
          : ''
      case 'c_password':
        return value !== registerValues.password ? 'Passwords do not match' : ''
      case 'phone_number':
        return value.length !== 10 ? 'Invalid phone number' : ''
      default:
        return ''
    }
  }

  useEffect(() => {
    setRegisterValues(registerValuesFromRedux)
  }, [registerValuesFromRedux])

  useEffect(() => {
    if (registerResponse) {
      if (registerResponse?.status === 404) {
        toast.error('Email already exists', {
          position: 'top-center',
          autoClose: 1500,
        })
      } else if (registerResponse?.status === 200) {
        dispatch(setRegisterCart(registerValues))
        toast.success('Successfully Saved', {
          position: 'top-center',
          autoClose: 1500,
        })
        dispatch(
          setRegisterCart({
            name: registerValues?.name,
            lastName: registerValues?.lastName,
            phone_number: registerValues?.phone_number,
            email: registerValues?.email,
            password: registerValues?.password,
            c_password: registerValues?.c_password,
            companyName: registerValues?.companyName,
          })
        )
      }
    } else if (registerError) {
      toast.error(registerError?.response?.data?.error?.email[0], {
        position: 'top-center',
        autoClose: 1500,
      })
    }
  }, [registerResponse, registerError])

  useEffect(() => {
    if (response) {
      localStorage.setItem('token_swag', response?.data?.accessToken)
      localStorage.setItem('userId', response?.data?.id)
      dispatch(setRole(response?.data?.role))
      dispatch(setUserEmail(response?.data?.email))
      dispatch(setUserName(response?.data?.name))
      dispatch(setuserId(response?.data?.id))
      toast.success('Logged in successfully', {
        position: 'top-center',
        autoClose: 1500,
      })
    }
    if (error) {
      toast.error(error?.response?.data?.message, {
        position: 'top-center',
        autoClose: 1500,
      })
    }
  }, [response, error])

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value)
  }

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

  const onSubmitRegister = (e) => {
    e.preventDefault()
    let formData = new FormData()
    formData.append('name', registerValues.name)
    formData.append('email', registerValues.email)
    formData.append('password', registerValues.password)
    formData.append('c_password', registerValues.c_password)
    registerQuery(formData)
  }
  return (
    <>
      <section>
        {userId === null && (
          <div className={Styles.viewCart}>
            <p className={Styles.cart_left_desc}>Are you a...</p>
          </div>
        )}

        {userId === null && (
          <div className={Styles.cart_left_radio_buttons}>
            <div
              className={`${Styles.cart_left_btn} ${Styles.custom_checkbox}`}
            >
              <input
                type="checkbox"
                className={Styles.cart_left_radio_btn}
                name="Existing_client"
                id="Existing_client"
                value="Existing_client"
                checked={selectedOption === 'Existing_client'}
                onChange={handleOptionChange}
              />
              <label
                htmlFor="Existing_client"
                className={Styles.cart_left_text}
              >
                Existing Client
              </label>
            </div>
            <div
              className={`${Styles.cart_left_btn} ${Styles.custom_checkbox}`}
            >
              <input
                type="checkbox"
                className={Styles.cart_left_radio_btn}
                name="New_client"
                id="New_client"
                value="New_client"
                checked={selectedOption === 'New_client'}
                onChange={handleOptionChange}
              />
              <label htmlFor="New_client" className={Styles.cart_left_text}>
                New Client
              </label>
            </div>
          </div>
        )}

        <div className={Styles.cart_left}>
          {userId === null && selectedOption === 'Existing_client' && (
            <>
              <Formik
                initialValues={initialValuesLogin}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {() => (
                  <>
                    <Form className={Styles.form}>
                      <div className={Styles.form_inputs}>
                        <div className={Styles.flexform}>
                          <div className={Styles.inputField}>
                            <Field
                              type="text"
                              id="email"
                              name="email"
                              placeholder="Enter email"
                              className={Styles.input}
                              autoComplete="off"
                            />
                            <ErrorMessage
                              name="email"
                              component="div"
                              className={Styles.error}
                            />
                          </div>

                          <div className={Styles.form_inputs}>
                            <div className={Styles.inputField}>
                              <Field
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter Password"
                                className={Styles.input}
                                autoComplete="off"
                              />
                              <ErrorMessage
                                name="password"
                                component="div"
                                className={Styles.error}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={Styles.input_box}>
                        <label
                          className={Styles.forgot_password}
                          onClick={() => router.push('/forgot')}
                        >
                          Forgot Password?
                        </label>
                      </div>

                      <div className={Styles.form_inputs}>
                        <button
                          type="submit"
                          disabled={loading}
                          className={Styles.form_button}
                          style={{ cursor: 'pointer' }}
                        >
                          Login
                        </button>
                      </div>
                    </Form>
                  </>
                )}
              </Formik>
            </>
          )}

          {userId === null && selectedOption === 'New_client' && (
            <>
              <form className={Styles.form}>
                <div className={Styles.form_inputs}>
                  <div className={`${Styles.flexform} ${Styles.flexwrap}`}>
                    <div className={Styles.inputField}>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={registerValues?.name}
                        placeholder="First name"
                        className={Styles.input}
                        onChange={handleChange}
                      />
                      <span
                        name="name"
                        component="div"
                        className={Styles.error}
                      >
                        {errors.name}
                      </span>
                    </div>

                    <div className={Styles.form_inputs}>
                      <div className={Styles.inputField}>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={registerValues?.lastName}
                          placeholder="Last Name"
                          className={Styles.input}
                          onChange={handleChange}
                        />
                        <span
                          name="lastName"
                          component="div"
                          className={Styles.error}
                        >
                          {errors.lastName}
                        </span>
                      </div>
                    </div>

                    <div className={Styles.form_inputs}>
                      <div className={Styles.inputField}>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={registerValues?.email}
                          placeholder="Email"
                          className={Styles.input}
                          onChange={handleChange}
                        />
                        <span name="email" className={Styles.error}>
                          {errors.email}
                        </span>
                      </div>
                    </div>
                    <div className={Styles.form_inputs}>
                      <div className={Styles.inputField}>
                        <input
                          type="text"
                          id="companyName"
                          name="companyName"
                          value={registerValues?.companyName}
                          placeholder="Company Name"
                          className={Styles.input}
                          onChange={handleChange}
                        />
                        <span name="companyName" className={Styles.error}>
                          {errors.companyName}
                        </span>
                      </div>
                    </div>

                    <div className={Styles.form_inputs}>
                      <div className={Styles.inputField}>
                        <input
                          type="text"
                          id="phone_number"
                          name="phone_number"
                          value={registerValues?.phone_number}
                          placeholder="Phone Number"
                          className={Styles.input}
                          onChange={handleChange}
                        />
                        <span name="phone_number" className={Styles.error}>
                          {errors.phone_number}
                        </span>
                      </div>
                    </div>

                    <div className={Styles.form_inputs}>
                      <div className={Styles.inputField}>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          placeholder="Password"
                          value={registerValues?.password}
                          className={Styles.input}
                          onChange={handleChange}
                        />
                        <span name="password" className={Styles.error}>
                          {errors.password}
                        </span>
                      </div>
                    </div>
                    <div className={Styles.form_inputs}>
                      <div className={Styles.inputField}>
                        <input
                          type="password"
                          id="c_password"
                          name="c_password"
                          value={registerValues?.c_password}
                          placeholder="Confirm Password"
                          className={Styles.input}
                          onChange={handleChange}
                        />
                        <span name="c_password" className={Styles.error}>
                          {errors.c_password}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={Styles.form_inputs}>
                  <button
                    type="submit"
                    onClick={onSubmitRegister}
                    disabled={
                      registerValues &&
                      Object.keys(registerValues)
                        .filter((key) => key !== 'companyName')
                        .some((key) => registerValues[key] === '')
                    }
                    className={Styles.form_button}
                    style={{ cursor: 'pointer' }}
                  >
                    Save
                  </button>
                </div>
              </form>
            </>
          )}

          <SwagOrderForm userId />
        </div>
      </section>
    </>
  )
}

export default UserCart
