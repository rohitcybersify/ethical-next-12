import React, { useState } from 'react'
import Styles from './transfer.module.css'
import { useRouter } from 'next/router'
import { Formik, Form, Field, ErrorMessage } from 'formik'

const Wiretransfer = () => {
  const router = useRouter()
  const [userInfo, setUserInfo] = useState(true)
  const [userReceipt, setUserReceipt] = useState(false)

  const handleClick = () => {
    setUserInfo(false)
    setUserReceipt(true)
  }

  return (
    <>
      <section className={Styles.shareInvoiceModal}>
        <div className={Styles.shareInvoiceModalDiv}>
          <h2>Wire Transfer Details</h2>
          <p>Please enter details for verification of payment</p>

          {userInfo && (
            <div className={Styles.fomr_share}>
              <input
                type="text"
                id="Name"
                name="Name"
                placeholder="Name"
                className={Styles.input}
                autoComplete="off"
              />
              {/* <ErrorMessage
                            name="email"
                            component="div"
                            className={Styles.error}
                          /> */}

              <div className={Styles.Input_wrpper}>
                <input
                  type="text"
                  id="Email"
                  name="Email"
                  placeholder="Email address"
                  className={Styles.input}
                  autoComplete="off"
                />

                <input
                  type="number"
                  id="Phone_number"
                  name="Phone number"
                  placeholder="Phone number"
                  className={Styles.input}
                  autoComplete="off"
                />
              </div>

              <div className={Styles.Input_wrpper}>
                <input
                  type="number"
                  id="Bank_account"
                  name="Bank_account"
                  placeholder="Bank Account Number"
                  className={Styles.input}
                  autoComplete="off"
                />

                <input
                  type="number"
                  id="Bank_transit"
                  name="Bank_transit"
                  placeholder="Bank Transit Number"
                  className={Styles.input}
                  autoComplete="off"
                />
              </div>

              <div className={Styles.Input_wrpper}>
                <input
                  type="number"
                  id="Swift_Key"
                  name="Swift_Key"
                  placeholder="Swift Key"
                  className={Styles.input}
                  autoComplete="off"
                />

                <input
                  type="number"
                  id="Zip_code"
                  name="Zip_code"
                  placeholder="Zip code"
                  className={Styles.input}
                  autoComplete="off"
                />
              </div>

              <div className={Styles.submite_btn}>
                <button onClick={handleClick}>Cancel</button>
                <button onClick={handleClick}>I have sent the wire</button>
              </div>
            </div>
          )}
          {userReceipt && (
            <>
              <p className={Styles.uploade_label}>
                Please Upload your remittance or receipt for your wire transfer
              </p>
            </>
          )}
          <div className={Styles.uploaded_div}>
            <label for="file1" class="Product_uploaded_content__3no_E">
              <p>
                <span class="olorLight">Drop your</span> design{' '}
                <span class="colorLight">here</span>
              </p>
              <input
                type="file"
                name=""
                id="file1"
                accept=".svg,.jpg,.jpeg .eps, .cdr, .ai, .pdf, image/svg+xml, application/postscript, application/pdf,image/jpeg, image/png"
              />
            </label>
          </div>

          <div className={Styles.submite_btn}>
            <button onClick={handleClick}>Cancel</button>
            <button onClick={handleClick}>Submit</button>
          </div>
        </div>
      </section>
    </>
  )
}

export default Wiretransfer
