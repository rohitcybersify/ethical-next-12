import React from 'react'
import Layout from '../../components/super-adminLayout/Layout'
import Styles from './customer.module.css'

const customer = () => {
  return (
    <>
      <Layout>
        <section className={Styles.recommended_sec}>
          <div className={Styles.recommended_secDiv}>
            <h2>Recommendations</h2>

            <div>
              <p>
                12% off for latest bag pack products. Would you like to see now?
              </p>
              <div className={Styles.res_btn}>
                <button className={Styles.first_btn}>Yes</button>
                <button className={Styles.sec_btn}>No</button>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}

export default customer
