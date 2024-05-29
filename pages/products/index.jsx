import React, { useState, useEffect } from 'react'
import { CiShare2 } from 'react-icons/ci'
import {
  MdArrowBackIos,
  MdOutlineFavoriteBorder,
  MdArrowForwardIos,
} from 'react-icons/md'
import Image from 'next/image'
import Styles from '../../components/Filter/Filter.module.css'
import images from 'constants/images'
import Share from '../../components/Share/Share'
import { useDispatch, useSelector } from 'react-redux'
import Dot from '../../components/custom-colored-dot/Dot'
import {
  setCollectionForUrl,
  setProductID,
  setSubCollectionForUrl,
} from '../../redux-setup/categorySlice'

import {
  addItemToWishlist,
  removeItemFromWishlist,
} from '../../redux-setup/wishlistSlice'
import { toast } from 'react-toastify'
import PrimaryHeader from '../../components/primary-header/PrimaryHeader'
import SecondaryHeader from '../../components/secondary-header/SecondaryHeader'
import Loaders from '@components/loaders/Loaders'
import useFetch from '../../lib/useFetch'
import { IoChevronForwardSharp } from 'react-icons/io5'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
const Products = () => {
  const [data, setData] = useState(null)
  const [shareIcons, setShareIcons] = useState(false)
  const dispatch = useDispatch()
  const [active, setActive] = useState(false)
  const router = useRouter()
  const country = useSelector((state) => state.country.country)
  const cartItems = useSelector((state) => state.cart.cartItems)
  const [totalPages, setTotalPages] = useState(1)
  const [state, setState] = useState()
  const [page, setPage] = useState(1)
  useEffect(() => {
    const { query } = router
    const pageParam = parseInt(query.page)

    if (!isNaN(pageParam) && pageParam >= 1) {
      setPage(pageParam)
    }
  }, [router.query])

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber)
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: pageNumber },
    })
  }

  const [loadQuery, { response, loading, error }] = useFetch(
    `/allproducts?country=${
      country === 'usa' ? 'available_in_usa' : 'available_in_canada'
    }&page=` + page,
    { method: 'get' },
    'formdata'
  )

  useEffect(() => {
    loadQuery()
    window.scrollTo({
      top: '0',
      left: '0',
      behavior: 'smooth',
    })
  }, [page])

  useEffect(() => {
    if (response) {
      setData(response.data)
      setTotalPages(response.data.last_page)
    }
  }, [response, error])

  const wishListItems = useSelector((state) => state.wishlist.items)
  const isInWishlist = (id) =>
    wishListItems.some((wishlistItem) => wishlistItem.id === id)

  const handlePush = (item) => {
    setActive(true)
    dispatch(setProductID(item?.id))
    const formattedSlug = item?.product_title
      .toLowerCase()
      .replace(/[ %"]/g, '-')
    if (formattedSlug) {
      dispatch(setCollectionForUrl(''))
      dispatch(setSubCollectionForUrl(''))
      router.push(`/products/${formattedSlug}`)
    }
  }

  const addToWishlist = (item) => {
    if (cartItems.some((cartItem) => cartItem.id === item.id)) {
      toast.error('Item is already in cart', { position: 'top-center' })
    } else {
      if (isInWishlist(item.id)) {
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

  const createPageNumbers = () => {
    let pages = []

    if (totalPages <= 5) {
      pages = Array.from({ length: totalPages }, (_, i) => i + 1)
    } else {
      pages.push(1)
      if (page > 3) pages.push('...')
      let startPage = Math.max(2, page - 1)
      let endPage = Math.min(totalPages - 1, page + 1)
      if (page <= 3) endPage = Math.min(4, totalPages - 1)
      if (page >= totalPages - 2) startPage = Math.max(2, totalPages - 3)
      for (let i = startPage; i <= endPage; i++) pages.push(i)
      if (page < totalPages - 2) pages.push('...')
      pages.push(totalPages)
    }

    return pages
  }

  const pages = createPageNumbers()

  return (
    <>
      {!data ? (
        <Loaders />
      ) : (
        <>
          <NextSeo
            title="Discover Sustainable Products at Ethical Swag"
            description="Explore a wide range of sustainable and ethically sourced promotional products at Ethical Swag."
            canonical="https://ethicalswag.com/products"
            openGraph={{
              type: 'article',
              article: {
                publishedTime: '2022-06-21T23:04:13Z',
                modifiedTime: '2022-01-21T18:04:43Z',
                authors: [
                  'https://ethicalswag.com/authors/@firstnameA-lastnameA',
                  'https://ethicalswag.com/authors/@firstnameB-lastnameB',
                ],
                tags: [
                  'Sustainability',
                  'Ethical Products',
                  'Promotional Items',
                ],
              },
              url: 'https://ethicalswag.com/products',
              images: {
                url: 'https://ethicalswag.com/images/product-cover.jpg',
                width: 850,
                height: 650,
                alt: 'Photo of sustainable products',
              },
              site_name: 'Ethical Swag',
            }}
          />

          <PrimaryHeader />
          <SecondaryHeader />

          <section className={Styles.conatainer_Sec}>
            <div className={Styles.collection_banner}>
              <div className={Styles.collection_banner_heading}>
                <h1>Category</h1>
                <p>All Products</p>
              </div>
            </div>
          </section>

          <section className={Styles.Product_container}>
            <div className={Styles.products_collection}>
              {data?.data.map((productData) => (
                <div className={Styles.collection_items} key={productData?.id}>
                  {productData?.image && (
                    <Image
                      src={productData?.image}
                      width={278}
                      height={311}
                      alt={productData?.product_title}
                    />
                  )}
                  <div className={Styles.product_card_content}>
                    <h2 className={Styles.title}>
                      {productData?.product_title}
                    </h2>
                    {productData?.unit_price && (
                      <div className={Styles.small_text}>
                        as low as ${productData?.unit_price}
                      </div>
                    )}
                    <div className={Styles.colors}>
                      {Object.entries(productData?.colours)
                        .slice(0, 8)
                        .map(([color, imageUrl], i) => (
                          <Dot color={color} imageUrl={imageUrl} key={i} />
                        ))}
                    </div>
                  </div>
                  <div className={Styles.hidden_icons}>
                    <div className={Styles.icons}>
                      <span
                        className={Styles.border_svg}
                        style={{
                          backgroundColor: isInWishlist(productData.id)
                            ? '#A2D061'
                            : '',
                        }}
                      >
                        <MdOutlineFavoriteBorder
                          fontSize={25}
                          color="#D3D3D3"
                          className={`${Styles.icon} ${
                            isInWishlist(productData.id) ? Styles.favActive : ''
                          }`}
                          onClick={() => addToWishlist(productData)}
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
                      <Share setShareIcons={setShareIcons} data={productData} />
                    )}
                    <button
                      className={Styles.viewProduct_btn}
                      onClick={() => handlePush(productData)}
                    >
                      View Product
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className={Styles.pagination_container}>
            {totalPages > 1 && (
              <div className={Styles.pagination_content}>
                <button
                  className={Styles.btn_flex}
                  onClick={() => handlePageClick(Math.max(1, page - 1))}
                  disabled={page === 1}
                  style={{
                    opacity: page === 1 ? '0.7' : '1',
                    cursor: page === 1 ? 'not-allowed' : 'pointer',
                  }}
                >
                  <MdArrowBackIos cursor="pointer" />
                  Previous
                </button>

                {pages.map((item, i) =>
                  item === '...' ? (
                    <span key={i} className={Styles.ellipsis}>
                      ...
                    </span>
                  ) : (
                    <button
                      key={i}
                      className={page === item ? 'active__pagination' : ''}
                      onClick={() => handlePageClick(item)}
                    >
                      {item}
                    </button>
                  )
                )}

                <button
                  className={`${Styles.btn_flex} ${Styles.btnGap}`}
                  onClick={() =>
                    handlePageClick(Math.min(page + 1, totalPages))
                  }
                  disabled={page === totalPages}
                  style={{
                    opacity: page === totalPages ? '0.7' : '1',
                    cursor: page === totalPages ? 'not-allowed' : 'pointer',
                  }}
                >
                  Next
                  <MdArrowBackIos cursor="pointer" />
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </>
  )
}

export default Products
