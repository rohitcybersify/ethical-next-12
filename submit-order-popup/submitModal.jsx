import React from 'react'
import Styles from './submit-order.module.css'
import { useRouter } from 'next/router'

const SubmitModal = () => {
  const router = useRouter()

  const handleClick = () => {
    router.push('/category/apparel')
  }

  return (
    <>
      <section className={Styles.submitModal}>
        <div className={Styles.submitModalDiv}>
          <h2>
            Great! All of your products have been approved. Are you Sure You
            Would like to submit your order now?
          </h2>
          <div className={Styles.submite_btn}>
            <button onClick={handleClick}>No, I will do that later</button>
            <button onClick={handleClick}>Submit Order</button>
          </div>
        </div>
      </section>
    </>
  )
}

export default SubmitModal
