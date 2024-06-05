import React, { useEffect, useState } from 'react'
import Styles from './Location.module.css'
import { selectCountry } from 'redux-setup/countrySlice'
import { useDispatch, useSelector } from 'react-redux'
import { Router } from 'lucide-react'
import { useRouter } from 'next/router'

const Location = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [openModal, setOpenModal] = useState(false)
  const checkCode = useSelector((state) => state.country.countryCode)
  const countryFromRedux = useSelector((state) => state.country.country)
  const showPopup = localStorage.getItem('showPopup')

  useEffect(() => {
    if (showPopup === 'true') {
      setOpenModal(true)
    } else {
      setOpenModal(false)
    }
  }, [showPopup])

  const handlePopup = (country) => {
    dispatch(selectCountry(country))
    localStorage.setItem('showPopup', JSON.stringify(false))
    setOpenModal(false),
      router.push(router.asPath, undefined, {
        locale: country === 'canada' ? 'en-ca' : 'en-us',
      })
  }

  return (
    <>
      {openModal ? (
        <div className={Styles.container_overlay}>
          <div className={Styles.popup}>
            <h2 className={Styles.heading}>Welcome </h2>

            <p>
              To check our products designed specifically for your country.
              Please choose your location.
            </p>
            <div className={Styles.flex_row}>
              <button
                className={`${Styles.link_btn} ${Styles.us_btn}`}
                onClick={() => handlePopup('usa')}
              >
                Visit the US site
              </button>
              <button
                className={`${Styles.link_btn} ${Styles.canada_btn}`}
                onClick={() => handlePopup('canada')}
              >
                Go to CA site
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default Location
