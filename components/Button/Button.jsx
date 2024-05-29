import React, { useState } from 'react'
import Styles from './Button.module.css'
import { useRouter } from 'next/router'

const Button = ({ onClick, disabled, hideContinue, from, disable }) => {
  const router = useRouter()

  const handleBack = () => {
    if (hideContinue) {
      router.push('/shipping')
    } else if (from === 'shipping') {
      router.push('/cart')
    } else {
      router.back()
    }
  }

  return (
    <>
      <div className={Styles.cart_left_butttons}>
        <button
          className={Styles.button}
          type="button"
          onClick={handleBack}
          disabled={from === 'cart'}
        >
          Back
        </button>
        {!hideContinue && (
          <button
            type="button"
            disabled={disabled ? disabled : false}
            className={Styles.button}
            style={{ opacity: disabled ? '0.7' : '1' }}
            onClick={onClick}
          >
            {disable ? 'Loading' : 'Continue'}
          </button>
        )}
      </div>
    </>
  )
}

export default Button
