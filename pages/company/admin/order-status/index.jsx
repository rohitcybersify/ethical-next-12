import React from 'react'
import Styles from './OrderStatus.module.css'
import SideBar from '../../../../components/admin/SideBar/SideBar'
import Navbar from '../../../../components/admin/Navbar/Navbar'
import Image from 'next/image'
import images from '../../../../constants/images'
import StepForm from '../../../../components/admin/step-form/StepForm'
import { FaArrowLeftLong } from 'react-icons/fa6'

const OrderStatus = () => {
  return (
    <>
      <section className={Styles.OrderStatus_section}>
        <div className={Styles.OrderStatus_section_container}>
          <div className={Styles.OrderStatus_content}>
            <div className={Styles.OrderStatus_left_content}>
              <SideBar data={images.Louis_Lara} />
            </div>
            <div className={Styles.OrderStatus_right_content}>
              <Navbar data="Order Status" thumbnail={images.User_icon} />
              <div className={Styles.middle_section}>
                <div className={Styles.right_icon}>
                  <FaArrowLeftLong color="#fff" fontSize={14} />
                </div>
                <div className={Styles.order_completion}>
                  <p>Order 1</p>
                  <p>Expected Completion</p>
                </div>
                <div className={Styles.order_detail_content}>
                  <span>order id - OD233873648734687289</span>
                  <span>Dec 12, 2023</span>
                </div>
                <div className={Styles.step_form_container}>
                  <StepForm />
                </div>

                {/* address section */}
                <div className={Styles.address_section}>
                  <div className={Styles.address_container}>
                    <Image
                      src={images.Ethical_swag_small_logo}
                      width={60}
                      height={60}
                    />
                    <p>Status Status</p>
                    <p>Order id - OD233873648734687289</p>
                    <span>Updated Dec 21,2023</span>
                  </div>
                  <div className={Styles.address_container}>
                    <p>Shipping Address</p>
                    <p>Brendon Morris</p>
                    <p>209 Street Avenue,Philadelphia USA, Zip : PQ243</p>
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
                    {Array.from({ length: 1 }).map((item, index) => (
                      <tr key={i}>
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
                {/* Order OrderStatus */}
                <div className={Styles.order_OrderStatus_content}>
                  <p>Your order has been placed!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default OrderStatus
