import React from 'react'
import Styles from './shareInvoice.module.css'
import { useRouter } from 'next/router'
import { Formik, Form, Field, ErrorMessage } from 'formik'

const ShareInvoice = () => {
  const router = useRouter()

  const handleClick = () => {
    router.push('/category/apparel')
  }

  return (
    <>
      <section className={Styles.shareInvoiceModal}>
        <div className={Styles.shareInvoiceModalDiv}>
          <h2>Share Invoice</h2>
          <p>
            Please enter details who would you like to email this invoice to.
          </p>

          <div className={Styles.fomr_share}>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter email"
              className={Styles.input}
              autocomplete="off"
            />
            {/* <ErrorMessage
                            name="email"
                            component="div"
                            className={Styles.error}
                          /> */}

            <div className={Styles.submite_btn}>
              <button onClick={handleClick}>Cancel</button>
              <button onClick={handleClick}>Share Invoice</button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ShareInvoice
