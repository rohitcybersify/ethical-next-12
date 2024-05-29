import React, { useEffect } from 'react'
import PrimaryHeader from '../components/primary-header/PrimaryHeader'
import SecondaryHeader from '../components/secondary-header/SecondaryHeader'
import Footer from '../components/footer/Footer'
import Styles from '../styles/common.module.css'
import filterStyles from '../components/Filter/Filter.module.css'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import EmptyContainer from '../components/EmptyContainer/EmptyContainer'
import ProductCard from '../components/ProductCard/ProductCard'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

const wishlist = () => {
  const wishlistItems = useSelector((state) => state.wishlist.items)
  const userId = useSelector((state) => state.auth.userId)
  const router = useRouter()

  useEffect(() => {
    if (!userId) {
      toast.error('Please login first')
      router.push('/login')
    }
  }, [userId])
  return (
    <>
      <PrimaryHeader />
      <SecondaryHeader />
      <div className={filterStyles.wish_container}>
        <div className={filterStyles.collection_container}>
          {wishlistItems &&
            wishlistItems.map((item) => (
              <>
                <ProductCard item={item} key={item.id} />
              </>
            ))}
        </div>

        {wishlistItems.length === 0 && (
          <div className={Styles.empty_card_container}>
            <EmptyContainer data="Wishlist" />
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}

export default wishlist
