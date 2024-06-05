'use client'
import React from 'react'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Styles from '../Filter/Filter.module.css'
import PromotionImg from '../../assets/products_promotion.svg'
import ProductCard from '../ProductCard/ProductCard'
import Loaders from '@components/loaders/Loaders'
import { setCollectionForUrl, setProductID } from 'redux-setup/categorySlice'
const Products = ({ finalProducts }) => {
  const router = useRouter()

  const dispatch = useDispatch()
  const promotionalProduct = useSelector(
    (state) => state.random.singleProductPromotion
  )
  const response = useSelector((state) => state.category.getProductsRes)
  const loading = useSelector((state) => state.category.getProductsLoading)
  const collectionForUrl = useSelector(
    (state) => state.category.collectionForUrl
  )
  const subcategoryCollectionFromUrl = useSelector(
    (state) => state.category.subCollectionForUrl
  )
  const formattedSlug = promotionalProduct?.product_title
    ? promotionalProduct.product_title.replace(/ /g, '-')
    : ''
  const handlePush = (item) => {
    dispatch(setProductID(item?.id))
    dispatch(setCollectionForUrl(''))
    // router.push(fromSingleProduct ? `${id}` : `/category/${collectionForUrl}/${item?.id}`)
    router.push(
      `/products/drinkware/${
        subcategoryCollectionFromUrl
          ? subcategoryCollectionFromUrl + '/' + formattedSlug
          : formattedSlug
      }`
    )
  }

  return (
    <>
      {loading ? (
        <Loaders />
      ) : (
        <>
          {finalProducts.length > 0 ? (
            <div
              className={Styles.collection_wrapper}
              style={{ marginBottom: '30px' }}
            >
              <div className={Styles.collection_container}>
                {promotionalProduct && (
                  <div className={Styles.collection_Single}>
                    <div className={Styles.imgContent}>
                      <Image
                        src={promotionalProduct.image}
                        width={221}
                        height={345}
                        alt={promotionalProduct?.product_title}
                        className={Styles.img}
                      />
                      <span className={Styles.badget}>Sale 30%</span>
                    </div>
                    <div className={Styles.textContent}>
                      <h4 className={Styles.textContent_title}>
                        {promotionalProduct.product_title}
                      </h4>
                      <p>as low as ${promotionalProduct.unit_price || 60}</p>
                      <Image
                        src={PromotionImg}
                        width={132}
                        height={21}
                        className={Styles.img}
                      />
                      <div className={Styles.checkbtn}>
                        <button onClick={() => handlePush(promotionalProduct)}>
                          Check it out
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {finalProducts
                  .filter((item) => item?.image_whislist)
                  .slice(0, 10)
                  .map((item) => (
                    <ProductCard item={item} key={item.id} />
                  ))}
              </div>
            </div>
          ) : (
            <div
              className={Styles.collection_wrapper}
              style={{ marginBottom: '30px' }}
            >
              <div
                className={Styles.collection_container}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '3rem',
                  color: '#A2D061',
                }}
              >
                No Products Found
              </div>
            </div>
          )}
        </>
      )}
    </>
    // <>
    //   {loading ? (
    //     <>
    //       <Loaders />
    //     </>
    //   ): (
    //    <>
    //   {/* {finalProducts.length > 0 && ( */}
    //     <div
    //       className={Styles.collection_wrapper}
    //       style={{ marginBottom: '30px' }}
    //     >
    //       <div className={Styles.collection_container}>
    //         {promotionalProduct && (
    //           <div className={Styles.collection_Single}>
    //             <div className={Styles.imgContent}>
    //               <Image
    //                 src={promotionalProduct.image}
    //                 width={221}
    //                 height={345}
    //                 alt="cup"
    //                 className={Styles.img}
    //               />
    //               <span className={Styles.badget}>Sale 30%</span>
    //             </div>
    //             <div className={Styles.textContent}>
    //               <h4 className={Styles.textContent_title}>
    //                 {promotionalProduct.product_title}
    //               </h4>
    //               <p>as low as ${promotionalProduct.unit_price || 60}</p>
    //               <Image
    //                 src={PromotionImg}
    //                 width={132}
    //                 height={21}
    //                 alt="cup"
    //                 className={Styles.img}
    //               />
    //               <div className={Styles.checkbtn}>
    //                 <button onClick={() => handlePush(promotionalProduct)}>
    //                   Check it out
    //                 </button>
    //               </div>
    //             </div>
    //           </div>
    //         )}
    //         {finalProducts
    //           .filter((item) => item?.image_whislist)
    //           .slice(0, 10)
    //           .map((item, index) => {
    //             return <ProductCard item={item} key={item.id} />
    //           })}
    //       </div>
    //     </div>

    //     <div
    //       className={Styles.collection_wrapper}
    //       style={{ marginBottom: '30px' }}
    //     >
    //       <div
    //         className={Styles.collection_container}
    //         style={{
    //           display: 'flex',
    //           justifyContent: 'center',
    //           alignItems: 'center',
    //           fontSize: '3rem',
    //           color: '#A2D061',
    //         }}
    //       >
    //         No Products Found
    //       </div>
    //     </div>

    // </>
  )
}
export default Products
