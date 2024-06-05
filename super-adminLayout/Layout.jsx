import React, { useEffect } from 'react'
import SideBar from '../admin/SideBar/SideBar'
import Styles from '../../pages/super-admin/superAdmin.module.css'
import images from '../../constants/images'
import Navbar from '../admin/Navbar/Navbar'

const Layout = ({ children }) => {
  return (
    <>
      <section className={Styles.superAdmin_section}>
        <div className={Styles.superAdmin_section_container}>
          <div className={Styles.superAdmin_content}>
            <div className={Styles.superAdmin_left_content}>
              <SideBar data={images.ethical_swag} />
            </div>
            <div className={Styles.superAdmin_right_content}>
              <Navbar data="Dashboard" thumbnail={images.User_icon} />
              {children}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Layout
