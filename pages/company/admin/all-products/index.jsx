import React from 'react'
import Styles from './allProducts.module.css'
import SideBar from '../../../../components/admin/SideBar/SideBar'
import Navbar from '../../../../components/admin/Navbar/Navbar'
import images from '../../../../constants/images'
import Image from 'next/image'
import StepForm from '../../../../components/admin/step-form/StepForm'

const AllProducts = () => {
  return (
    <>
      <section className={Styles.All_Products_section}>
        <div className={Styles.All_Products_section_container}>
          <div className={Styles.All_Products_content}>
            <div className={Styles.All_Products_left_content}>
              <SideBar data={images.Louis_Lara} />
            </div>
            <div className={Styles.All_Products_right_content}>
              <Navbar data="Order Detail" thumbnail={images.User_icon} />
              <div className={Styles.middle_section}>
                <div className={Styles.All_Products_completion}>
                  <p>Order 1</p>
                  <p>Expected Completion</p>
                </div>
                <div className={Styles.All_Products_detail_content}>
                  <span>Order id - OD233873648734687289</span>
                  <span>Dec 12, 2023</span>
                </div>
                <div className={Styles.step_form_container}>
                  <StepForm />
                </div>
                {/* Overview submitted Product section */}
                <div className={Styles.overview_submitted_products_container}>
                  <p>Overview your submitted product</p>
                  <div className={Styles.product_container}>
                    {Array.from({ length: 3 }).map((item, index) => (
                      <>
                        <div className={Styles.product_content}>
                          <div className={Styles.content}>
                            <div className={Styles.imgContent}>
                              <Image
                                src={images.shirt_small}
                                width={80}
                                height={80}
                              />
                            </div>
                            <div className={Styles.textContent}>
                              <p>
                                Tentree® Men’s Kangaroo Organic Cotton Hoodie
                              </p>
                              <span>Black</span>
                              <p>Download View</p>
                            </div>
                          </div>
                          <div className={Styles.btnContent}>
                            <button>Approve</button>
                            <button>Edit</button>
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default AllProducts
