import React from 'react'
import Styles from './NewLoader.module.css'
const NewLoader = () => {
  return (
    <>
      <div className={Styles.newLoading_Container}>
        <div class={Styles.newLoader}></div>
      </div>
    </>
  )
}

export default NewLoader
