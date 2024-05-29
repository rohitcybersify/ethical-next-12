import React, { useState } from 'react'
import Styles from './approval.module.css'
import SideBar from '../../../../components/admin/SideBar/SideBar'
import Navbar from '../../../../components/admin/Navbar/Navbar'
import images from '../../../../constants/images'
import Image from 'next/image'
import StepForm from '../../../../components/admin/step-form/StepForm'

const Approval = () => {
  const [activeBtn, setActiveBtn] = useState(0)
  const buttons = ['Approve', 'View Mockup', 'Edit']

  return (
    <>
      <section className={Styles.Approval_section}>
        <div className={Styles.Approval_section_container}>
          <div className={Styles.Approval_content}>
            <div className={Styles.Approval_left_content}>
              <SideBar data={images.Louis_Lara} />
            </div>
            <div className={Styles.Approval_right_content}>
              <Navbar data="Order Detail" thumbnail={images.User_icon} />
              <div className={Styles.middle_section}>
                <div className={Styles.Approval_completion}>
                  <p>Order 1</p>
                  <p>Expected Completion</p>
                </div>
                <div className={Styles.Approval_detail_content}>
                  <span>Order id - OD233873648734687289</span>
                  <span>Dec 12, 2023</span>
                </div>
                <div className={Styles.step_form_container}>
                  <StepForm />
                </div>
                {/* Overview Products */}
              </div>
              {/* Recommendatiuon */}
              <div className={Styles.recommendation_section}>
                <p>Recommendations</p>
                <div className={Styles.bottom_section}>
                  <div className={Styles.content}>
                    <div className={Styles.textContent}>
                      <span></span>
                      <span>
                        12% off for latest bag pack products. Would you like to
                        see now?
                      </span>
                    </div>
                    <div className={Styles.btnContent}>
                      <button>Yes</button>
                      <button>No</button>
                    </div>
                  </div>
                  <div className={Styles.content}>
                    <div className={Styles.textContent}>
                      <span></span>
                      <span>
                        25% off for latest bag pack products. Would you like to
                        see now?
                      </span>
                    </div>
                    <div className={Styles.btnContent}>
                      <button>Yes</button>
                      <button>No</button>
                    </div>
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

export default Approval
