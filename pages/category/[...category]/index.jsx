import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import Footer from '@components/footer/Footer'
import Modal from '@components/modal/Modal'
import PrimaryHeader from '@components/primary-header/PrimaryHeader'
import SecondaryHeader from '@components/secondary-header/SecondaryHeader'
import Product from '../../../components/products-final-builder-component/Product'
import Image from 'next/image'
import images from '../../../constants/images'
import Styles from '../../../styles/category.module.css'
import {
  setCollectionForUrl,
  setSubCollectionForUrl,
} from '../../../redux-setup/categorySlice'
// import CountryBasedText from '../../components/locationStatus/CountryBasedText'
const index = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const str = router.asPath
  const newheading = str.split('/').pop()

  const [relatedCategories, setRelatedCategories] = useState([])
  const allCategories = useSelector((state) => state.category.allCategories)

  const collectionForUrl = useSelector(
    (state) => state.category.collectionForUrl
  )
  const subCollectionForUrl = useSelector(
    (state) => state.category.subCollectionForUrl
  )
  const swiftSwag = useSelector((state) => state.filter.swiftSwag)

  useEffect(() => {
    const generateRelatedCategories = () => {
      const related =
        allCategories &&
        Object.keys(allCategories).filter(
          (category) => (category === collectionForUrl, 'category')
        )
      if (related.length > 2) {
        const randomIndices = []
        while (randomIndices.length < 2) {
          const randomIndex = Math.floor(Math.random() * related.length)
          if (!randomIndices.includes(randomIndex)) {
            randomIndices.push(randomIndex)
          }
        }
        setRelatedCategories(randomIndices.map((index) => related[index]))
      } else {
        setRelatedCategories(related)
      }
    }

    generateRelatedCategories()
  }, [collectionForUrl])

  const handlePush = (data) => {
    router.push(`/category/${data}`)
    dispatch(setCollectionForUrl(data))
    dispatch(setSubCollectionForUrl(''))
  }

  const handleBags = () => {
    dispatch(setCollectionForUrl('bags'))
    dispatch(setSubCollectionForUrl(''))
    router.push('/category/bags')
  }

  const handleCategory = () => {
    dispatch(setCollectionForUrl(collectionForUrl))
    dispatch(setSubCollectionForUrl(''))
    router.push(`/category/${collectionForUrl}`)
  }

  const handleCategoryPage = () => {
    router.push('/category')
    dispatch(setCollectionForUrl(''))
    dispatch(setSubCollectionForUrl(''))
  }

  return (
    <div>
      <PrimaryHeader />
      <SecondaryHeader />
      <Modal />
      <section className={Styles.conatainer_Sec}>
        <div
          className={Styles.collection_banner}
          style={{
            backgroundImage: allCategories[newheading]?.image
              ? `url(${allCategories[newheading]?.image})`
              : `url(../assets/headerPics/collection_banner.png)`,
          }}
        >
          <div className={Styles.collection_banner_heading}>
            <h1 className={Styles.category_heading}>
              {swiftSwag ? 'Swift Swag' : `${collectionForUrl}`}
            </h1>
            {swiftSwag && (
              <p>Your swag produced and delivered in 10 business days!</p>
            )}
            <p>
              <span
                onClick={() => router.push('/')}
                style={{ cursor: 'pointer' }}
              >
                Home
              </span>
              <span> {'>'}</span>{' '}
              <span
                onClick={handleCategoryPage}
                style={{ cursor: 'pointer', textTransform: 'capitalize' }}
              >
                Category
              </span>{' '}
              {'>'}
              <span
                onClick={handleCategory}
                style={{ cursor: 'pointer', textTransform: 'capitalize' }}
              >
                {' '}
                {collectionForUrl}
              </span>
              {subCollectionForUrl ? (
                <span
                  style={{ cursor: 'pointer', textTransform: 'capitalize' }}
                >
                  <span>{'> '}</span>
                  {subCollectionForUrl}
                </span>
              ) : (
                ''
              )}
            </p>
          </div>
        </div>
      </section>
      {/* <CountryBasedText /> */}
      <Product />

      <div className={Styles.related_product_container}>
        <div className={Styles.related_product_content}>
          <div className={Styles.imgContent}>
            <Image
              src={images.Related_product}
              width={400}
              height={400}
              alt="Bag"
            />
          </div>
          <div className={Styles.textContent}>
            <h4>Related Product</h4>
            <h2>Bags</h2>
            <p>
              Bags refer to a category of products that are designed for
              carrying and storing various items. They come in a wide range of
              styles, sizes, and materials, each catering to specific needs and
              preferences
            </p>
            <button type="button" onClick={handleBags}>
              Shop Now
            </button>
          </div>
        </div>
      </div>
      <div className={Styles.related_categories}>
        <div className={Styles.content_wrapper}>
          {relatedCategories &&
            relatedCategories.map((data) => (
              <>
                <div className={Styles.img_content_1}>
                  <div className={Styles.imgContent}>
                    <Image
                      src={allCategories[data]?.image}
                      layout="fill"
                      alt="Related Categories"
                    />
                  </div>
                  <div className={Styles.textContent}>
                    <div>
                      <h3 className={Styles.text_capitalize}>{data}</h3>
                    </div>

                    <button onClick={() => handlePush(data)}>Shop Now</button>
                  </div>
                </div>
              </>
            ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default index
