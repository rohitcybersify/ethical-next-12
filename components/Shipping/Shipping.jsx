import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Country, State, City } from 'country-state-city'
import {
  postcodeValidator,
  postcodeValidatorExistsForCountry,
} from 'postcode-validator'
import { useRouter } from 'next/router'
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik'

import Button from '../Button/Button'
import {
  setCartStates,
  setStep2State,
  setreached3rdStep,
} from '../../redux-setup/cartSlice'
import { setShippingCart } from '../../redux-setup/authSlice'
import Styles from './Shipping.module.css'
import { toast } from 'react-toastify'
import Link from 'next/link'

const Shipping = () => {
  const dispatch = useDispatch()
  const [disable, setDisable] = useState(false)

  const countryFromRedux = useSelector((state) => state.country.country)
  const shippingCartValues = useSelector((state) => state.auth.shippingCart)

  const router = useRouter()
  const [values, setValues] = useState({
    singleAddress: 'single',
    country: countryFromRedux === 'canada' ? 'CA' : 'US',
    firstName: '',
    lastName: '',
    number: '',
    email: '',
    companyName: '',
    address: '',
    apartment: '',
    city: '',
    state: 'Select State',
    pin: '',
    terms: false,
    currency: countryFromRedux === 'canada' ? 'CA' : 'US',
  })

  const [error, setError] = useState({
    singleAddress: '',
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
    terms: false,
  })

  const country = useSelector((state) => state.country.country)

  useEffect(() => {
    if (countryFromRedux) {
      setValues({
        ...values,
        country: countryFromRedux === 'canada' ? 'CA' : 'US',
        state: values?.state ? values.state : countryFromRedux,
        currency: countryFromRedux === 'canada' ? 'CA' : 'US',
      })
    }
  }, [])

  useEffect(() => {
    setValues((prev) => ({
      ...prev,
      singleAddress:
        shippingCartValues?.singleAddress === 'multiple'
          ? 'multiple'
          : 'single',

      firstName: shippingCartValues?.firstName
        ? shippingCartValues.firstName
        : '',
      lastName: shippingCartValues?.lastName ? shippingCartValues.lastName : '',
      email: shippingCartValues?.email ? shippingCartValues.email : '',
      number: shippingCartValues?.number ? shippingCartValues.number : '',
      companyName: shippingCartValues?.companyName
        ? shippingCartValues.companyName
        : '',
      address: shippingCartValues?.address ? shippingCartValues.address : '',
      apartment: shippingCartValues?.apartment
        ? shippingCartValues.apartment
        : '',
      state: shippingCartValues?.state
        ? shippingCartValues.state
        : 'Select State',
      city: shippingCartValues?.city ? shippingCartValues.city : '',
      pin: shippingCartValues?.pin ? shippingCartValues.pin : '',
      terms: shippingCartValues?.terms
        ? shippingCartValues?.terms
        : values.terms,
    }))
  }, [shippingCartValues])

  useEffect(() => {
    if (values?.singleAddress === 'multiple') {
      setError({
        ...error,
        country: '',
        firstName: '',
        lastName: '',
        number: '',
        email: '',
        companyName: '',
        address: '',
        pin: '',
      })
      setValues({
        ...values,
        singleAddress: 'multiple',
        country: countryFromRedux === 'canada' ? 'CA' : 'US',
        firstName: '',
        lastName: '',
        number: '',
        email: '',
        companyName: '',
        address: '',
        pin: '',
        city: '',
        state: 'Select State',
        apartment: '',
      })
    }
  }, [values?.singleAddress])

  const onSubmit = (e) => {
    e.preventDefault()

    const updatedError = {
      singleAddress: '',
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

    if (values?.singleAddress === 'single') {
      if (values?.firstName.trim() === '') {
        updatedError.firstName = 'Required'
      }
      if (values?.lastName.trim() === '') {
        updatedError.lastName = 'Required'
      }
      if (
        values?.number.trim() !== '' &&
        !/^[0-9]{10}$/.test(values.number.trim())
      ) {
        updatedError.number = 'Invalid Number'
      }
      if (values?.email.trim() === '') {
        updatedError.email = 'Required'
      }
      if (
        values?.email.trim() !== '' &&
        !/\S+@\S+\.\S+/.test(values.email.trim())
      ) {
        updatedError.email = 'Invalid email address'
      }

      if (values?.companyName.trim() === '') {
        updatedError.companyName = 'Required'
      }
      if (values?.address.trim() === '') {
        updatedError.address = 'Required'
      }
      if (values?.state === 'Select State') {
        updatedError.state = 'Required'
      }
      if (values?.city === '') {
        updatedError.city = 'Required'
      }
      if (values?.pin.trim() === '') {
        updatedError.pin = 'Required'
      }
      if (values?.terms === false) {
        updatedError.terms = 'You must accept the terms and conditions'
      } else {
        const isValidPin = postcodeValidator(values.pin, values.country)

        if (!isValidPin) {
          updatedError.pin = `${
            values?.country === 'CA' ? 'Postal' : 'Zip'
          } code is not valid`
        }
      }
    }

    if (Object.values(updatedError).some((err) => err !== '')) {
      setError(updatedError)
      return
    } else if (values?.singleAddress === 'multiple') {
      dispatch(setShippingCart(values))
      setDisable(true)
      setTimeout(() => {
        setDisable(false)
      }, 3000)
      dispatch(setCartStates(2))
      router.push('/billing-address')
    } else {
      setDisable(true)
      setTimeout(() => {
        setDisable(false)
      }, 3000)
      dispatch(setCartStates(2))
      dispatch(setShippingCart(values))
      router.push('/billing-address')
    }
  }

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target

    setValues((prevValues) => ({
      ...prevValues,
      [name]: type === 'checkbox' ? checked : value,
    }))

    if (type === 'checkbox') {
      if (!checked) {
        setError((prevError) => ({
          ...prevError,
          [name]: 'You must accept the terms and conditions',
        }))
      } else {
        setError((prevError) => ({
          ...prevError,
          [name]: '',
        }))
      }
    } else if (name === 'number') {
      setError((prevError) => ({
        ...prevError,
        [name]: '',
      }))
    } else {
      if (value.trim() === '') {
        setError((prevError) => ({
          ...prevError,
          [name]: 'Required',
        }))
      } else {
        setError((prevError) => ({
          ...prevError,
          [name]: '',
        }))
      }
    }
  }

  return (
    <>
      <>
        <div className={Styles.shipping_container}>
          <form className={Styles.form}>
            <h3 className={Styles.form_title}>Ship order to *</h3>
            <div className={`${Styles.form_inputs} ${Styles.custom_select}`}>
              <select
                name="singleAddress"
                component="select"
                value={values?.singleAddress}
                onChange={handleChange}
              >
                <option value="Select Address" disabled>
                  Select Address...
                </option>
                <option value="single">Single</option>
              </select>
              <div
                name="singleAddress"
                component="div"
                className={Styles.error}
              />
            </div>

            {values?.singleAddress === 'single' && (
              <div
                className={`${Styles.form_inputs} ${Styles.flexInputs_canda}`}
              >
                <select
                  name="country"
                  value={values?.country}
                  onChange={handleChange}
                >
                  {countryFromRedux === 'usa' && (
                    <option value="US">USA</option>
                  )}
                  {countryFromRedux === 'canada' && (
                    <option value="CA">Canada</option>
                  )}
                </select>

                {values?.singleAddress === 'single' && (
                  <div name="country" className={Styles.error}>
                    {error.country}
                  </div>
                )}
              </div>
            )}

            {values?.singleAddress === 'single' && (
              <div className={`${Styles.form_inputs} ${Styles.flexInputs}`}>
                <input
                  type="text"
                  placeholder="First name"
                  name="firstName"
                  id="firstName"
                  autoComplete="off"
                  value={values?.firstName}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  placeholder="Last name"
                  name="lastName"
                  id="lastName"
                  autoComplete="off"
                  value={values?.lastName}
                  onChange={handleChange}
                />
              </div>
            )}

            {values?.singleAddress === 'single' && (
              <div className={`${Styles.form_inputs} ${Styles.flexInputs}`}>
                <div className="">
                  <div name="firstName" className={Styles.error}>
                    {error.firstName}
                  </div>
                </div>
                <div className="">
                  <div name="lastName" className={Styles.error}>
                    {error.lastName}
                  </div>
                </div>
              </div>
            )}

            {values?.singleAddress === 'single' && (
              <div className={Styles.form_inputs}>
                <input
                  type="text"
                  placeholder="Phone number"
                  name="number"
                  id="number"
                  value={values?.number}
                  onChange={handleChange}
                  autoComplete="off"
                />
                <div name="number" component="div" className={Styles.error}>
                  {error.number}
                </div>
              </div>
            )}

            {values?.singleAddress === 'single' && (
              <div className={Styles.form_inputs}>
                <input
                  type="email"
                  placeholder="Email address"
                  name="email"
                  id="email"
                  value={values?.email}
                  onChange={handleChange}
                  autoComplete="off"
                />
                <div name="email" component="div" className={Styles.error}>
                  {error.email}
                </div>
              </div>
            )}

            {values?.singleAddress === 'single' && (
              <div className={Styles.form_inputs}>
                <input
                  type="text"
                  placeholder="Company name"
                  name="companyName"
                  id="companyName"
                  value={values?.companyName}
                  onChange={handleChange}
                  autoComplete="off"
                />
                <div name="companyName" className={Styles.error}>
                  {error.companyName}
                </div>
              </div>
            )}

            {values?.singleAddress === 'single' && (
              <div className={Styles.form_inputs}>
                <input
                  type="text"
                  placeholder="Address"
                  name="address"
                  id="address"
                  value={values?.address}
                  onChange={handleChange}
                  autoComplete="off"
                />
                <div name="address" component="div" className={Styles.error}>
                  {error.address}
                </div>
              </div>
            )}

            {values.singleAddress === 'single' && (
              <div className={Styles.form_inputs}>
                <input
                  type="text"
                  placeholder="Appartment, suite, etc. (optional)"
                  name="apartment"
                  id="apartment"
                  value={values?.apartment}
                  onChange={handleChange}
                  autoComplete="off"
                />
                <div name="apartment" className={Styles.error} />
              </div>
            )}

            {values.singleAddress === 'single' && (
              <div className={`${Styles.form_inputs} ${Styles.flexInputs}`}>
                <div>
                  <select
                    name="state"
                    value={values?.state}
                    onChange={handleChange}
                  >
                    <option value="Select State" defaultValue>
                      Select State...
                    </option>
                    {State?.getStatesOfCountry(
                      values?.country
                        ? values?.country
                        : countryFromRedux === 'canada'
                        ? 'CA'
                        : 'US'
                    )?.map((option) => (
                      <>
                        <option value={option.isoCode}>{option.name}</option>
                      </>
                    ))}
                  </select>
                  <div name="state" component="div" className={Styles.error}>
                    {error.state}
                  </div>
                </div>
                <div>
                  <input
                    name="city"
                    placeholder="City"
                    autoComplete="off"
                    id="city"
                    value={values.city}
                    onChange={handleChange}
                  />

                  <div name="city" className={Styles.error}>
                    {error.city}
                  </div>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder={country === 'usa' ? 'Zip Code' : 'Postal Code'}
                    name="pin"
                    id="pin"
                    autoComplete="off"
                    value={values?.pin}
                    onChange={handleChange}
                  />

                  <div name="pin" className={Styles.error}>
                    {error.pin}
                  </div>
                </div>
              </div>
            )}

            <div className={`${Styles.form_inputs}`}>
              <div className={` ${Styles.flexInputs}  ${Styles.agreecheck}`}>
                <div className={Styles.custom_checkbox}>
                  <input
                    type="checkbox"
                    name="terms"
                    value={values?.terms}
                    id="terms"
                    checked={values?.terms}
                    onChange={handleChange}
                  />
                  <label htmlFor="terms">
                    I agree to the{' '}
                    <Link
                      href="/terms-of-service"
                      replace
                      passHref
                      className={Styles.textUnderline}
                    >
                      <a target="_blank">terms & conditions | privacy policy</a>
                    </Link>
                  </label>
                </div>
                <div name="radio" className={Styles.error} />
              </div>
              {/* Shipping Form */}
            </div>

            <Button
              disabled={
                (values?.singleAddress === 'single' && !values?.terms) ||
                (values?.singleAddress === 'multiple' && !values?.terms) ||
                Object.values(error).every((item) => item !== '')
              }
              onClick={onSubmit}
              from="shipping"
              disable={disable}
            />
          </form>
        </div>
      </>
    </>
  )
}

export default Shipping
