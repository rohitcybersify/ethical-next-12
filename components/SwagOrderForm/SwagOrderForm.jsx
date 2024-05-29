import React, { useEffect, useState } from 'react'
import Styles from './SwagOrderForm.module.css'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../Button/Button'
import { useRouter } from 'next/router'
import { setDate } from 'redux-setup/FiltersSlice'
import { GrEdit } from 'react-icons/gr'
import images from '../../constants/images'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import Image from 'next/image'
import { setOtherInfo } from '../../redux-setup/authSlice'
import { toast } from 'react-toastify'
import { setCartStates } from '../../redux-setup/cartSlice'

const SwagOrderForm = ({ isBilling }) => {
  const [disable, setDisable] = useState(false)
  const router = useRouter()

  const dispatch = useDispatch()
  const userId = useSelector((state) => state.auth.userId)
  const registerCartValues = useSelector((state) => state.auth.registerCart)
  const otherInfoValues = useSelector((state) => state.auth.otherInfo)

  const [value, onChange] = useState(() => {
    let currentDate = new Date()
    if (currentDate.getDay() === 0) {
      currentDate.setDate(currentDate.getDate() + 1)
    } else if (currentDate.getDay() === 6) {
      currentDate.setDate(currentDate.getDate() + 2)
    }
    let skippedDays = 0
    while (skippedDays < 11) {
      currentDate.setDate(currentDate.getDate() + 1)
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
        skippedDays++
      }
    }
    return currentDate
  })

  const [isCalenderOpen, setIsCalenderOpen] = useState(false)
  let date = useSelector((state) => state.filter.date)

  const [values, setValues] = useState({
    textarea: '',
    swagPack: false,
    Warehousing: false,
    graphicDesign: false,
    pickAndPack: false,
    notSure: false,
  })

  const [errors, setErrors] = useState({
    textarea: '',
    date: '',
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    const newValue = type === 'checkbox' ? checked : value

    setValues((prevValues) => ({
      ...prevValues,
      [name]: newValue,
    }))

    if (name === 'date') {
      if (!value) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          date: 'Date is required.',
        }))
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          date: '',
        }))
      }
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (registerCartValues?.email === '' && userId === null) {
      toast.error('Please Register', {
        position: 'top-center',
        autoClose: 1500,
      })
    } else if (date === null) {
      toast.error('Please Select date', {
        position: 'top-center',
        autoClose: 1500,
      })
    } else {
      setDisable(true)
      setTimeout(() => {
        setDisable(false)
      }, 5000)
      dispatch(setCartStates(1))
      dispatch(
        setOtherInfo({
          date: date,
          textarea: values?.textarea,
          swagPack: values?.swagPack,
          Warehousing: values?.Warehousing,
          graphicDesign: values?.graphicDesign,
          pickAndPack: values?.pickAndPack,
          notSure: values?.notSure,
        })
      )
      router.push('/shipping')
    }
  }

  const handleDateFormat = (dates) => {
    if (!dates) return
    const dateObject = typeof dates === 'string' ? new Date(dates) : dates
    return dateObject?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  const tileDisabled = ({ date, view }) => {
    const currentDate = new Date()
    let skippedDays = 0
    while (skippedDays < 10) {
      currentDate.setDate(currentDate.getDate() + 1)
      const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6
      if (!isWeekend) {
        skippedDays++
      }
    }
    return date < currentDate || date.getDay() === 0 || date.getDay() === 6
  }

  const handleDateChange = (dates) => {
    setIsCalenderOpen(false)
    onChange(dates.toString())
    dispatch(setDate(dates.toString()))
  }

  useEffect(() => {
    setValues(otherInfoValues)
  }, [otherInfoValues])

  return (
    <>
      <form>
        <div className={Styles.SwagOrder_FAQ}>
          <>
            <div className={Styles.SwagOrder_faqInput}>
              <p>When do you need this order? *</p>
              <p
                className={Styles.select_date}
                onClick={
                  isBilling ? null : () => setIsCalenderOpen(!isCalenderOpen)
                }
              >
                {date && handleDateFormat(date)}
                {!date && 'select date'}
                <span>
                  <Image
                    src={images.Calender_form}
                    width={20}
                    height={20}
                    alt="calender_img"
                    className="calender_img"
                  />
                </span>
              </p>
              {isCalenderOpen && (
                <div className="cart_calender">
                  <Calendar
                    onChange={handleDateChange}
                    value={value}
                    tileDisabled={tileDisabled}
                  />
                </div>
              )}
              <span name="date" className={Styles.error}>
                {errors.date}
              </span>
            </div>

            <div className={Styles.SwagOrder_need}>
              <p>Notes about your order:</p>
              <textarea
                rows="4"
                type="text"
                id="textarea"
                name="textarea"
                placeholder="notes about your order"
                autoComplete="off"
                value={values?.textarea}
                onChange={handleChange}
                className={Styles.SwagOrder_need_textarea}
                disabled={isBilling}
              />
              <span name="textarea" className={Styles.error}>
                {errors.textarea}
              </span>
            </div>

            <div className={Styles.SwagOrder_interested_section}>
              <p>Are you interested in additional services?</p>
              <div className={Styles.SwagOrder_interested_section_fields}>
                <div className={Styles.inputs}>
                  <div className={Styles.custom_checkbox}>
                    <input
                      type="checkbox"
                      name="swagPack"
                      id="swagPack"
                      value={values?.swagPack}
                      onChange={handleChange}
                      checked={values?.swagPack}
                      disabled={isBilling}
                    />
                    <label for="swagPack">Swag Pack Kitting</label>
                  </div>
                </div>
                <div className={Styles.inputs}>
                  <div className={Styles.custom_checkbox}>
                    <input
                      type="checkbox"
                      name="Warehousing"
                      id="Warehousing"
                      value={values?.Warehousing}
                      onChange={handleChange}
                      checked={values?.Warehousing}
                      disabled={isBilling}
                    />
                    <label for="Warehousing">Warehousing</label>
                  </div>
                </div>
                <div className={Styles.inputs}>
                  <div className={Styles.custom_checkbox}>
                    <input
                      type="checkbox"
                      name="graphicDesign"
                      id="graphicDesign"
                      value={values?.graphicDesign}
                      onChange={handleChange}
                      checked={values?.graphicDesign}
                      disabled={isBilling}
                    />
                    <label for="graphicDesign">Graphic Design</label>
                  </div>
                </div>
                <div className={Styles.inputs}>
                  <div className={Styles.custom_checkbox}>
                    <input
                      type="checkbox"
                      name="pickAndPack"
                      id="pickAndPack"
                      value={values?.pickAndPack}
                      onChange={handleChange}
                      checked={values?.pickAndPack}
                      disabled={isBilling}
                    />
                    <label for="pickAndPack">Pick and Pack</label>
                  </div>
                </div>
                <div className={Styles.inputs}>
                  <div className={Styles.custom_checkbox}>
                    <input
                      type="checkbox"
                      name="notSure"
                      id="notSure"
                      value={values?.notSure}
                      checked={values?.notSure}
                      onChange={handleChange}
                      disabled={isBilling}
                    />
                    <label for="notSure">Not Sure</label>
                  </div>
                </div>
              </div>
            </div>

            {!isBilling && (
              <Button
                onClick={onSubmit}
                disabled={!date}
                from="cart"
                disable={disable}
              />
            )}
          </>

          {isBilling && (
            <button
              type="button"
              onClick={() => router.push('/cart')}
              className="edit_button"
            >
              <GrEdit />
              Edit
            </button>
          )}
        </div>
      </form>
    </>
  )
}

export default SwagOrderForm
