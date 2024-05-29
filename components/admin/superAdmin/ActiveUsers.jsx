import React from 'react'
import Styles from './ActiveUsers.module.css'

const ActiveUsers = ({ user }) => {
  return (
    <>
      <div className={Styles.active_user_card}>
        <div className={Styles.user_text}>
          <span
            className={Styles.user_icon}
            style={{ backgroundColor: user.bgColor }}
          >
            {user.icon}
          </span>
          <p className={Styles.users_heading}>{user.text}</p>
        </div>
        <p className={Styles.total}>{user.total}</p>
        <progress
          value={user.input}
          max="100"
          className={Styles.progress}
        ></progress>
      </div>
    </>
  )
}

export default ActiveUsers
