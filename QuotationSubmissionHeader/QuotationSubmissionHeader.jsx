import React from 'react'
import Styles from './QuotationSubmissionHeader.module.css'

import { useRouter } from 'next/router'

const QuotationSubmissionHeader = () => {
  const router = useRouter()
  const string = router.asPath.split('/').pop()

  const steps = ['/cart', '/shipping', '/billing-address']
  const lastIndex = steps.indexOf(router.pathname)

  return (
    <>
      <div className={Styles.QuotationSubmissionHeader}>
        <h4 className={Styles.heading}>Home {'>'} Submit Quotation Request</h4>
        <div className={Styles.horizontal_line}>
          <div className={Styles.stepCount}>
            {steps.map((item, index) => (
              <>
                <span className={index <= lastIndex ? Styles.active : ''}>
                  {index + 1}
                </span>
              </>
            ))}
          </div>
        </div>
        {string === 'cart' && (
          <h2 className={Styles.title}>1. Tell us about your Swag Project</h2>
        )}
        {string === 'shipping' && (
          <h2 className={Styles.title}>2. Shipping Address</h2>
        )}
        {string === 'billing-address' && (
          <h2 className={Styles.title}>3. Review Your Estimate</h2>
        )}
      </div>
    </>
  )
}

export default QuotationSubmissionHeader
