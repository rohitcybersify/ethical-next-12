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
  const [welcomePopup, setWelcomePopUp] = useState(false)
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
    setWelcomePopUp(true)
    localStorage.setItem('showPopup', JSON.stringify(false))
    setOpenModal(false),
      router.push(router.asPath, undefined, {
        locale: country === 'canada' ? 'en-ca' : 'en-us',
      })
  }

  const handleClose = () => {
    setWelcomePopUp(false)
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

      {welcomePopup && (
        <div className={Styles.container_overlay}>
          <div className={`${Styles.popup} ${Styles.welcom_popup}`}>
            <span className={Styles.closeBtn} onClick={handleClose}>
              &times;
            </span>
            <h2 className={Styles.heading}>
              Thanks for visiting Ethical Swag!
            </h2>
            <p>
              We’re super excited to have just launched a new version of our
              website, however, you may notice that there may be some features
              and info that may not be displaying correctly just yet. Thanks for
              your patience while we work through these issues and make our site
              and experience AMAZING for you! If you have any issues, or would
              like to provide feedback on anything you see that does not look
              quite right, please reach out to a team member at
              swag@ethicalswag.com or message us in our chat box so we can get
              it fixed up right away and we can also help you directly with any
              questions or requests.
            </p>
          </div>
        </div>
      )}
    </>
  )
}

export default Location
