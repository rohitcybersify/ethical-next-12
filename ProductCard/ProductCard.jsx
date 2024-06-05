import React, { useEffect, useState } from 'react'
import Styles from './../Filter/Filter.module.css'
import Dot from '../custom-colored-dot/Dot'
import Image from 'next/image'
import { MdOutlineFavoriteBorder } from 'react-icons/md'
import { CiShare2 } from 'react-icons/ci'
import Share from '../../components/Share/Share'
import { useDispatch, useSelector } from 'react-redux'
import { setProductID } from '../../redux-setup/categorySlice'
import {
  addItemToWishlist,
  removeItemFromWishlist,
} from '../../redux-setup/wishlistSlice'
import images from 'constants/images'
import Loaders from '@components/loaders/Loaders'
import { toast } from 'react-toastify'
import { RxCross1 } from 'react-icons/rx'
import { useRouter } from 'next/router'
const ProductCard = ({ item, fromSingleProduct }) => {
  const [shareIcons, setShareIcons] = useState(false)
  const [imageError, setImageError] = useState(true)
  const [isActiveLoading, isActiveSetLoading] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()
  const wishListItems = useSelector((state) => state.wishlist.items)
  const isInWishlist = wishListItems.some(
    (wishlistItem) => wishlistItem.id === item.id
  )

  const collectionForUrl = useSelector(
    (state) => state.category.collectionForUrl
  )

  const favoriteIconColor = useSelector((state) => state.wishlist.favoriteIcon)
  const country = useSelector((state) => state.country.country)
  const cartItems = useSelector((state) => state.cart.cartItems)

  const subcategoryCollectionFromUrl = useSelector(
    (state) => state.category.subCollectionForUrl
  )

  const handlePush = (item) => {
    const formattedSlug = encodeURIComponent(item?.slug)
    isActiveSetLoading(true)
    router.push(
      `/products/${collectionForUrl ? collectionForUrl : ''}/${
        subcategoryCollectionFromUrl
          ? subcategoryCollectionFromUrl + '/' + formattedSlug
          : formattedSlug
      }`
    )
  }

  const addToWishlist = (item) => {
    const existedWishlistItem = cartItems.some(
      (cartItem) => cartItem.id === item.id
    )

    if (existedWishlistItem) {
      toast.error('Item is already in cart', {
        position: 'top-center',
      })
    } else {
      const isInWishlist = wishListItems.some(
        (wishlistItem) => wishlistItem.id === item.id
      )
      if (isInWishlist) {
        dispatch(removeItemFromWishlist(item.id))
        toast.success('Item removed from wishlist', {
          position: 'top-center',
          autoClose: 1500,
        })
      } else {
        dispatch(addItemToWishlist(item))
        toast.success('Item added to wishlist', {
          position: 'top-center',
          autoClose: 1500,
        })
      }
    }
  }

  if (!item) {
    return <Loaders />
  }

  return (
    <>
      {imageError && item?.image_whislist && (
        <div className={Styles.collection_items} >
          <Image
            src={item?.image_whislist}
            width={278}
            height={311}
            alt={item?.product_title}
            onError={() => setImageError(false)}
            onClick={() => handlePush(item)}
            />

          <div className={Styles.product_card_content}>
            <h4 className={Styles.title} onClick={() => handlePush(item)} >{item?.product_title}</h4>

            {item && (
              <>
                {country === 'canada' && item.column_5_retail_price_cad > 0 ? (
                  <div className={Styles.small_text}>
                    as low as ${item.column_5_retail_price_cad}
                  </div>
                ) : country === 'usa' && item.column_5_retail_price_usd > 0 ? (
                  <div className={Styles.small_text}>
                    as low as ${item.column_5_retail_price_usd}
                  </div>
                ) : null}
              </>
            )}
            <div className={Styles.colors}>
              {Object.keys(item?.colours).length > 0 &&
                Object.entries(item?.colours)
                  .slice(0, 8)
                  .map(([color, imageUrl], i) => {
                    return <Dot color={color} imageUrl={imageUrl} key={i} />
                  })}
            </div>
          </div>
          <div className={Styles.hidden_icons}>
            <div className={Styles.icons}>
              <span
                className={Styles.border_svg}
                style={{ backgroundColor: isInWishlist ? '#A2D061' : '' }}
              >
                <MdOutlineFavoriteBorder
                  fontSize={25}
                  className={`${Styles.icon} ${
                    isInWishlist ? Styles.favActive : ''
                  }`}
                  onClick={() => addToWishlist(item)}
                />
              </span>
              <span className={Styles.border_svg}>
                <CiShare2
                  fontSize={25}
                  color="#D3D3D3"
                  className={Styles.icon}
                  onClick={() => setShareIcons(true)}
                />
              </span>
            </div>
            {shareIcons && (
              <>
                <Share setShareIcons={setShareIcons} item={item} />
              </>
            )}

            <div className={Styles.overlay_btn}><button
              className={Styles.viewProduct_btn}
              onClick={() => handlePush(item)}
              disabled={isActiveLoading}
            >
              {isActiveLoading ? 'Loading...' : 'View Product'}
            </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default ProductCard
