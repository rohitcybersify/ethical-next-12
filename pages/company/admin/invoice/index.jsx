import React from 'react'
import Styles from './Invoice.module.css'
import SideBar from '../../../../components/admin/SideBar/SideBar'
import Navbar from '../../../../components/admin/Navbar/Navbar'
import images from '../../../../constants/images'
import { FaArrowLeftLong } from 'react-icons/fa6'
import StepForm from '../../../../components/admin/step-form/StepForm'
import Image from 'next/image'

const Invoice = () => {
  return (
    <>
      <section className={Styles.Invoice_section}>
        <div className={Styles.Invoice_section_container}>
          <div className={Styles.Invoice_content}>
            <div className={Styles.Invoice_left_content}>
              <SideBar data={images.Louis_Lara} />
            </div>
            <div className={Styles.Invoice_right_content}>
              <Navbar data="Invoice Detail" thumbnail={images.User_icon} />
              <div className={Styles.middle_section}>
                <div className={Styles.right_icon}>
                  <FaArrowLeftLong color="#fff" fontSize={14} />
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
                    <p>Address</p>
                    <div>89 Street Avenue, NY City USA, Zip : A1257</div>
                  </div>
                  <div className={Styles.address_container}>
                    <p>
                      Invoice: <span>#3547789</span>
                    </p>
                    <p>
                      Email: <span>info@ethicalswag.com</span>
                    </p>
                    <p>
                      Phone: <span>+1 (254) 453-5936</span>
                    </p>
                    <p>
                      Web: <span>www.ethicalswag.com</span>
                    </p>
                  </div>
                </div>

                {/* horizontal line */}
                <div className={Styles.horizontal_line}></div>
                {/* Invoice Section */}
                <div className={Styles.Invoice_container}>
                  <p>Invoice</p>
                  <span>Men’s Kangaroo Organic Cotton Hoodie</span>
                  <div className={Styles.date_container}>
                    <div className={Styles.date_content}>
                      <p> Date issued: </p>
                      <span> July 01, 2023</span>
                    </div>
                    <div className={Styles.date_content}>
                      <p> Date due: </p>
                      <span> Dec 21, 2023</span>
                    </div>
                  </div>
                </div>
                {/* horizontal_line */}
                <div className={Styles.horizontal_line}></div>

                {/* referContainer */}
                <div className={Styles.refer_container}>
                  <div className={Styles.refer_content}>
                    <h3>From</h3>
                    <h4>John Doe</h4>
                    <p>89 Street Avenue, Washington USA, Zip : A1257 </p>
                  </div>
                  <div className={Styles.refer_content}>
                    <h3>To</h3>
                    <h4>Brendon Morris</h4>
                    <p>209 Street Avenue, Philadelphia USA, Zip : PQ243</p>
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

                {/* total amount container */}
                <div className={Styles.total_amount_section}>
                  <p>All payments are in USD, All Fee is upto buyer</p>
                  <div className={Styles.amount_container}>
                    <div className={Styles.content}>
                      <p>Sub Total</p>
                      <p>$30000.00</p>
                    </div>
                    <div className={Styles.content}>
                      <p>Discount</p>
                      <p>-$1000.00</p>
                    </div>
                    <div className={Styles.content}>
                      <p>Tax</p>
                      <p>-$500.00</p>
                    </div>
                    <div className={Styles.content}>
                      <p>Total</p>
                      <p>$28500.00</p>
                    </div>
                  </div>
                </div>

                {/* button container */}
                <div className={Styles.button_container}>
                  <button>Send Invoice</button>
                  <button>Download Invoice</button>
                  <button>Edit Invoice</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Invoice
