import React from 'react'
import Styles from './Loaders.module.css'

const Loaders = () => {
  return (
    <>
      <div className={Styles.loading_Container}>
        <div class={Styles.loader}></div>
      </div>
    </>
  )
}

export default Loaders
