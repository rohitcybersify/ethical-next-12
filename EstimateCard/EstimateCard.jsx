import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { GrEdit } from 'react-icons/gr'
import Styles from './EstimateCard.module.css'
import { toast } from 'react-toastify'
import images from '../../constants/images'
import {
  deleteCartItem,
  deleteAllCartItems,
  setOrderPlaced,
  clearEmptyCart,
} from '../../redux-setup/cartSlice'
import {
  resetRegisterCart,
  resetOtherInfo,
  resetShippingCart,
} from '../../redux-setup/authSlice'
import useFetch from '../../lib/useFetch'
import { PDFViewer, pdf } from '@react-pdf/renderer'
import Card from '@components/dummy/Card'
import { saveAs } from 'file-saver'
import PrintedComponent from '../PrintedComponent/PrintedComponent'
import Loaders from '../loaders/Loaders'
import axios from 'axios'
import {
  setCollectionForUrl,
  setProductID,
} from '../../redux-setup/categorySlice'
import NewLoader from '../newLoader/NewLoader'

const EstimateCard = () => {
  const dispatch = useDispatch()

  const router = useRouter()
  const userEmail = useSelector((state) => state.auth.userEmail)
  const userName = useSelector((state) => state.auth.userName)
  const [totalCartPrice, setTotalCartPrice] = useState(0)
  const [active, setActive] = useState(false)
  const [Id, setId] = useState(null)
  const [userActive, setUserActive] = useState(false)

  const cartItems = useSelector((state) => state.cart.cartItems)

  const shipingCartValues = useSelector((state) => state.auth.shippingCart)
  const otherInfo = useSelector((state) => state.auth.otherInfo)

  const registerCartValues = useSelector((state) => state.auth.registerCart)

  const userId = useSelector((state) => state.auth.userId)

  const handleDelete = (val) => {
    dispatch(deleteCartItem(val))
  }

  const handleClearOrders = () => {
    dispatch(deleteAllCartItems())
    dispatch(clearEmptyCart('Cart'))
  }

  const [
    loadQuery,
    { response: loginResponse, loading: loginLoading, error: loginError },
  ] = useFetch(
    `/bulkestimate/${userId ? userId : Id}`,
    {
      method: 'post',
    },
    'formdata'
  )

  const [
    registerQuery,
    {
      response: registerResponse,
      loading: registerLoading,
      error: registerError,
    },
  ] = useFetch(
    `/auth/register`,
    {
      method: 'post',
    },
    'formdata'
  )

  useEffect(() => {
    if (active) {
      let formData = new FormData()
      formData.append('name', registerCartValues.name)
      formData.append('email', registerCartValues.email)
      formData.append('password', registerCartValues.password)
      formData.append('c_password', registerCartValues.c_password)

      registerQuery(formData)
    }
  }, [active])

  useEffect(() => {
    if (registerResponse) {
      toast.success(registerResponse?.message, {
        position: 'top-center',
        autoClose: 1500,
      })
      setId(registerResponse?.id)

      const formData = new FormData()
      cartItems.forEach((item, index) => {
        Object.keys(item).forEach((key) => {
          if (key === 'logoImg') {
            formData.append(`${key}_${index}`, item[key])
          }
        })
      })
      formData.append('cartItems', JSON.stringify(cartItems))
      formData.append('step1State', JSON.stringify(otherInfo))
      formData.append('address', JSON.stringify(shipingCartValues))
      formData.append('userId', JSON.stringify(registerResponse?.id))
      formData.append('userEmail', JSON.stringify(registerCartValues.email))
      formData.append('userName', JSON.stringify(registerCartValues.name))

      loadQuery(formData)
      setActive(false)
    } else if (registerError) {
      toast.error(registerError?.response?.data?.error?.email[0], {
        position: 'top-center',
        autoClose: 1500,
      })
      setActive(false)
    }
  }, [registerResponse, registerError])

  useEffect(() => {
    if (userActive) {
      const formData = new FormData()
      cartItems.forEach((item, index) => {
        Object.keys(item).forEach((key) => {
          if (key === 'logoImg') {
            formData.append(`${key}_${index}`, item[key])
          }
        })
      })

      formData.append('cartItems', JSON.stringify(cartItems))
      formData.append('step1State', JSON.stringify(otherInfo))
      formData.append('address', JSON.stringify(shipingCartValues))
      formData.append('userId', JSON.stringify(userId))
      formData.append('userEmail', JSON.stringify(userEmail))
      formData.append('userName', JSON.stringify(userName))

      loadQuery(formData)
    }
  }, [userActive])

  const downLoadPdf = async () => {
    const timestamp = new Date().toISOString().replace(/[-T:\.Z]/g, '')
    const blob = await pdf(
      <Card cartItems={cartItems} totalCartPrice={totalCartPrice} />
    ).toBlob()
    saveAs(blob, `Order_${timestamp}`)
  }

  const handleSubmit = () => {
    if (userId === null && registerCartValues?.email === '') {
      toast.error('Please register first to submit order', {
        position: 'top-center',
        autoClose: 1500,
      })
    } else if (userId) {
      setUserActive(true)
    } else if (registerCartValues?.email !== '') {
      setActive(true)
    }
  }

  useEffect(() => {
    if (loginResponse) {
      dispatch(setOrderPlaced(loginResponse?.data))
      dispatch(deleteAllCartItems())
      dispatch(clearEmptyCart('billing-address'))

      router.push('/thank-you')
    } else if (loginError) {
      if (loginError?.response?.status === 500) {
        toast.error('Something went wrong try again', {
          position: 'top-center',
          autoClose: 1500,
        })
      }
    }
  }, [loginResponse, loginError])

  useEffect(() => {
    if (cartItems.length > 0) {
      const totalPriceSum = cartItems.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.totalPrice
      }, 0)
      setTotalCartPrice(totalPriceSum)
    }
  }, [cartItems])

  const handleEdit = (item) => {
    dispatch(setProductID(item?.id))
    const formattedSlug = item?.heading
      ? item?.heading.toLowerCase().replace(/[ %]/g, '-')
      : ''
    dispatch(setCollectionForUrl(''))
    router.push(`/products/${formattedSlug}`)
  }

  return (
    <>
      <div className={Styles.estimate_wrapper}>
        <div className={Styles.estimate_container}>
          <div className={Styles.estimate_container_top}>
            <>
              <div className={Styles.estimate_container_Products}>
                {cartItems.map((item, index) => (
                  <div className={Styles.estimate_content} key={item.id}>
                    <div
                      className={Styles.estimate_content_imgContent}
                      style={{ cursor: 'pointer' }}
                    >
                      <Image
                        src={item.image ? item.image : images.No_product}
                        width={49}
                        height={66}
                        alt="product_image"
                      />
                    </div>
                    <div className={Styles.estimate_content_textContent}>
                      <h4
                        className={Styles.title}
                        style={{ cursor: 'pointer' }}
                      >
                        {item?.heading?.slice(0, 70)}
                      </h4>
                      <span className={Styles.price}>
                        Price : Starting at ${item.pricePerUnit}
                      </span>
                      <div className={Styles.amountwrapper}>
                        <div className={Styles.amountContainer}>
                          <div>{item.quantity}</div>
                        </div>
                        <div className="">
                          <button
                            style={{ cursor: 'pointer', marginLeft: '5px' }}
                            onClick={() => handleDelete(item.id)}
                          >
                            <Image
                              src={images.delete_icon}
                              width={14}
                              height={16}
                              alt="delete_icon"
                            />
                          </button>
                          <button
                            style={{ marginLeft: '15px', color: '#A2D061' }}
                            onClick={() => handleEdit(item)}
                            type="button"
                          >
                            <GrEdit />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className={Styles.estimate_container_bottom}>
                <div className={Styles.estimate_horizontal_line}></div>
                <div className={Styles.total_amount_container}>
                  <span className={Styles.text}>Total Estimate</span>
                  <span className={Styles.price}>
                    ${totalCartPrice.toFixed(2)}
                  </span>
                </div>
                <button
                  className={Styles.estimate_bottom_btn}
                  type="button"
                  onClick={downLoadPdf}
                >
                  Save .pdf Copy for later
                </button>

                {loginLoading ? (
                  <NewLoader />
                ) : (
                  <button
                    className={Styles.estimate_bottom_btn}
                    onClick={handleSubmit}
                    disabled={router.pathname !== '/billing-address'}
                  >
                    Submit Estimate Request
                  </button>
                )}

                <>
                  <div>
                    <p>
                      Total estimate doesn't include taxes and shipping fees.
                      Payment is made after mockups are approved.
                    </p>
                  </div>
                </>
                <div className={Styles.estimate_clear_content}>
                  <button
                    className={Styles.estimate_clear_btn}
                    onClick={handleClearOrders}
                  >
                    Clear Orders
                  </button>
                </div>
              </div>
            </>
          </div>
        </div>
      </div>
    </>
  )
}

export default EstimateCard
