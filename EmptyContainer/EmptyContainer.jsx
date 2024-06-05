import React from 'react'
import Styles from './EmptyContainer.module.css'
import { useRouter } from 'next/router'
import Image from 'next/image'
import images from '../../constants/images'
import { useSelector } from 'react-redux'

const EmptyContainer = ({ data, billing }) => {
  const router = useRouter()

  const collectionForUrl = useSelector(
    (state) => state.category.collectionForUrl
  )

  return (
    <>
      {data === 'Cart' && (
        <div className={Styles.emptyContent}>
          <h2 className={Styles.title}>Hey, your {data} is Empty!</h2>
          <button
            className={Styles.shop_product_btn}
            onClick={() => router.push('/products')}
          >
            Shop Products
          </button>
        </div>
      )}

      {data === 'ProductNotAvailable' && (
        <div className={Styles.product_notFound}>
          <div className={Styles.emptyContent}>
            <h2 className={Styles.title}>
              This product is not available in selected Country
            </h2>
            <h3>either change your country to see this product or</h3>
            <button
              className={Styles.shop_product_btn}
              style={{ width: 'maxContent' }}
              onClick={() => router.push(`/category/${collectionForUrl}`)}
            >
              Go back
            </button>
          </div>
        </div>
      )}

      {data === 'billing-address' && (
        <div className={Styles.emptyContent_wrapper}>
          <h2 className={Styles.title}>
            Wait Your Order is in Process{' '}
            <Image
              src={images.Loading_new}
              width={100}
              height={100}
              alt="loading-image"
            />
          </h2>
        </div>
      )}
    </>
  )
}

export default EmptyContainer
