import React, { useEffect, useState } from 'react'
import Styles from '../../admin/Navbar/Navbar.module.css'
import images from '../../../constants/images'
import Image from 'next/image'
import { BsFiletypeCsv } from 'react-icons/bs'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { setuserId } from '../../../redux-setup/authSlice'
import { timeAgo } from '@lib/utils'
import { setActiveLink } from '../../../redux-setup/sidebarSlice'

const Navbar = ({ data, thumbnail }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [openProfile, setOpenProfile] = useState(false)
  const [isNotification, setIsNotification] = useState(false)
  const notifications = useSelector((state) => state.random.notifications)

  const string = router.asPath

  const { id } = router.query

  const handleLogout = () => {
    localStorage.clear()
    dispatch(setuserId(null))
    dispatch(setActiveLink('Dashboard'))
    toast.success('Logged out successully', {
      position: 'top-center',
      autoClose: 1500,
    })
    router.push('/')
  }

  return (
    <>
      <div className={Styles.navbar_container}>
        {/* <h2>{data}</h2> */}
        {string === '/super-admin' && <h2>Dashboard</h2>}
        {string === '/super-admin/dashboard' && <h2>Super Admin</h2>}
        {string === '/super-admin/customer' && <h2>Customers</h2>}
        {string === '/super-admin/invoice' && <h2> Invoice</h2>}
        {string === '/super-admin/product-sync' && <h2> Product Sync</h2>}
        {string === '/super-admin/blog' && <h2>Blog Post</h2>}
        {string === '/super-admin/categories' && <h2>Categories</h2>}
        {string === '/super-admin/orders' && <h2>Orders</h2>}
        {string === '/super-admin/users' && <h2>Users</h2>}
        {string === '/super-admin/add-users' && <h2>Add New Users</h2>}
        {string === '/super-admin/add-roles' && <h2>Add Roles</h2>}
        {string === '/customer/store-detail' && <h2>Store Detail</h2>}
        {string === '/customer/orders' && <h2>Orders</h2>}
        {string === `/customer/order-detail/${id}` && <h2>Order detail</h2>}
        {string === `/customer/order-completion` && <h2>Order detail</h2>}
        {string === `/customer/payment` && <h2>Order detail</h2>}
        {string === `/customer/shipping` && <h2>Order detail</h2>}
        {string === `/customer` && <h2>Dashboard</h2>}
        <div className={Styles.icons}>
          {router.asPath === '/super-admin/customer' && (
            <>
              <button className={Styles.button}>
                Add New by CSV <BsFiletypeCsv />
              </button>
              <button className={Styles.button}>Add New</button>
            </>
          )}
          {router.asPath === '/super-admin/invoice' && (
            <>
              <button className={Styles.button}>Add Invoice</button>
            </>
          )}

          {router.asPath === '/super-admin/blog' && (
            <>
              <button className={Styles.button}>Add Post</button>
            </>
          )}
          {router.asPath === '/super-admin/orders' && (
            <>
              <button className={Styles.button}>Add New</button>
            </>
          )}
          {router.asPath === '/super-admin/pages' && (
            <>
              <button className={Styles.button}>Add Page</button>
            </>
          )}
          {router.asPath === '/super-admin/categories' && (
            <>
              <button className={Styles.button}>Add New</button>
            </>
          )}
          {(router.asPath === '/super-admin/users' ||
            router.asPath === '/super-admin/add-users' ||
            router.asPath === '/super-admin/add-roles') && (
            <>
              <button className={Styles.button}>Upload CSV</button>
              <button className={Styles.button}>Add New Print</button>
              <button className={Styles.button}>Print</button>
            </>
          )}
          <div className={Styles.notification_wrapper}>
            <button
              className={Styles.icon}
              onClick={() => setIsNotification(!isNotification)}
            >
              <Image
                src={images.Bell_Icon}
                width={20}
                height={20}
                alt="bell_icon"
              />
            </button>
            {isNotification && (
              <div className={Styles.notification_list}>
                <div className={Styles.flex_row}>
                  {' '}
                  <h6>
                    Notification
                    <span className={Styles.notification_count}>
                      {notifications?.length}
                    </span>
                  </h6>
                  <span
                    className={Styles.close_icon}
                    onClick={() => setIsNotification(false)}
                  >
                    x
                  </span>
                </div>
                {notifications &&
                  notifications.length > 0 &&
                  notifications.map((item) => (
                    <ul className={Styles.notification_list_wrapper}>
                      <li>
                        <div className={Styles.notification_box}>
                          <div className={Styles.flex_row}>
                            <h5>{item.type}</h5>
                            <span className={Styles.time}>
                              {timeAgo(item?.time)}
                            </span>
                          </div>
                          <p>{item.notificationHeading}</p>
                        </div>
                      </li>
                    </ul>
                  ))}
              </div>
            )}
          </div>
          {thumbnail && (
            <>
              <span
                className={Styles.icon}
                onClick={() => setOpenProfile(!openProfile)}
              >
                <Image src={thumbnail} width={20} height={20} alt="user_icon" />
              </span>
            </>
          )}

          {openProfile && (
            <div className={Styles.logout_Div}>
              <div className={Styles.logout_popup}>
                <h3>Are you sure you want to logout?</h3>
                <div className={Styles.submite_btn}>
                  <button onClick={() => setOpenProfile(false)}>Cancel</button>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Navbar
