import React, { useState } from 'react'
import Styles from './EditProduct.module.css'
import SideBar from '../../../../components/admin/SideBar/SideBar'
import Navbar from '../../../../components/admin/Navbar/Navbar'
import images from '../../../../constants/images'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { RxCross2 } from 'react-icons/rx'
import { MdAttachFile } from 'react-icons/md'
import Image from 'next/image'
import StepForm from '../../../../components/admin/step-form/StepForm'

const EditProduct = () => {
  const [icon, setIcon] = useState(images.Ethical_swag_small_logo)

  const handleIcon = (e) => {
    const file = e.target.files[0]
    setIcon(URL.createObjectURL(file))
  }

  const previousImage = () => {
    setIcon(images.Ethical_swag_small_logo)
  }

  return (
    <>
      <section className={Styles.EditProduct_section}>
        <div className={Styles.EditProduct_section_container}>
          <div className={Styles.EditProduct_content}>
            <div className={Styles.EditProduct_left_content}>
              <SideBar data={images.Louis_Lara} />
            </div>
            <div className={Styles.EditProduct_right_content}>
              <Navbar data="Order Detail" thumbnail={images.User_icon} />
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
                {/* Order Product */}
                <div className={Styles.order_product_container}>
                  <p>Order product</p>
                  <div className={Styles.container}>
                    <div className={Styles.content}>
                      <div className={Styles.imgContent}>
                        <Image
                          src={images.shirt_small}
                          width={80}
                          height={106}
                          alt="image"
                        />
                      </div>
                      <div className={Styles.textContent}>
                        <p>Tentree® Men’s Kangaroo Organic Cotton Hoodie</p>
                        <span>Black</span>
                        <p>Quantity - 2 Cotton Hoodie</p>
                        <p>$80</p>
                      </div>
                    </div>
                    <div className={Styles.btnContent}>
                      <button>Track Order</button>
                      <button>See More</button>
                    </div>
                  </div>
                </div>
                {/* See changes container */}
                <div className={Styles.see_changes_container}>
                  <p>See changes attachment</p>
                  <div className={Styles.icon_container}>
                    <label htmlFor="file_icon">
                      <MdAttachFile className={Styles.file_icon} />
                      <input
                        type="file"
                        name=""
                        id="file_icon"
                        onChange={handleIcon}
                      />
                    </label>
                    <span>
                      <b>attached</b>
                    </span>
                    <span>. 2 days ago</span>
                  </div>
                  {/* show icon */}
                  <div className={Styles.show_file}>
                    <RxCross2
                      className={Styles.cross_icon}
                      onClick={previousImage}
                    />
                    <Image src={icon} width={60} height={60} alt="icon_image" />
                  </div>
                </div>

                {/* Note changes */}
                <div className={Styles.note_changes_container}>
                  <p>Note about changes</p>
                  <div className={Styles.content}>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </div>

                {/* Cancelation Request */}
                <div className={Styles.cancelation_request_container}>
                  <p>Cancelation request</p>
                  <div className={Styles.cancelation_content}>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Lorem ipsum dolor sit amet, consn ectetur adipiscing elit.
                      Lorem ipsum dolor sit ame.
                    </p>
                    <button>Cancel Request</button>
                  </div>
                </div>
                {/* bottom button content */}
                <div className={Styles.bottom_button_content}>
                  <button>Cancel</button>
                  <button>Save Changes</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default EditProduct
