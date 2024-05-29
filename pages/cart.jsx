import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import PrimaryHeader from '../components/primary-header/PrimaryHeader'
import SecondaryHeader from '../components/secondary-header/SecondaryHeader'
import Footer from '../components/footer/Footer'
import EstimateCard from '../components/EstimateCard/EstimateCard'
import EmptyContainer from '../components/EmptyContainer/EmptyContainer'
import QuotationSubmissionHeader from '../components/QuotationSubmissionHeader/QuotationSubmissionHeader'
import Styles from '../components/UserCart/UserCart.module.css'
import UserCart from '../components/UserCart/UserCart'
import Loaders from '../components/loaders/Loaders'

const cart = () => {
  const router = useRouter()

  const cartItemsLength = useSelector((state) => state.cart.cartItems.length)

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timeout)
  }, [])

  return (
    <>
      {isLoading ? (
        <Loaders />
      ) : (
        <>
          <PrimaryHeader />
          <SecondaryHeader />
          <section className={Styles.cart_section}>
            {cartItemsLength > 0 ? (
              <>
                <div>
                  <QuotationSubmissionHeader />
                  <UserCart />
                </div>
                <EstimateCard />
              </>
            ) : (
              <EmptyContainer data="Cart" />
            )}
          </section>
          <Footer />
        </>
      )}
    </>
  )
}

export default cart
