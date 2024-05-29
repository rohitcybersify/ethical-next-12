import React from 'react'
import SideBar from '../components/admin/SideBar/SideBar'
import Navbar from '../components/admin/Navbar/Navbar'
import Styles from '../styles/Individual.module.css'
import images from '../constants/images'

const individual = () => {
  return (
    <>
      <div className={Styles.individual_container}>
        <div className={Styles.left_section}>
          <SideBar data={images.Louis_Lara} />
        </div>
        <div className={Styles.right_section}>
          <Navbar data="Dashboard" thumbnail={images.Louis_Lara} />
        </div>
      </div>
    </>
  )
}

export default individual
