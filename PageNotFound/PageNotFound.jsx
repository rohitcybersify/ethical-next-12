import React from 'react'
import PrimaryHeader from '../primary-header/PrimaryHeader'
import SecondaryHeader from '../secondary-header/SecondaryHeader'
import Footer from '../footer/Footer'
import Styles from './PageNotFound.module.css'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { setCollectionForUrl } from 'redux-setup/categorySlice'

const PageNotFound = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const handleClick = () => {
    router.push('/category/apparel')
    dispatch(setCollectionForUrl('apparel'))
  }

  return (
    <>
      <PrimaryHeader />
      <SecondaryHeader />

      <section className={Styles.PageNotFound}>
        <div className={Styles.innerPage_found}>
          <h1>404</h1>
          <h3>
            {' '}
            Oops!
            <br></br>PAGE NOT FOUND
          </h3>
          <p>This page doesn't exist or was removed</p>
          <button onClick={handleClick}>Continue Shopping </button>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default PageNotFound
