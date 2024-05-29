import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import images from '../constants/images'
import PrimaryHeader from '../components/primary-header/PrimaryHeader'
import SecondaryHeader from '../components/secondary-header/SecondaryHeader'
import Footer from '../components/footer/Footer'
import Calendar from 'react-calendar'
import Styles from './../styles/Contact.module.css'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { IoLocationSharp } from 'react-icons/io5'

import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaPhoneAlt,
} from 'react-icons/fa'
import {
  initialValuesContact,
  validationSchemaContact,
} from '../lib/validationSchemas'
import useFetch from '../lib/useFetch'
import { toast } from 'react-toastify'
import { NextSeo } from 'next-seo'

const contact = () => {
  const [terms, setTerms] = useState(false)
  const resetFormRef = useRef(null)

  const currentDate = new Date()
  const tomorrowDate = new Date(currentDate)
  tomorrowDate.setDate(currentDate.getDate() + 1)
  const [value, onChange] = useState(
    new Date(new Date().setDate(new Date().getDate() + 1))
  )

  const [loadQuery, { response, loading, error }] = useFetch(
    `/save-contact-details`,
    {
      method: 'post',
    },
    'formdata'
  )

  const handleChange = (event) => {
    setTerms(!terms)
  }

  const onSubmit = async (values) => {
    if (!terms) {
      toast.error('Please accept terms and conditions', {
        position: 'top-center',
        autoClose: 1500,
      })
    } else if (terms && values && value) {
      try {
        let formData = new FormData()
        formData.append('company_name', values.companyName)
        formData.append('first_name', values.firstName)
        formData.append('last_name', values.lastName)
        formData.append('phone_no', values.number)
        formData.append('email', values.email)
        formData.append('how_long', values.ethicalSwagReferral)
        formData.append('message', values.description)
        formData.append('meeting_time', value)
        formData.append('is_termConditions', terms ? 1 : 0)
        formData.append('completed', 0)
        loadQuery(formData)
      } catch (error) {
        return
      }
    }
  }

  useEffect(() => {
    if (response) {
      if (resetFormRef.current) {
        resetFormRef.current()
        setTerms(false)
      }
      onChange(new Date(new Date().setDate(new Date().getDate() + 1)))
      toast.success(response?.message, {
        position: 'top-center',
        autoClose: 1500,
      })
    } else if (error) {
      if (error?.response?.data?.errors?.meeting_time?.length !== 0) {
        toast.error('Please select date for meeting', {
          position: 'top-center',
          autoClose: 1500,
        })
      }
    }
  }, [response, error])

  const handleChangeCalendar = (date) => {
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
    const formattedTime = `${tomorrowDate
      .getHours()
      .toString()
      .padStart(2, '0')}:${tomorrowDate
      .getMinutes()
      .toString()
      .padStart(2, '0')}:${tomorrowDate
      .getSeconds()
      .toString()
      .padStart(2, '0')}`
    const formattedDateTime = `${formattedDate} ${formattedTime}`
    onChange(formattedDateTime)
  }

  const tileDisabled = ({ date, view }) => {
    return view === 'month' && date < new Date().setDate(new Date().getDate())
  }

  return (
    <>
       <NextSeo
            title="Contact | Ethical Swag"
            description="Use the form below to send your message. A member of our team will reach out to you within 1 business day. If you don't hear from us in this time frame, please check your spam box. Prefer to call? You can reach us at: :phone: 1-877-256-6998 :phone: 1-902-500-1086"
        />
      <PrimaryHeader />
      <SecondaryHeader />

      <div className={Styles.container_div}>
        <div className={Styles.Contact_container}>
          <div className={Styles.left_Section}>
            <div className={Styles.left_Section_Content}>
              <h2 className={Styles.heading}>Contact Information</h2>
              <p className={Styles.text_content}>
                Use the form to send your message. A member of our team will
                reach out to you within 1 business day. If you don't hear from
                us in this time frame, please check your spam box. Prefer to
                call?
              </p>
              <div className={Styles.horizontal_line}></div>
              <div className={Styles.contact_numbers_container}>
                <div className={Styles.telephone_icon}>
                  <FaPhoneAlt color="#a2d061" />
                </div>
                <div className={Styles.numbers}>
                  <a href="tel:+1 (877) 256-6998">+1 (877) 256-6998</a>
                  <a href="tel:+1 (902) 500-1086">+1 (902) 500-1086</a>
                  <span>Call Now and Get a FREE consultation</span>
                </div>
              </div>
              <div className={Styles.horizontal_line}></div>

              <div className={Styles.contact_numbers_container}>
                <div className={Styles.location_icon}>
                  <IoLocationSharp color="#a2d061" />
                </div>
                <div className={Styles.address}>
                  <h4>Address</h4>
                  <span>PO Box 764 Stn A, Sydney, NS B1P 6J1, Canada</span>
                </div>
              </div>
              <div className={Styles.horizontal_line}></div>

              <div className={Styles.meeting_section}>
                <h2>Schedule a Quick meeting</h2>

                <div className="Div_contact">
                  <Calendar
                    onChange={handleChangeCalendar}
                    value={value}
                    tileDisabled={tileDisabled}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={Styles.right_Section}>
            <Formik
              initialValues={initialValuesContact}
              validationSchema={validationSchemaContact}
              onSubmit={(values, { resetForm }) => {
                resetFormRef.current = resetForm
                onSubmit(values)
              }}
            >
              {({ values, errors }) => (
                <>
                  <Form>
                    <div className={Styles.inputs}>
                      <Field
                        type="text"
                        id="text"
                        name="companyName"
                        placeholder="Company Name"
                      />
                      <ErrorMessage
                        name="companyName"
                        component="span"
                        className={Styles.error}
                      />
                    </div>

                    <div className={Styles.Div_wraper}>
                      <div className={Styles.inputs}>
                        <Field
                          type="text"
                          name="firstName"
                          placeholder="First Name"
                        />
                        <ErrorMessage
                          name="firstName"
                          component="span"
                          className={Styles.error}
                        />
                      </div>
                      <div className={Styles.inputs}>
                        <Field
                          type="text"
                          name="lastName"
                          placeholder="Last Name"
                        />
                        <ErrorMessage
                          name="lastName"
                          component="span"
                          className={Styles.error}
                        />
                      </div>
                    </div>
                    <div className={Styles.inputs}>
                      <Field
                        type="number"
                        id="number"
                        name="number"
                        placeholder="Phone Number"
                      />
                      <ErrorMessage
                        name="number"
                        component="span"
                        className={Styles.error}
                      />
                    </div>
                    <div className={Styles.inputs}>
                      <Field
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Enter email"
                      />
                      <ErrorMessage
                        name="email"
                        component="span"
                        className={Styles.error}
                      />
                    </div>
                    <div className={Styles.inputs}>
                      <Field
                        type="text"
                        id="ethicalSwagReferral"
                        name="ethicalSwagReferral"
                        placeholder="How did you hear about Ethical Swag ?"
                      />
                      <ErrorMessage
                        name="ethicalSwagReferral"
                        component="span"
                        className={Styles.error}
                      />
                    </div>
                    <div className={Styles.inputs}>
                      <Field
                        as="textarea"
                        id="description"
                        name="description"
                        placeholder="Message"
                        rows="5"
                        cols="50"
                      />
                      <ErrorMessage
                        name="description"
                        component="span"
                        className={Styles.error}
                      />
                    </div>
                    <div
                      className={`${Styles.input_radio} ${Styles.custom_checkbox}`}
                    >
                      <input
                        type="checkbox"
                        id="terms"
                        name="terms"
                        value={terms}
                        checked={terms}
                        onChange={handleChange}
                      />
                      <label htmlFor="terms">
                        I agree to the terms & conditions and privacy policy
                      </label>
                    </div>
                    <div className={Styles.inputs}>
                      <button
                        type="submit"
                        disabled={
                          !terms || Object.keys(values).length === 0 || loading
                        }
                        style={{
                          opacity:
                            !terms ||
                            Object.keys(values).length === 0 ||
                            loading
                              ? '0.7'
                              : 1,
                          cursor:
                            !terms ||
                            Object.keys(values).length === 0 ||
                            loading
                              ? 'default'
                              : 'pointer',
                        }}
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                </>
              )}
            </Formik>
          </div>
        </div>
        <div className={Styles.iconBox}>
          <div className={Styles.info_section}>
            <Link
              href="mailto:info+swagpackca@ethicalswag.com"
              target="_blank"
              style={{ textTransform: 'lowercase' }}
            >
              info@ethicalswag.com
            </Link>
          </div>
          <div className={Styles.social_icons}>
            <div className="icon">
              <a href="https://www.facebook.com/ethicalswag" target="_blank">
                <FaFacebookF fontSize={18} cursor={'pointer'} />
              </a>
            </div>
            <div className="icon">
              <a href="https://www.instagram.com/ethicalswag/" target="_blank">
                <FaInstagram />
              </a>
            </div>
            <div className="icon">
              <a
                href="https://www.linkedin.com/company/ethical-swag/"
                target="_blank"
              >
                <FaLinkedinIn />
              </a>
            </div>
            <div className="icon">
              <a
                href="https://www.youtube.com/channel/UCLQe2_4Tf2k8BOsgM8bWOjA"
                target="_blank"
              >
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default contact
