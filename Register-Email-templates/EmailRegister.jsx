import React, { useState } from 'react'
import Styles from './EmailRegister.module.css'
import { useRouter } from 'next/router'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import images from '../../constants/images'
import Image from 'next/image'

const Emailregister = () => {
  const router = useRouter()
  const [userInfo, setUserInfo] = useState(true)
  const [userReceipt, setUserReceipt] = useState(false)

  const handleClick = () => {
    setUserInfo(false)
    setUserReceipt(true)
  }

  return (
    <>
      <section className={Styles.Emailregister}>
        <div className={Styles.Emailregister_wrapper}>
          <div class={Styles.banner}>
            <Image src={images.Fav_logo} width={54} height={72} alt="favlogo" />

            <h4>Subscription Successful!</h4>
            <h1>Thanks for showing the interest in our products.</h1>
          </div>

          <div class={Styles.email_content}>
            <p>Hello tan</p>
            <br />
            <p>
              Thank you for registering with our application. To complete your
              registration, please click on the following link:{' '}
              <a href="#">Verify Your Email </a> If you did not register for our
              application, you can ignore this email.
            </p>
            <br />
            <p>Best regards,</p>
            <p>Your Application Team</p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Emailregister
