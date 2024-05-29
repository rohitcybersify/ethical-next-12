import React, { useState, useEffect } from 'react'
import Styles from './shipping.module.css'
import SideBar from '../../../components/admin/SideBar/SideBar'
import Navbar from '../../../components/admin/Navbar/Navbar'
import { FaArrowLeftLong } from 'react-icons/fa6'
import StepForm from '../../../components/admin/step-form/StepForm'
import images from '../../../constants/images'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Layout from '../../../components/super-adminLayout/Layout'
const ShippingStatus = () => {
  const router = useRouter()
  const { payment_intent } = router.query
  const [data, setData] = useState(null)
  useEffect(() => {
    if (router.query.payment_intent !== '' && router.query.payment_intent) {
      fetchData(router.query.payment_intent)
    }
  }, [router.query.payment_intent])
  const fetchData = async (details) => {
    let payment_intent = {
      id: details,
    }
    try {
      const response = await fetch(
        'https://frontend.goaideme.com/transaction_status',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payment_intent),
        }
      )
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }
      const responseData = await response.json()
      setData(responseData)
    } catch (error) {
      return
    }
  }
  return (
    <>
      <Layout>
        {/* address section */}
        <div className={Styles.address_section}>
          <div className={Styles.address_container}>
            <Image
              src={images.Ethical_swag_small_logo}
              width={60}
              height={60}
            />
            <p>Delivery by UPS</p>
            <span>Tracking ID : #3547789</span>
          </div>
          <div className={Styles.address_container}>
            <p>
              Invoice: <span>#3547789</span>
            </p>
            <p>
              Email: <span>info@ethicalswag.com</span>
            </p>
            <p>
              Web: <span>www.ethicalswag.com</span>
            </p>
          </div>
        </div>
        {/* table content */}
        <div className={Styles.user_content}>
          <table>
            <tr>
              <th>Product</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
            {Array.from({ length: 2 }).map((item, index) => (
              <tr key={index}>
                <td>
                  <Image
                    src={images.shirt_small}
                    width={50}
                    height={50}
                    alt="image"
                  />
                </td>
                <td>Men’s Organic Cotton Hoodie</td>
                <td>200 packs</td>
                <td>$20000.00</td>
              </tr>
            ))}
          </table>
        </div>
        {/* total amount container */}
        <div className={Styles.total_amount_section}></div>
      </Layout>
    </>
  )
}
export default ShippingStatus
