import React from 'react'
import Styles from './approval.module.css'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { setProductStatus } from '../../redux-setup/orderStatus'
import { useDispatch } from 'react-redux'

const Approval = ({ orderDetail }) => {
  const router = useRouter()
  const dispatch = useDispatch()

  const handlePush = () => {
    dispatch(setProductStatus('view mockup'))
    router.push(router.asPath)
  }

  return (
    <>
      <div className={Styles.overview_products}>
        <p>Overview your submitted product</p>
        {orderDetail &&
          orderDetail?.product_details?.map((item) => (
            <>
              <div className={Styles.content}>
                <div className={Styles.imgContent}>
                  {item?.productimage && (
                    <Image src={item?.productimage} width={80} height={80} />
                  )}
                </div>
                <div>
                  <button
                    className={Styles.product_customization}
                    onClick={() => handlePush(item)}
                  >
                    Click here to product customization
                  </button>
                </div>
                <div className={Styles.textContent}>
                  {item?.heading && <p>{item?.heading}</p>}
                  {item?.colours && <span>{item?.colours}</span>}
                </div>
                <div className={Styles.btnContent}>
                  <button>Approve</button>
                  <button onClick={handlePush}>View Mockup</button>
                  <button
                    onClick={() => router.push('/customer/order-completion')}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </>
          ))}
      </div>

      {/* Recommendatiuon */}
      <div className={Styles.recommendation_section}>
        <p>Recommendations</p>
        <div className={Styles.bottom_section}>
          <div className={Styles.content}>
            <div className={Styles.textContent}>
              <span></span>
              <span>
                12% off for latest bag pack products. Would you like to see now?
              </span>
            </div>
            <div className={Styles.btnContent}>
              <button>Yes</button>
              <button>No</button>
            </div>
          </div>
          <div className={Styles.content}>
            <div className={Styles.textContent}>
              <span></span>
              <span>
                25% off for latest bag pack products. Would you like to see now?
              </span>
            </div>
            <div className={Styles.btnContent}>
              <button>Yes</button>
              <button>No</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Approval
