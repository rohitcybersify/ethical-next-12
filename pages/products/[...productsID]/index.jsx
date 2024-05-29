import React, { useEffect, useState } from 'react'
import PrimaryHeader from '../../../components/primary-header/PrimaryHeader'
import SecondaryHeader from '../../../components/secondary-header/SecondaryHeader'
import Footer from '../../../components/footer/Footer'
import { FaStar } from 'react-icons/fa6'
import ProductCard from '../../../components/ProductCard/ProductCard'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import Styles from '../../../styles/common.module.css'
import { LuMinusCircle, LuPlusCircle } from 'react-icons/lu'
import { Accordion_Data, Review_Progress } from '../../../constants/data'
import Image from 'next/image'
import images from '../../../constants/images'
import {
  initialValuesWriteReview,
  validationSchemaWriteReview,
} from '../../../lib/validationSchemas'
import { toast } from 'react-toastify'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import useFetch from '../../../lib/useFetch'
import Product from '../../../components/Product/Product'
import { NextSeo } from 'next-seo'

const productID = () => {
  const router = useRouter()

  const [writeReview, setWriteReview] = useState(true)
  const [isButtonClicked, setIsButtonClicked] = useState(false)
  const [selectedItem, setSelectedItem] = useState('Product')
  const [openIndex, setOpenIndex] = useState(null)
  const [data, setData] = useState([])
  const [starRatings, setStarRatings] = useState(5)
  const [productID, setProductID] = useState(null)
  const [productSlug, setProductSlug] = useState('')
  const [reviewData, setReviewData] = useState({
    userId: '',
    productId: '',
    rate: 5,
    name: '',
    email: '',
    review_title: '',
    review: '',
  })
  const country = useSelector((state) => state.country.country)

  const [singleProductApi, { response: singleProduct, loading, error }] =
    useFetch(
      `/products/${productSlug ? productSlug : ''}?country=${
        country === 'canada' ? 'canada' : 'usa'
      }`,
      {
        method: 'get',
      }
    )

  const [
    reviewsApi,
    { response: reviews, loading: reviewLoading, error: reviewError },
  ] = useFetch(`/product/review/${productID ? productID : ''}`, {
    method: 'get',
  })

  const [
    starProductApi,
    {
      response: starProductRes,
      loading: starProductLoading,
      error: starProductError,
    },
  ] = useFetch(
    `products?product_catogries=${
      singleProduct && JSON.parse(singleProduct?.data?.product_catogries)[0]
    }&${country === 'usa' ? `available_in_usa=1` : `available_in_canada=1`}`,
    {
      method: 'get',
    }
  )

  const [
    reviewsApiPost,
    {
      response: reviewsApiPostRes,
      loading: reviewsApiPostLoading,
      error: reviewsApiPostError,
    },
  ] = useFetch(`/auth/user/review`, {
    method: 'post',
  })

  useEffect(() => {
    if (router.isReady) {
      const asPath = router.asPath
      const slug = asPath.substring(asPath.lastIndexOf('/') + 1)
      setProductSlug(slug)
    }
  }, [router.isReady, router.asPath])

  useEffect(() => {
    if (country && productSlug) {
      singleProductApi()
    }
  }, [productSlug, country])

  useEffect(() => {
    if (singleProduct) {
      setProductID(singleProduct?.data?.id)
      starProductApi()
      reviewsApi()
    }
  }, [singleProduct, productID])

  useEffect(() => {
    if (starProductRes) {
      setData(starProductRes?.data)
    }
  }, [starProductRes, starProductError])

  const handleClick = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index))
  }

  const onSubmit = async (values) => {
    let data = {
      name: values.name,
      email: values.email,
      rate: starRatings,
      review_title: values.review_title,
      review: values.review,
      userId: '',
      productId: productID,
    }
    reviewsApiPost(data)
    values.name = ''
    values.email = ''
    values.review = ''
    values.review_title = ''
  }

  useEffect(() => {
    if (reviewsApiPostRes) {
      reviewsApi()
    }
  }, [reviewsApiPostRes])

  useEffect(() => {
    if (reviewsApiPostRes?.status === 201) {
      setWriteReview(false)
      toast.success(reviewsApiPostRes?.message, {
        position: 'top-center',
      })
    }
    if (reviewsApiPostError?.response?.status === 400) {
      setWriteReview(true)
      toast.error(reviewsApiPostError?.response?.data?.errors?.email[0], {
        position: 'top-center',
      })
    }
  }, [reviewsApiPostRes, reviewsApiPostError])

  let productAvailability =
    country === 'usa'
      ? singleProduct?.data?.available_in_usa
      : singleProduct?.data?.available_in_canada

  return (
    <>
      <NextSeo
        title={`Ethical Swag |
          ${
            singleProduct?.data?.meta_title
              ? singleProduct?.data?.meta_title
              : singleProduct?.data?.product_title
          }
        `}
        description={
          singleProduct?.data?.meta_description
            ? singleProduct?.data?.meta_description
            : singleProduct?.data?.product_description
        }
        canonical={`https://ethicalswag.com${router.asPath}`}
        openGraph={{
          url: `https://ethicalswag.com${router.asPath}`,
          images: {
            url: `${
              country === 'canada'
                ? singleProduct?.data?.images_ca[0]
                : singleProduct?.data?.images_us[0]
            }`,
            width: 850,
            height: 650,
            alt: 'Photo of sustainable products',
          },
          site_name: 'Ethical Swag',
        }}
      />
      <NextSeo
        title={`Ethical Swag |
        ${
          singleProduct?.data?.meta_title
            ? singleProduct?.data?.meta_title
            : singleProduct?.data?.product_title
        }
      `}
        description={
          singleProduct?.data?.meta_description
            ? singleProduct?.data?.meta_description
            : singleProduct?.data?.product_description
        }
        canonical={`https://ethicalswag.com${router.asPath}`}
        openGraph={{
          type: 'product',
          product: {
            availability: `https://ethicalswag.com${router.asPath}`,
            price: '29.99',
            priceCurrency: 'USD',
            brand: 'Ethical Swag',
          },
          url: `https://ethicalswag.com${router.asPath}`,
          images: [
            {
              url: `${
                country === 'canada'
                  ? singleProduct?.data?.images_ca[0]
                  : singleProduct?.data?.images_us[0]
              }`,
              width: 850,
              height: 650,
              alt: 'Amazing Product X',
            },
          ],
          site_name: 'Example Store',
        }}
      />

      <PrimaryHeader />
      <SecondaryHeader />
      <Product
        product={singleProduct?.data}
        loading={loading}
        error={error}
        productID={productID}
        reviews={reviews}
      />

      {productAvailability === 1 && (
        <>
          <section className={Styles.singleProduct_dimensions}>
            <div className={Styles.product_list_wrapper}>
              <ul
                style={{ cursor: 'pointer' }}
                className={Styles.singleProduct_list}
              >
                <li
                  className={
                    selectedItem === 'Product' ? Styles.active_product : ''
                  }
                  onClick={() => setSelectedItem('Product')}
                >
                  Product Description
                </li>
                <li
                  className={
                    selectedItem === 'Dimensions' ? Styles.active_product : ''
                  }
                  onClick={() => setSelectedItem('Dimensions')}
                >
                  Dimensions
                </li>
                <li
                  className={
                    selectedItem === 'Material' ? Styles.active_product : ''
                  }
                  onClick={() => setSelectedItem('Material')}
                >
                  Material(s)
                </li>
                <li
                  className={
                    selectedItem === 'Swift Swag' ? Styles.active_product : ''
                  }
                  onClick={() => setSelectedItem('Swift Swag')}
                >
                  Swift Swag Qualified
                </li>
              </ul>
            </div>
            <div className={Styles.product_description_details}>
              {selectedItem === 'Product' && (
                <li>{singleProduct?.data.product_description}</li>
              )}
              {selectedItem === 'Dimensions' && (
                <li>{singleProduct?.data.product_dimensions}</li>
              )}
              {selectedItem === 'Material' && (
                <li>{singleProduct?.data.material_made}</li>
              )}
              {selectedItem === 'Swift Swag' && (
                <>
                  Swift Swag is our new service designed to serve your Swag
                  needs with quick turn-around. Production and delivery time: 10
                  business days after proof approval and payment. Qualified
                  Customization Methods: 1-Color Print (e.g. screen printing and
                  pad printing) Laser Engraving Deboss Embroidery (apparel
                  products only) Exceptions apply. Please inquire about
                  Embroidery and Full-Color Customizations on Hard Goods and
                  Drinkware with our team. Maximum Quantity per order: Apparel:
                  100 units per item. Hard Goods: 600 units per item. For orders
                  above these maximum quantities, please contact our team.
                  Additional Charges: USD $55 per item. If your artwork file
                  isn't ready for production, a fee will be added to your order
                  and it may add a day in production. Freight is calculated
                  after the order is submitted. The total amount will be sent to
                  you along with the virtual proof for approval. Questions about
                  Swift Swag? Contact us using the form below or email
                  info@ethicalswag.com
                </>
              )}
            </div>
          </section>
          <section className={Styles.product_section}>
            <div className={Styles.heading_content}>
              <h2>You may also like</h2>
            </div>

            <div className={Styles.product_card_container}>
              {data?.length > 0 &&
                data?.slice(0, 5).map((item, i) => (
                  <>
                    <div className={Styles.product_content} key={i}>
                      <ProductCard
                        item={item}
                        key={item.id}
                        fromSingleProduct
                      />
                    </div>
                  </>
                ))}
            </div>
            <div className={Styles.accordion_section}>
              <div className={Styles.accordion_left_container}>
                <h3>We’re serious about facts. Ask away.</h3>
                <button
                  onClick={() => router.push('/faq')}
                  className={Styles.product_bottombtn}
                >
                  See All FAQs
                </button>
                <div className={Styles.accordion_container}>
                  {Accordion_Data.map((data, index) => (
                    <>
                      <div className={Styles.accordion_details}>
                        <div className={Styles.accordion_content}>
                          <p>{data.text}</p>
                          <button onClick={() => handleClick(index)}>
                            {openIndex === index ? (
                              <>
                                <LuMinusCircle fontSize={30} />
                              </>
                            ) : (
                              <LuPlusCircle fontSize={30} />
                            )}
                          </button>
                        </div>
                        <div className={Styles.accordion_detail}>
                          {openIndex === index && (
                            <p className={Styles.open_accrodion}>
                              {data.content}
                            </p>
                          )}
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              </div>
              <div className={Styles.accordion_right_container}>
                <div className={Styles.container}>
                  <div className={Styles.content}>
                    <div className={Styles.textContent}>
                      <div>
                        <h3 className={Styles.title}>
                          Need a little help with your order?
                        </h3>
                        <p className={Styles.desc}>
                          We have a dedicated team of experienced professionals
                          available to guide you every step of the way. You
                          don’t have to figure it all out on your own. From
                          product recommendations to coordinating swag shipments
                          to your next team retreat, we love creating memorable
                          experiences for our clients. Let’s connect!
                        </p>
                      </div>
                      <button
                        className={Styles.product_bottombtn}
                        onClick={() => router.push('/services')}
                      >
                        More About Our Services
                      </button>
                    </div>
                    <div className={Styles.imgContent}>
                      <Image src={images.bag_image} layout="fill" alt="" />
                    </div>
                  </div>
                </div>
                <div className={Styles.container}>
                  <div className={Styles.content}>
                    <div className={Styles.textContent}>
                      <div>
                        <h2 className={Styles.title}>We’re here for you.</h2>
                        <p className={Styles.desc}>
                          You can also text or call us at:
                        </p>
                        <div>
                          <a href="tel:(877) 256-6998">(877) 256-6998 </a>|{' '}
                          <a href="tel:(902) 500-1086">(902) 500-1086</a>
                        </div>
                      </div>

                      <div>
                        <p className={Styles.desc}>Or reach us via email at:</p>
                        <div>
                          <a href="mailto:info@ethicalswag.com">
                            info@ethicalswag.com
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className={Styles.imgContentwrap}>
                      <Image src={images.email} layout="fill" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Product Review Section */}
            <div className={Styles.product_review_section}>
              <div className={Styles.top_content}>
                <h3>Product Review</h3>
                <button onClick={() => setWriteReview(!writeReview)}>
                  Write a review
                </button>
              </div>
              {/* Write a Review Section */}
              <div
                className={
                  writeReview
                    ? Styles.write_review_container
                    : Styles.hide_review
                }
              >
                <Formik
                  initialValues={initialValuesWriteReview}
                  validationSchema={validationSchemaWriteReview}
                  onSubmit={onSubmit}
                >
                  {({ values, errors }) => (
                    <>
                      <Form>
                        <div className={Styles.input_field}>
                          <div
                            className={`${Styles.startRating} ${Styles.text_center} `}
                          >
                            {[...Array(5)].map((_, index) => (
                              <FaStar
                                key={index}
                                color={
                                  index < starRatings ? '#a2d061' : '#000000'
                                }
                                fontSize={20}
                                onClick={() => setStarRatings(index + 1)}
                                style={{ cursor: 'pointer' }}
                              />
                            ))}
                          </div>
                        </div>

                        <div className={Styles.row_flex}>
                          <div className={Styles.input_field}>
                            <Field
                              type="text"
                              id="textarea"
                              name="name"
                              placeholder="Enter your name"
                              autoComplete="off"
                              // className={Styles.SwagOrder_need_textarea}
                            />
                            <ErrorMessage
                              name="name"
                              component="div"
                              className={Styles.error}
                            />
                          </div>
                          <div className={Styles.input_field}>
                            <Field
                              type="text"
                              id="textarea"
                              name="email"
                              placeholder="Enter your email"
                              autoComplete="off"
                            />
                            <ErrorMessage
                              name="email"
                              component="div"
                              className={Styles.error}
                            />
                          </div>
                        </div>

                        <div className={Styles.input_field}>
                          <Field
                            type="text"
                            id="textarea"
                            name="review_title"
                            placeholder="Enter your review title"
                            autoComplete="off"
                          />
                          <ErrorMessage
                            name="review_title"
                            component="div"
                            className={Styles.error}
                          />
                        </div>
                        <div
                          className={`${Styles.input_field} ${Styles.text_left}`}
                        >
                          <Field
                            as="textarea"
                            rows="4"
                            type="text"
                            id="textarea"
                            name="review"
                            placeholder="Enter your review "
                            autoComplete="off"
                          />
                          <ErrorMessage
                            name="review"
                            component="div"
                            className={Styles.error}
                          />

                          <p>
                            How we use your data: We’ll only contact you about
                            the review you left, and only if necessary. By
                            submitting your review, you agree terms and
                            conditions and privacy policy.
                          </p>
                        </div>

                        <div className={Styles.input_field}>
                          <button className={Styles.submit_review_button}>
                            Submit Review
                          </button>
                        </div>
                      </Form>
                    </>
                  )}
                </Formik>
              </div>
              <div className={Styles.bottomContent}>
                {reviews && reviews?.data?.productreview.length > 0 && (
                  <>
                    <div className={Styles.leftContent}>
                      {reviews?.data?.productreview &&
                        reviews?.data?.productreview.length > 0 &&
                        reviews?.data?.productreview
                          .slice(0, 2)
                          .map((review) => (
                            <>
                              <div className={Styles.container}>
                                <div className={Styles.startRating}>
                                  {[...Array(review.rate)].map((_, index) => (
                                    <FaStar
                                      key={index}
                                      color="#a2d061"
                                      fontSize={20}
                                    />
                                  ))}
                                </div>

                                <h3 className={Styles.title}>
                                  {review.review_title}
                                </h3>
                                <p className={Styles.desc}>{review.review}</p>
                              </div>
                            </>
                          ))}
                    </div>

                    <div className={Styles.rightContent}>
                      <div className={Styles.righttopContent}>
                        <p>4/5 Stars</p>
                        <div className={Styles.stars_content}>
                          <FaStar color="#a2d061" fontSize={20} />
                          <FaStar color="#a2d061" fontSize={20} />
                          <FaStar color="#a2d061" fontSize={20} />
                          <FaStar color="#a2d061" fontSize={20} />
                          <FaStar color="#a2d061" fontSize={20} />
                        </div>
                        <span>
                          {reviews?.data?.ratings?.total_reviews} Reviews
                        </span>
                      </div>
                      {reviews?.data?.ratings?.percentage_data && (
                        <div className={Styles.rightBottomContent}>
                          {Review_Progress(
                            reviews?.data?.ratings?.percentage_data
                          ).map((data, i) => (
                            <>
                              <div className={Styles.bottom_content} key={i}>
                                <h3>{data.number}</h3>
                                <progress
                                  max="100"
                                  value={+data.percentage}
                                  style={{ color: '#a2d061' }}
                                  className={Styles.progress_bar}
                                />
                                <p>{+data.percentage}%</p>
                              </div>
                            </>
                          ))}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Resources Section */}
            <div className={Styles.resources_section}>
              <div className={Styles.ressource_container}>
                <div className={Styles.left_content}>
                  <div className={Styles.textContent}>
                    <p className={Styles.ressousce_subheading}>Resources</p>
                    <h2>How can you find the best product for your company?</h2>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum is simply dummy text of
                      the printing and typesetting industry.
                    </p>
                    <div className={Styles.resources_btns}>
                      <button>View Pdf</button>
                      <button>Download Pdf</button>
                    </div>
                  </div>
                </div>
                <div className={Styles.right_content}>
                  <Image src={images.pages} width={500} height={500} alt="" />
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      <Footer />
    </>
  )
}

export default productID
