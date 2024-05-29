import React, { useEffect } from 'react'
import { GrEdit } from 'react-icons/gr'
import { useRouter } from 'next/router'
import PrimaryHeader from '../../components/primary-header/PrimaryHeader'
import SecondaryHeader from '../../components/secondary-header/SecondaryHeader'
import Button from '../../components/Button/Button'
import EstimateCard from '../../components/EstimateCard/EstimateCard'
import Footer from '../../components/footer/Footer'
import ReviewEstimate from '../../components/ReviewEstimate/ReviewEstimate'
import Styles from '../../components/UserCart/UserCart.module.css'
import QuotationSubmissionHeader from '../../components/QuotationSubmissionHeader/QuotationSubmissionHeader'
import EmptyContainer from '../../components/EmptyContainer/EmptyContainer'
import { useSelector } from 'react-redux'
import SwagOrderForm from '../../components/SwagOrderForm/SwagOrderForm'
import Loaders from '../../components/loaders/Loaders'
const BillingAddress = () => {
  const router = useRouter()
  const shippingCartValues = useSelector((state) => state.auth.shippingCart)
  const cartItemsLength = useSelector((state) => state.cart.cartItems.length)
  const cartItems = useSelector((state) => state.cart.cartItems)

  const EmptyCart = useSelector((state) => state.cart.emptyCart)

  return (
    <>
      <PrimaryHeader />
      <SecondaryHeader />
      <section className={Styles.cart_section}>
        {cartItemsLength > 0 ? (
          <>
            <div className={Styles.widthFull}>
              <QuotationSubmissionHeader />
              <ReviewEstimate />
              <div className={Styles.cart_left_FAQ}>
                <p className={Styles.form_labelwrap}>Other Info</p>
                <SwagOrderForm isBilling />
              </div>
              {/* Shipping address  css writen in cart module*/}
              <div className={Styles.shipping_address_container}>
                <p>Shipping Address</p>
                <div className={Styles.content}>
                  Address Book
                  {shippingCartValues?.singleAddress === 'single' && (
                    <div>
                      <p>
                        {shippingCartValues?.address} {shippingCartValues?.city}{' '}
                        ,{shippingCartValues?.number},
                        {shippingCartValues?.country === 'CA'
                          ? 'Postal Code'
                          : 'Zip Code'}
                        : {shippingCartValues?.pin} ,
                        {shippingCartValues?.country}
                      </p>
                    </div>
                  )}
                  {shippingCartValues?.singleAddress === 'multiple' && (
                    <div>
                      <p>Address: {shippingCartValues.singleAddress}</p>
                    </div>
                  )}
                  <div className={Styles.buttonContent}>
                    <button
                      type="button"
                      onClick={() => router.push('/shipping')}
                    >
                      <GrEdit />
                      Edit
                    </button>
                  </div>
                </div>
                <div className={Styles.bottom_content}>
                  <p>
                    If everything looks good, go ahead and click submit mockup
                    request!{' '}
                  </p>
                </div>
              </div>
              <Button hideContinue />
            </div>
            <EstimateCard />
          </>
        ) : (
          <EmptyContainer data={EmptyCart} />
        )}
      </section>
      <Footer />
    </>
  )
}
export default BillingAddress
