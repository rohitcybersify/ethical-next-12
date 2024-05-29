import React, { useState } from 'react'
import Styles from './payment.module.css'
import Image from 'next/image'
import { Elements } from '@stripe/react-stripe-js'
import { FaArrowLeftLong } from 'react-icons/fa6'
import StepForm from '../../../components/admin/step-form/StepForm'
import images from '../../../constants/images'
import Layout from '../../../components/super-adminLayout/Layout'
import { loadStripe } from '@stripe/stripe-js'
import CheckoutForm from '../../../components/checkout/CheckoutForm'
import useFetch from '../../../lib/useFetch'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import WireTransfer from '../../../components/wireTransfer/WireTransfer'
const stripePromise = loadStripe(
  'pk_test_51OzXu4SG76jQkcdqTqTxJQtVVB6sMBGSKwqCdaBYx6xomtdS1bih43Vk1Rx8yp2f9YGHpJIkuT6OzAVZvc09W70C00LzSTnFZo'
)
const Payment = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [secretKey, setSecretKey] = useState(null)
  const userId = useSelector((state) => state.auth.userId)

  const [productDetails, setProductDetails] = useState([])
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState('wire_transfer')
  const [wireTransferModal, setWireTransferModal] = useState(false)
  const [
    getLoadQuery,
    { response: getUserData, loading: getUserLoading, error: getUserError },
  ] = useFetch(`/user/orders/view/${139}`, {
    method: 'get',
  })
  useEffect(() => {
    getLoadQuery()
  }, [])
  useEffect(() => {
    if (getUserData) {
      setProductDetails(getUserData?.data)
    } else if (getUserError) {
      return
    }
  }, [getUserData, getUserError])

  const handlePayment = (paymentMethod) => {
    setSelectedPaymentMethod(paymentMethod)
    if (paymentMethod === 'stripe') {
      makePayment()
    }
  }
  const makePayment = async (e) => {
    const {
      Addresses,
      payment_method,
      total_amount,
      user_id,
      order_number,
      product_details,
    } = productDetails
    const { postal_code, city, state, country, first_name, last_name, email } =
      Addresses
    const body = {
      description: product_details?.[0].heading,
      shipping: {
        name: first_name + last_name,
        address: {
          postal_code: postal_code,
          city: city,
          state: state,
          country: country,
        },
      },
      amount: 10,
      currency: 'usd',
      payment_method: payment_method,
      order_id: order_number,
      user_id: user_id,
      email: email,
    }
    setLoading(true)
    const headers = {
      'Content-Type': 'application/json',
    }
    const response = await fetch('https://frontend.goaideme.com/payment', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
    })
    const res = await response.json()
    const clientSecret = res.clientSecret

    setSecretKey(clientSecret)

    setLoading(false)
  }
  const options = {
    clientSecret: secretKey,
  }
  const handleWireTranser = () => {
    // setWireTransferModal(true)
    // router.push('/customer/wire-transfer')
  }
  return (
    <>
      {wireTransferModal && <WireTransfer />}
      <Layout>
        {
          <div className={Styles.middle_section}>
            <div className={Styles.wire_transfer_section}>
              <div className={Styles.container}>
                <div className={Styles.left_content}>
                  <div className={Styles.payment_option}>
                    <input
                      type="radio"
                      name="payment"
                      value="wire_transfer"
                      checked={selectedPaymentMethod === 'wire_transfer'}
                      onChange={() => handlePayment('wire_transfer')}
                    />
                    <span>Wire Transfer</span>
                  </div>
                  <div className={Styles.payment_option}>
                    <input
                      type="radio"
                      name="payment"
                      value="stripe"
                      checked={selectedPaymentMethod === 'stripe'}
                      onChange={() => handlePayment('stripe')}
                    />
                    <span>Stripe</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={Styles.wire_transfer_section}>
              <div className={Styles.container}>
                {selectedPaymentMethod === 'wire_transfer' && (
                  <div className={Styles.left_content}>
                    <div className={Styles.wire_transfer}>
                      <div className={Styles.wire_transfer_wrapper}>
                        <div className={Styles.imgContent}>
                          <Image
                            src={images.Wire_transfer_icon}
                            width={30}
                            height={30}
                            alt="wire-transfer-icon"
                          />
                        </div>
                        <div className={Styles.textContent}>
                          <h4>Wire Transfer (USD)</h4>
                          <p>
                            <span></span>
                            Send funds via wire to any bank in USD
                          </p>
                          <button onClick={handleWireTranser}>Setup</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedPaymentMethod === 'stripe' && secretKey && (
                  <Elements stripe={stripePromise} options={options}>
                    <CheckoutForm />
                  </Elements>
                )}
              </div>
            </div>
          </div>
        }
      </Layout>
    </>
  )
}
export default Payment
