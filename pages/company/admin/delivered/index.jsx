import React from 'react'
import Styles from './Delivered.module.css'
import SideBar from '../../../../components/admin/SideBar/SideBar'
import Navbar from '../../../../components/admin/Navbar/Navbar'
import Image from 'next/image'
import images from '../../../../constants/images'
import StepForm from '../../../../components/admin/step-form/StepForm'

const Delivered = () => {
  return (
    <>
      <section className={Styles.Delivered_section}>
        <div className={Styles.Delivered_section_container}>
          <div className={Styles.Delivered_content}>
            <div className={Styles.Delivered_left_content}>
              <SideBar data={images.Louis_Lara} />
            </div>
            <div className={Styles.Delivered_right_content}>
              <Navbar data="Delivered swag pack" thumbnail={images.User_icon} />
              <div className={Styles.middle_section}>
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
                      <>
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
                      </>
                    ))}
                  </table>
                </div>
                {/* Order Delivered */}
                <div className={Styles.order_delivered_content}>
                  <p>Your order has been delivered!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Delivered
