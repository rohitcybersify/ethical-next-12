import PrimaryHeader from '../components/primary-header/PrimaryHeader'
import SecondaryHeader from '../components/secondary-header/SecondaryHeader'
import Footer from '../components/footer/Footer'
import EstimateCard from '../components/EstimateCard/EstimateCard'
import Styles from '../components/UserCart/UserCart.module.css'
import Shipping from '../components/Shipping/Shipping'
import QuotationSubmissionHeader from '../components/QuotationSubmissionHeader/QuotationSubmissionHeader'
import { useSelector } from 'react-redux'
import EmptyContainer from '../components/EmptyContainer/EmptyContainer'
import Loaders from '../components/loaders/Loaders'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const shipping = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  const cartItemsLength = useSelector((state) => state.cart.cartItems.length)
  const reached2ndStep = useSelector((state) => state.cart.reached2ndStep)

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
                <div className={Styles.widthFull}>
                  <QuotationSubmissionHeader />
                  <Shipping />
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

export default shipping
