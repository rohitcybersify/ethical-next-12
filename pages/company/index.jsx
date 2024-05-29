import React from 'react'
import Styles from './company.module.css'
import SideBar from '../../components/admin/SideBar/SideBar'
import Navbar from '../../components/admin/Navbar/Navbar'
import DashBoard from '../../components/admin/DashBoard/DashBoard'
import images from '../../constants/images'

const company = () => {
  return (
    <>
      <section className={Styles.company_section_container}>
        <div className={Styles.company_content}>
          <div className={Styles.company_left_content}>
            <SideBar data={images.ethical_swag} />
          </div>
          <div className={Styles.company_right_content}>
            <Navbar data="Dashboard" thumbnail={images.User_icon} />
            <DashBoard />
          </div>
        </div>
      </section>
    </>
  )
}

export default company
