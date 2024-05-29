import React from 'react'
import Styles from './StepForm.module.css'
import { useSelector } from 'react-redux'

const StepForm = ({ status }) => {
  const orderStatus = useSelector((state) => state.userOrder.productStatus)

  const steps = [
    'submitted',
    'overview',
    'approved',
    'payment',
    'production',
    'shipping status',
    'order status',
    'delivered',
  ]

  const newIndex = steps.indexOf(orderStatus)
  return (
    <div>
      <div className={Styles.step_wrapper}>
        <div className={Styles.hr_line}></div>
        <div className={Styles.step_counts}>
          {steps.map((step, index) => (
            <div className={Styles.steps_number} key={step}>
              <span
                style={{
                  background: index <= newIndex ? '#a2d061' : '#e3f1d0',
                }}
              >
                <div className={Styles.inner_circle}></div>
              </span>
              <div>
                <h6>{step}</h6>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StepForm
