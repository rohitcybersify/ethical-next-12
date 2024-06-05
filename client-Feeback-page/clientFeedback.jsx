import React, { useState } from 'react'
import Styles from './clientFeedback.module.css'
import { useRouter } from 'next/router'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import images from '../../constants/images'
import Image from 'next/image'

const ClientFeedback = () => {
  const router = useRouter()
  const [userInfo, setUserInfo] = useState(true)
  const [userReceipt, setUserReceipt] = useState(false)

  const handleClick = () => {
    setUserInfo(false)
    setUserReceipt(true)
  }

  return (
    <>
      <section className={Styles.clientFeedback}>
        <div className={Styles.clientFeedback_wrapper}>
       <h4>Client Feedback Form</h4>


    <div class={Styles.clientFeedback_form}>
     <input type='text' placeholder='Your full name'/>
     <input type='text' placeholder='Your company name'/>
     <input type='text' placeholder='Your project INQ number'/>
     <input type='textarea' placeholder='Rate your experience working with Ethical Swag'/>
     <textarea type='textarea' placeholder='Rate the product'/>

     <button type='button'>Submit</button>
     
    </div>
        </div>
      </section>
    </>
  )
}

export default ClientFeedback

