import React from 'react'
import Styles from './ClientTypeSelector.module.css'

const ClientTypeSelector = ({ selectedOption, handleOptionChange }) => {
  return (
    <>
      <div className={Styles.viewCart}>
        <p className={Styles.cart_left_desc}>Are you a...</p>
      </div>

      <div className={Styles.cart_left_radio_buttons}>
        <div className={`${Styles.cart_left_btn} ${Styles.custom_checkbox}`}>
          <input
            type="checkbox"
            className={Styles.cart_left_radio_btn}
            name="Existing_client"
            id="Existing_client"
            value="Existing_client"
            checked={selectedOption === 'Existing_client'}
            onChange={handleOptionChange}
          />
          <label htmlFor="Existing_client" className={Styles.cart_left_text}>
            Existing Client
          </label>
        </div>
        <div className={`${Styles.cart_left_btn} ${Styles.custom_checkbox}`}>
          <input
            type="checkbox"
            className={Styles.cart_left_radio_btn}
            name="New_client"
            id="New_client"
            value="New_client"
            checked={selectedOption === 'New_client'}
            onChange={handleOptionChange}
          />
          <label htmlFor="New_client" className={Styles.cart_left_text}>
            New Client
          </label>
        </div>
      </div>
    </>
  )
}

export default ClientTypeSelector
