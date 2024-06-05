'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import phoneImg from '../../assets/headerPics/phone.svg'
import styles from './primaryHeader.module.css'

import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md'
import loginIcon from '../../assets/login-icon.svg'
import signIcon from '../../assets/headerPics/Sign-up.svg'
import { useRouter } from 'next/router'
import { Button } from '@/components/ui/button'
import useFetch from '../../lib/useFetch'
import { useDispatch, useSelector } from 'react-redux'
import {
  resetOtherInfo,
  resetRegisterCart,
  resetShippingCart,
  setCurrentPage,
  setUserEmail,
  setuserId,
  setUserName,
} from 'redux-setup/authSlice'
import { toast } from 'react-toastify'
import {
  selectCountry,
  setUserCurrentCountry,
  checkCountryCode,
} from 'redux-setup/countrySlice'
import { deleteAllCartItems, setCartStates } from 'redux-setup/cartSlice'
// import SocketComponent from '@components/SocketComponent'

import { RiArrowDropDownLine } from 'react-icons/ri'
import { setActiveLink } from 'redux-setup/sidebarSlice'

const PrimaryHeader = () => {
  const router = useRouter()

  const dispatch = useDispatch()
  const [showOffer, setShowOffer] = useState(false)
  const country = useSelector((state) => state.country.country)
  const [screenSize, setScreenSize] = useState(992)
  const permission = localStorage.getItem('locationPermissionDenied')

  const [userLatitude, setUserLatitude] = useState(null)
  const [userLongitude, setUserLongitude] = useState(null)
  const [permissionDenied, setPermissionDenied] = useState(false)
  const role = useSelector((state) => state.auth.role)

  const handleResize = () => {
    setScreenSize(window.innerWidth)
  }
  const userCurrentCountry = useSelector(
    (state) => state.country.userCurrentCountry
  )
  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    dispatch(setCurrentPage(router.asPath))
  }, [])

  const isLoggedIn = localStorage.getItem('token_swag')

  const [loadQuery, { response, loading, error }] = useFetch(`/auth/logout`, {
    method: 'get',
  })

  const logout = () => {
    localStorage.clear()
    dispatch(deleteAllCartItems())
    dispatch(setUserName(''))
    dispatch(setuserId(null))
    dispatch(setUserEmail(''))
    dispatch(setCartStates(''))
    dispatch(resetOtherInfo())
    dispatch(resetRegisterCart())
    dispatch(resetShippingCart())
    toast.success('Logged out successully', {
      position: 'top-center',
      autoClose: 1500,
    })
    router.push('/')
  }

  useEffect(() => {
    if (router.locale === 'en-us') {
      dispatch(selectCountry('usa'))
    } else if (router.locale === 'en-ca') {
      dispatch(selectCountry('canada'))
    }
  }, [router.locale])

  const handleLogin = () => {
    router.push('/login')
  }

  const handleOffer = (link) => {
    setShowOffer(false)
    router.push(`/${link}`)
  }

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position?.coords
          setUserLatitude(latitude)
          setUserLongitude(longitude)
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            localStorage.setItem(
              'locationPermissionDenied',
              JSON.stringify(true)
            )
          }
        }
      )
    } else {
      return
    }
  }

  useEffect(() => {
    const isPermissionDenied = localStorage.getItem('locationPermissionDenied')
    if (isPermissionDenied === 'true') {
      return
    } else {
      getUserLocation(setPermissionDenied)
    }
  }, [])

  async function determineCurrentCountry() {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${userLatitude}&lon=${userLongitude}`
      )
      const data = await response.json()
      const country_code = data?.address?.country_code
      localStorage.setItem('locationPermissionDenied', JSON.stringify(true))
      let checkCountryCode
      if (country === 'usa') {
        checkCountryCode = 'us'
      } else if (country === 'canada') {
        checkCountryCode = 'ca'
      }
      if (country_code !== checkCountryCode) {
        localStorage.setItem('showPopup', JSON.stringify(true))
      } else if (country_code === checkCountryCode) {
        localStorage.setItem('showPopup', JSON.stringify(false))
      }
      if (country_code === 'ca') {
        dispatch(checkCountryCode(country_code))
        dispatch(selectCountry('canada'))
      } else if (country_code === 'us') {
        dispatch(checkCountryCode(country_code))
        dispatch(selectCountry('usa'))
      }

      router.push(router.asPath, undefined, {
        locale: country_code === 'ca' ? 'en-ca' : 'en-us',
      })
      dispatch(setUserCurrentCountry(country_code))
    } catch (error) {
      dispatch(setUserCurrentCountry(null))
      return null
    }
  }

  useEffect(() => {
    if (userLatitude && userLongitude) {
      determineCurrentCountry()
    }
  }, [userLatitude, userLongitude])
  return (
    <>
      <div className={`${styles.top_bar} ${styles.container}`}>
        <div className={styles.primary_header_container}>
          <div className={styles.container_left}>
            <div className={styles.offer_container}>
              <div className="">
                <Image
                  src={phoneImg}
                  alt="down arrow"
                  width={16}
                  height={15}
                  className={styles.arrowDown}
                />
              </div>
              <a href="tel:1-877-206-6998" style={{ cursor: 'pointer' }}>
                1-877-256-6998
              </a>
            </div>
            <div
              className={`${styles.position_relative} ${styles.offer_container}`}
            >
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className={styles.tap_annument}
                    style={{ cursor: 'pointer' }}
                    id="button_div"
                    onClick={() => setShowOffer(!showOffer)}
                  >
                    What we Offer
                    {showOffer ? (
                      <MdKeyboardArrowUp
                        fontSize={20}
                        onClick={() => setShowOffer(false)}
                      />
                    ) : (
                      <MdKeyboardArrowDown
                        fontSize={20}
                        onClick={() => setShowOffer(true)}
                      />
                    )}
                  </Button>
                </DropdownMenuTrigger>
              </DropdownMenu>
            </div>
          </div>
          <div className={styles.container_right}>
            {isLoggedIn ? (
              <>
                <div>
                  {screenSize <= 767 && (
                    <span className={styles.cursor_pointer}>
                      <Image
                        src={loginIcon}
                        alt="login"
                        width={13}
                        height={13}
                      />
                    </span>
                  )}
                </div>
                <div className={`${styles.cursor_pointer} ${styles.login_div}`}>
                  {screenSize > 991 && (
                    <button
                      className={styles.top_barbtn}
                      style={{ cursor: 'pointer' }}
                      onClick={logout}
                    >
                      Log Out
                    </button>
                  )}
                  {screenSize <= 991 && (
                    <span>
                      <button style={{ cursor: 'pointer' }}>
                        <Image
                          src={signIcon}
                          alt="Register"
                          width={18}
                          height={18}
                        />
                      </button>
                    </span>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className={styles.login_div} onClick={handleLogin}>
                  {screenSize > 767 && (
                    <button
                      className={styles.top_barbtn}
                      style={{ cursor: 'pointer' }}
                    >
                      Log In
                    </button>
                  )}
                  {screenSize <= 767 && (
                    <span className={styles.cursor_pointer}>
                      <Image
                        src={loginIcon}
                        alt="login"
                        width={13}
                        height={13}
                      />
                    </span>
                  )}
                </div>

                <div
                  className={`${styles.cursor_pointer} ${styles.login_div}`}
                  onClick={() => router.push('/register')}
                >
                  {screenSize > 991 && (
                    <button
                      className={styles.top_barbtn}
                      style={{ cursor: 'pointer' }}
                    >
                      Sign Up
                    </button>
                  )}
                  {screenSize <= 991 && (
                    <span>
                      <button style={{ cursor: 'pointer' }}>
                        <Image
                          src={signIcon}
                          alt="Register"
                          width={18}
                          height={18}
                        />
                      </button>
                    </span>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
        {/* <SocketComponent /> */}
      </div>

      {showOffer && (
        <div className={styles.offer_wrapper}>
          <ul role="menu" tabindex="-1">
            <li onClick={() => handleOffer('about-us')}>
              <div className={styles.hover_border}></div>
              <span className={styles.bold_text}>About Us</span>
            </li>

            <li onClick={() => handleOffer('how-to-order')}>
              <div className={styles.hover_border}></div>
              <span className={styles.bold_text}>How to Order</span>
            </li>

            <li onClick={() => handleOffer('services')}>
              <div className={styles.hover_border}></div>
              <span className={styles.bold_text}>Services</span>
            </li>

            <li onClick={() => handleOffer('faq')}>
              <div className={styles.hover_border}></div>
              <span className={styles.bold_text}>FAQ</span>
            </li>

            <li onClick={() => handleOffer('contact')}>
              <div className={styles.hover_border}></div>
              <span className={styles.bold_text}>Contact Us</span>
            </li>
          </ul>
        </div>
      )}
    </>
  )
}

export default PrimaryHeader
