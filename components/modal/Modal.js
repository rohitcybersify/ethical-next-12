import React, { useEffect, useState } from 'react'
import Style from './Modal.module.css'
import { useDispatch, useSelector } from 'react-redux'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { setDate, setSwiftSwag } from 'redux-setup/FiltersSlice'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { setCollectionForUrl } from 'redux-setup/categorySlice'
const Modal = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [isOpenModal, setIsOpenModal] = useState(false)
  // const [value, onChange] = useState(
  //   new Date(new Date().setDate(new Date().getDate()))
  // )
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
  const [isOpenCalender, setIsOpenCalender] = useState(false)
  let swiftSwag = useSelector((state) => state.filter.swiftSwag)
  let date = useSelector((state) => state.filter.date)
  useEffect(() => {
    if (swiftSwag === '') {
      setIsOpenModal(true)
      document.documentElement.style.overflow = 'hidden'
    } else {
      document.documentElement.style.overflow = 'auto'
    }
  }, [isOpenModal])
  const handleCloseModal = () => {
    if (value === null) {
      toast.error('Please select date from calender')
    } else {
      dispatch(setSwiftSwag(true))
      dispatch(setDate(value))
      setIsOpenModal(false)
      router.push(router.asPath)
    }
  }
  const handlePush = () => {
    dispatch(setSwiftSwag(false))
    setIsOpenModal(false)
    router.push(router.asPath)
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
  return (
    <>
      {isOpenModal && !isOpenCalender && (
        <div className={Style.overlay}>
          <div className={Style.modal_content}>
            <div className={Style.flex_calender}>
              <div
                className={Style.Calendar_content_wrapper}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'baseline',
                }}
              >
                {!isOpenCalender && (
                  <>
                    <h2>Do you have a strict deadline for delivery?</h2>
                    <p>
                      Swift Swag is our popular service designed to serve up
                      your swag in a jiffy! The production time for a bulk order
                      is 20 business days on average.If you need it sooner, shop
                      our Swift Swag collection. We can produce and deliver
                      these products within 10 business days from order approval
                      date.
                    </p>
                    <div className={Style.label_field}>
                      <div>
                        <button
                          type="button"
                          className={Style.Popup_btnone}
                          onClick={handlePush}
                        >
                          No, I have a flexible timeline
                        </button>
                      </div>
                      <div>
                        <button
                          type="button"
                          className={Style.Popup_btntwo}
                          onClick={() => {
                            setIsOpenCalender(true)
                          }}
                        >
                          Yes I have tight timeline
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {isOpenModal && isOpenCalender && (
        <div className={Style.overlay}>
          <div className={Style.modal_content}>
            <span className={Style.close} onClick={() => setIsOpenModal(false)}>
              &times;
            </span>
            <div className={Style.flex_calender}>
              {isOpenCalender && (
                <div className={Style.Calendar_wrapper}>
                  <h3>Please select your requested delivery date</h3>
                  <Calendar
                    onChange={onChange}
                    value={value}
                    tileDisabled={tileDisabled}
                  />
                  <p>
                    All products in your swift swag order must be selected from
                    our swift swag collection. Choosing products outside of our
                    swift swag collection will require an in hands date greater
                    than 10 business days
                  </p>
                  <div className={Style.label_field}>
                    <button
                      type="button"
                      className={Style.Popup_btncalender}
                      onClick={() => setIsOpenCalender(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className={Style.Popup_btncalenderTwo}
                      onClick={handleCloseModal}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default Modal
