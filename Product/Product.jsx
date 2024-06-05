import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import images from '../../constants/images'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { useDropzone } from 'react-dropzone'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import Styles from './Product.module.css'
import Loaders from '../../components/loaders/Loaders'
import Dot from '../custom-colored-dot/Dot'
import {
  addItemToWishlist,
  removeItemFromWishlist,
} from '../../redux-setup/wishlistSlice'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { RxCross2 } from 'react-icons/rx'
import { setCartItems, setProductLogo } from '../../redux-setup/cartSlice'
import { toast } from 'react-toastify'
import { MdOutlineFavoriteBorder } from 'react-icons/md'
import { CiShare2 } from 'react-icons/ci'

// import '../../global.css'
import {
  setDecorationItemObjSingleProductPage,
  setFinalDecorationKeyVal,
} from 'redux-setup/randomSlice'
import InfoToolTip from '../../components/InfoToolTip/InfoTooltip'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import EmojiModal from '../EmojiModal/EmojiModal'
import { useRouter } from 'next/router'
import {
  setCollectionForUrl,
  setSubCollectionForUrl,
} from '../../redux-setup/categorySlice'
import Share from '../Share/Share'
import EmptyContainer from '../EmptyContainer/EmptyContainer'

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 10,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 7,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 6,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 3,
  },
}

const Product = ({ product, loading, error, reviews }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [openEmoji, setOpenEmoji] = useState(false)
  const [openPopUp, setOpenPopUp] = useState('')
  const [file, setFile] = useState(null)
  const [active, setActive] = useState(false)
  const [uploadResponse, setUploadResponse] = useState(null)
  const [ReadMore, setIsReadMore] = useState(false)
  const [shareIcons, setShareIcons] = useState(false)
  const [uploadFirstLogo, setUploadFirstLogo] = useState('')
  const [selectedCustomization, setSelectedCustomization] = useState()
  const [customizationId, setCustomizationId] = useState('')
  const [choosenCustomization, setChoosenCustomization] = useState(null)
  // console.log(Customization,"aa")
  const [actualMinQty, setActualMinQty] = useState(0)
  const [imagesArray, setImagesArray] = useState([])
  const [singleImage, setSingleImage] = useState('')
  const [nameOfDecorations, setNameOfDecorations] = useState([])
  const [sizeNotSure, setSizeNotSure] = useState(false)
  const [isSample, setIsSample] = useState(false)
  const [swiftSwag, setSwiftSwag] = useState(false)
  const [selectedColor, setSelectedColor] = useState(null)
  const [cartItemsSwiftSwag, setCartItemsSwiftSwag] = useState()
  const [priceWithoutCustomizations, setPriceWithoutCustomizations] =
    useState(0)
  const [customizationPrice, setCustomizationPrice] = useState(0)
  const country = useSelector((state) => state.country.country)

  const collectionForUrl = useSelector(
    (state) => state.category.collectionForUrl
  )
  console.log(uploadFirstLogo, "uploadFirstLogo")
  console.log(productID, "productID")
  // console.log(collectionForUrl,"collectionForUrl")
  const subCollectionForUrl = useSelector(
    (state) => state.category.subCollectionForUrl
  )

  const swiftSwagChecked = useSelector((state) => state.filter.swiftSwag)

  const cartItems = useSelector((state) => state.cart.cartItems)

  const [totalPrice, setTotalPrice] = useState(0)
  const userId = useSelector((state) => state.auth.userId)
  const [isSizesTotal, setIsSizesTotal] = useState(true)
  const [errorMessage, setErrorMessage] = useState('');
  const [sizeQuantity, setSizeQuantity] = useState({
    S: 0,
    M: 0,
    L: 0,
    XL: 0,
  })
  console.log(uploadResponse, "uploadResponse")

  const [cartState, setCartState] = useState({
    quantity: 0,
    image: null,
    heading: null,
    price: null,
    id: null,
    user: null,
    logoImg: null,
    colours: null,
    customization: null,
    isSample: false,
    swiftSwag: false,
    SizeQuantityS: 0,
    SizeQuantityM: 0,
    SizeQuantityL: 0,
    SizeQuantityXL: 0,
    productCategory: 0,
  })

  const wishListItems = useSelector((state) => state.wishlist.items)
  const decorations = useSelector(
    (state) => state.random.decorationItemObjSingleProductPage
  )
  const finalDecorationKeyVal = useSelector(
    (state) => state.random.finalDecorationKeyVal
  )

  let supplierFees =
    country === 'usa' ? product?.supplier_fees_usd : product?.supplier_fees_cad

  console.log(uploadResponse, 'hnce')

  const onDrop = useCallback(async (acceptedFiles) => {
    setFile(acceptedFiles)
    const maxFileSizeMB = 1
    const fileSizeMB = acceptedFiles[0].size / (1024 * 1024)
    if (acceptedFiles && fileSizeMB < 1) {
      const formData = new FormData()
      formData.append('file', acceptedFiles[0])
      formData.append('type', acceptedFiles[0].name.split('.')[1])
      if (
        acceptedFiles[0].name.split('.')[1] == 'pdf' ||
        acceptedFiles[0].name.split('.')[1] == 'eps' ||
        acceptedFiles[0].name.split('.')[1] == 'ai'
      ) {
        try {
          const response = await fetch(
            'https://frontend.goaideme.com/vector-files',
            {
              method: 'POST',
              body: formData,
            }
          )
          if (response.ok) {
            const responseData = await response.json()
            console.log('File uploaded successfully')
            setUploadResponse(responseData.imgpath.Url) // Set upload response URL
            setUploadFirstLogo(responseData)
            dispatch(setProductLogo(responseData?.imagepath.Url))
          } else {
            console.error('Failed to upload file')
            // Handle error, if needed
          }
        } catch (error) {
          console.error('Error uploading file:', error)
          // Handle error, if needed
        }
      } else {
        setUploadFirstLogo(acceptedFiles[0])
        dispatch(setProductLogo(acceptedFiles[0]))
      }
    } else {
      toast.error('Please upload file less than 1MB', {
        position: 'top-center',
        autoClose: 1500,
      })
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const handleQuantity = (e) => {
    const value = e.target.value.trim()
    console.log(value, "value")
    const newQuantity = value === '' ? null : parseInt(value, 10);
    if (newQuantity !== null && newQuantity < actualMinQty) {
      setErrorMessage(`Quantity must be ${actualMinQty} or higher.`);
    } else {
      setErrorMessage('');
    }
    setQuantity(newQuantity)
    setState(value)
    setIsSizesTotal(true)
  }
  console.log(quantity, "as")
  useEffect(() => {
    if (supplierFees) {
      for (const key in supplierFees) {
        if (supplierFees[key].length !== 0) {
          if (supplierFees[key][0]?.decoration_type) {
            setSelectedCustomization(0)
          }
        }
      }
    }
  }, [country, product])

  useEffect(() => {
    if (isSizesTotal) {
      const sizes = Object.keys(sizeQuantity)

      const sizePriorities = {
        M: 40,
        L: 30,
        XL: 20,
        S: 10,
      }
      const totalPriorityQuantity = Object.values(sizePriorities).reduce(
        (acc, curr) => acc + curr,
        0
      )

      const updatedSizeQuantity = {}
      sizes.forEach((size) => {
        updatedSizeQuantity[size] = Math.round(
          (sizePriorities[size] / totalPriorityQuantity) * quantity
        )
      })
      setSizeQuantity(updatedSizeQuantity)
    }
  }, [quantity])
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
        // If the item is already in the wishlist, remove it
        dispatch(removeItemFromWishlist(item.id))
        toast.success('Item removed from wishlist', {
          position: 'top-center',
          autoClose: 1500,
        })
      } else {
        // Otherwise, add the item to the wishlist
        dispatch(addItemToWishlist(item))
        toast.success('Item added to wishlist', {
          position: 'top-center',
          autoClose: 1500,
        })
      }
    }
  }

  const isInWishlist = wishListItems.some(
    (wishlistItem) => wishlistItem.id === product?.id
  )

  useEffect(() => {
    cartItems.map((obj) => dispatch(removeItemFromWishlist(obj.id)))
  }, [cartItems])

  let isProductIncludesltm_final = product?.ltm_final.includes('Y')
  let col1Price =
    country === 'usa'
      ? product?.column_1_retail_price_usd
      : product?.column_1_retail_price_cad
  let col2Price =
    country === 'usa'
      ? product?.column_2_retail_price_usd
      : product?.column_2_retail_price_cad
  let col3Price =
    country === 'usa'
      ? product?.column_3_retail_price_usd
      : product?.column_3_retail_price_cad
  let col4Price =
    country === 'usa'
      ? product?.column_4_retail_price_usd
      : product?.column_4_retail_price_cad
  let col5Price =
    country === 'usa'
      ? product?.column_5_retail_price_usd
      : product?.column_5_retail_price_cad
  let col1Qty = product?.column_1_qty
  let col2Qty = product?.column_2_qty
  let col3Qty = product?.column_3_qty
  let col4Qty = product?.column_4_qty
  let col5Qty = product?.column_5_qty

  let ltm_price =
    country === 'usa'
      ? product?.ltm_usd
        ? JSON.parse(product?.ltm_usd)[0]
        : 0
      : product?.ltm_cad
        ? JSON.parse(product?.ltm_cad)[0]
        : 0

  const getPrice = () => {
    if (isProductIncludesltm_final) {
      if (+quantity < +product?.column_1_qty) {
        setPriceWithoutCustomizations(+col1Price + ltm_price / +quantity)
      } else if (+quantity < +col2Qty) {
        setPriceWithoutCustomizations(+col1Price)
      } else if (+quantity < +col3Qty) {
        setPriceWithoutCustomizations(+col2Price)
      } else if (+quantity < +col4Qty) {
        setPriceWithoutCustomizations(+col3Price)
      } else if (+quantity < +col5Qty) {
        setPriceWithoutCustomizations(+col4Price)
      } else {
        setPriceWithoutCustomizations(+col5Price)
      }
    } else {
      if (+quantity < +col2Qty) {
        setPriceWithoutCustomizations(+col1Price)
      } else if (+quantity < +col3Qty) {
        setPriceWithoutCustomizations(+col2Price)
      } else if (+quantity < +col4Qty) {
        setPriceWithoutCustomizations(+col3Price)
      } else if (+quantity < +col5Qty) {
        setPriceWithoutCustomizations(+col4Price)
      } else {
        setPriceWithoutCustomizations(+col5Price)
      }
    }
  }
  useEffect(() => {
    if (isSample) {
      setQuantity(3)
    } else if (actualMinQty > 100) {
      setQuantity(actualMinQty)
    } else if (product && actualMinQty && !isSample) {
      setQuantity(100)
    }
  }, [product, actualMinQty, isSample])
  useEffect(() => {
    if (product) {
      getPrice()
    }
  }, [quantity, totalPrice, product, customizationPrice])

  useEffect(() => {
    if (product) {
      let minQtyy = isProductIncludesltm_final
        ? +product?.column_1_qty / 2
        : +product?.column_1_qty
      setActualMinQty(Math.round(minQtyy))
    }
  }, [product])

  useEffect(() => {
    if (openEmoji) {
      document.documentElement.classList.add('open_emoji')
    } else {
      document.documentElement.classList.remove('open_emoji')
    }
  }, [openEmoji])

  const existedWishlistItem = cartItems.some(
    (cartItem) => cartItem.id === product?.id
  )

  const handleQuantitySize = (e, key) => {
    setIsSizesTotal(false)
    let newSizeQuantity
    if (key === 'S') {
      newSizeQuantity = {
        ...sizeQuantity,
        [e.target.name]:
          e.target.value < 0 || e.target.value === ''
            ? 0
            : parseInt(e.target.value),
      }
    }

    if (key === 'L') {
      newSizeQuantity = {
        ...sizeQuantity,
        [e.target.name]:
          e.target.value < 0 || e.target.value === '' ? 0 : e.target.value,
      }
    }
    if (key === 'M') {
      newSizeQuantity = {
        ...sizeQuantity,
        [e.target.name]:
          e.target.value < 0 || e.target.value === '' ? 0 : e.target.value,
      }
    }
    if (key === 'XL') {
      newSizeQuantity = {
        ...sizeQuantity,
        [e.target.name]:
          e.target.value < 0 || e.target.value === '' ? 0 : e.target.value,
      }
    }

    setSizeQuantity(newSizeQuantity)
    const totalQuantity = Object.values(newSizeQuantity).reduce(
      (acc, curr) => acc + parseInt(curr),
      0
    )

    if (totalQuantity) {
      setQuantity(totalQuantity)
    }
  }

  const uploadFirstFile = (event) => {
    setUploadFirstLogo(event.target.files[0])
    dispatch(setProductLogo(event.target.files[0]))
  }

  const selectCustomizations = (index, key, val) => {
    const obj = {}
    obj.key = val
    setCustomizationId(key)

    setChoosenCustomization(obj)
    let price1 = country === 'usa' ? val.rc_usa_1 : val.rc_cad_1
    let price2 = country === 'usa' ? val.rc_usa_2 : val.rc_cad_2
    let price3 = country === 'usa' ? val.rc_usa_3 : val.rc_cad_3
    let price4 = country === 'usa' ? val.rc_usa_4 : val.rc_cad_4
    let price5 = country === 'usa' ? val.rc_usa_5 : val.rc_cad_5
    let retailSetup =
      country === 'usa' ? val.retail_setup_usd : val.retail_setup_cad

    setSelectedCustomization(index)

    let IsRcSourceIncluded = product.rc_mcq_source == 'Supplier Fees'
    let price = 0
    if (IsRcSourceIncluded) {
      if (quantity < +val.qty_rc_2) {
        price = +price1
      } else if (quantity < +val.qty_rc_3) {
        price = +price2
      } else if (quantity < +val.qty_rc_4) {
        price = +price3
      } else if (quantity < +val.qty_rc_5) {
        price = +price4
      } else {
        price = +price5
      }

      let finalCustomPrice = retailSetup / quantity + price
      setCustomizationPrice(finalCustomPrice)
    } else {
      if (quantity < col2Qty) {
        price = +price1
      } else if (quantity < col3Qty) {
        price = +price2
      } else if (quantity < col4Qty) {
        price = +price3
      } else if (quantity < col5Qty) {
        price = +price4
      } else {
        price = +price5
      }
      setCustomizationPrice(price)
    }
  }
  const handleAddToCart = (e) => {
    e.preventDefault()

    if (cartItemsSwiftSwag === null || cartItemsSwiftSwag === swiftSwag) {
      setCartState((prev) => ({
        ...prev,
        quantity: quantity || state,
        image: imagesArray && imagesArray.length > 0 && imagesArray[0],
        heading: product?.product_title,
        pricePerUnit: totalPrice === Infinity ? 0 : totalPrice.toFixed(2),
        id: product.id,
        logoImg: uploadFirstLogo,
        colours: selectedColor,
        customizationId: customizationId ? customizationId : null,
        customization: choosenCustomization || Customization,
        totalPrice: quantity * +totalPrice,
        isSample: isSample,
        swiftSwag: swiftSwag,
        isSizesTotal: isSizesTotal,
        sizeQuantity: sizeQuantity,
        productCategory: product.product_catogries,
        user: userId,
      }))
      dispatch(
        setCartItems({
          quantity: quantity || state,
          image: imagesArray && imagesArray.length > 0 && imagesArray[0],
          heading: product?.product_title,
          pricePerUnit: totalPrice === Infinity ? 0 : totalPrice.toFixed(2),
          id: product.id,
          logoImg: uploadFirstLogo,
          colours: selectedColor,
          customization: choosenCustomization || Customization,
          customizationId: customizationId ? customizationId : null,
          totalPrice: quantity * totalPrice,
          isSample: isSample,
          swiftSwag: swiftSwag,
          isSizesTotal: isSizesTotal,
          sizeQuantity: sizeQuantity,
          productCategory: product.product_catogries,
          user: userId,
        })
      )

      {
        existedWishlistItem
          ? toast.success('Your cart is updated', {
            position: 'top-center',
            autoClose: 1500,
          })
          : toast.success('Added to cart successfully', {
            position: 'top-center',
            autoClose: 1500,
          })
      }
      localStorage.setItem('product_id', JSON.stringify(product?.id))
      window.scrollTo({
        top: '0',
        left: '0',
        behavior: 'smooth',
      })
    } else {
      toast.error(
        'You cannot add swift swag products with non swift swag products'
      )
    }
  }
  useEffect(() => {
    document.body.classList.add('single_product_page')
    setSwiftSwag(swiftSwagChecked)
  }, [])

  const updateImage = (item) => {
    setSingleImage(item)
  }
  useEffect(() => {
    if (imagesArray && imagesArray.length > 0) {
      setSingleImage(imagesArray[0])
    }
  }, [imagesArray])

  useEffect(() => {
    if (product) {
      setImagesArray(
        country === 'usa' ? product?.images_us : product?.images_ca
      )
      setSingleImage(
        country === 'usa'
          ? product?.images_us &&
          product?.images_us?.length > 0 &&
          product?.images_us[0]
          : product?.images_ca &&
          product?.images_ca?.length > 0 &&
          product?.images_ca[0]
      )
    }
  }, [product])
  useEffect(() => {
    if (product) {
      let empt = []

      dispatch(setDecorationItemObjSingleProductPage(supplierFees))

      supplierFees &&
        Object.entries(supplierFees).map(([key, value]) => empt.push(value))
      let ab = empt.flat(50)
      let nameOfDecorations = []
      for (let i = 0; i < ab.length; i++) {
        const element = ab[i]
        nameOfDecorations.push(element && element?.decoration_type)
      }
      setNameOfDecorations(nameOfDecorations)
      {
        !supplierFees && setNameOfDecorations()
      }
    }
  }, [product])

  let setDecorations = () => {
    if (decorations && Object.keys(decorations).length > 0) {
      let objj = {}
      Object.entries(decorations).map(([key, value]) => {
        objj[key] = value[0]
      })
      dispatch(setFinalDecorationKeyVal(objj))
    } else {
      dispatch(setFinalDecorationKeyVal({}))
    }
  }
  useEffect(() => {
    if (product) {
      setDecorations()
    }
  }, [product, country, decorations])
  useEffect(() => {
    let TotalPrice = customizationPrice + priceWithoutCustomizations
    setTotalPrice(TotalPrice)
  }, [customizationPrice, priceWithoutCustomizations, country])
  useEffect(() => {
    if (cartItems.length == 0) {
      setCartItemsSwiftSwag(null)
    } else if (cartItems.length > 0) {
      setCartItemsSwiftSwag(cartItems[0].swiftSwag)
    }
  }, [cartItems])
  let productAvailability =
    country === 'usa' ? product?.available_in_usa : product?.available_in_canada

  useEffect(() => {
    if (product?.colours && Object.keys(product?.colours).length > 0) {
      setSelectedColor(Object.keys(product?.colours)[0])
    }
  }, [product])

  if (loading) {
    return <Loaders />
  } else if (!loading && productAvailability === 0) {
    return <EmptyContainer data="ProductNotAvailable" />
  }

  const handleCatgeory = () => {
    dispatch(setCollectionForUrl(collectionForUrl))
    dispatch(setSubCollectionForUrl(''))
    router.push(`/category/${collectionForUrl}`)
  }

  return (
    <>
      {productAvailability === 1 && (
        <div className={Styles.detail_page_wrapper}>
          <div className={Styles.detail_page_container}>
            <div className={Styles.detail_page_left_top}>
              <div className={Styles.sticky_sec}>
                <div className={Styles.icon_wrapper}>
                  <div
                    className={Styles.border_svg}
                    style={{
                      backgroundColor: isInWishlist ? '#A2D061' : '',
                    }}
                  >
                    <MdOutlineFavoriteBorder
                      fontSize={25}
                      className={`${Styles.icon} ${isInWishlist ? Styles.favActive : ''
                        }`}
                      onClick={() => addToWishlist(product)}
                    />
                  </div>

                  <div className={Styles.border_svg}>
                    <CiShare2
                      fontSize={25}
                      // color="#D3D3D3"
                      className={Styles.icon}
                      onClick={() => setShareIcons(true)}
                    />
                  </div>
                </div>
                <div className={Styles.detail_page_image_content}>
                  <div className={Styles.product_big_image}>
                    {singleImage ? (
                      <Zoom>
                        <Image
                          src={singleImage}
                          width={400}
                          height={560}
                          style={{ mixBlendMode: 'color-burn' }}
                          alt={product?.product_title}
                          className={Styles.product_image}
                        />
                      </Zoom>
                    ) : (
                      <Image
                        src={images.No_product}
                        width={400}
                        height={560}
                        alt="No Product Image"
                        className={Styles.product_image}
                      />
                    )}
                  </div>
                </div>
                {imagesArray && imagesArray.length > 1 && (
                  <div className={Styles.margin_top}>
                    <Carousel
                      swipeable={false}
                      draggable={false}
                      showDots={true}
                      responsive={responsive}
                      ssr={false}
                      infinite={true}
                      // autoPlay={this.props.deviceType !== 'mobile' ? true : false}
                      // autoPlay
                      autoPlaySpeed={1000}
                      arrows={true}
                      keyBoardControl={true}
                      customTransition="all .5s"
                      transitionDuration={500}
                      containerClass="carousel-container"
                      removeArrowOnDeviceType={['tablet', 'mobile']}
                      // deviceType={this.props.deviceType}
                      dotListClass="custom-dot-list-style"
                      itemClass="carousel-item-padding-40-px"
                      slidesToSlide={2}
                      className={Styles.product_slider}
                    >
                      {imagesArray &&
                        imagesArray?.map((item, index) => (
                          <div
                            style={{
                              border:
                                singleImage === item ? '1px solid #a2d061' : '',
                            }}
                            className={Styles.add_color}
                          >
                            <Image
                              src={item}
                              width={100}
                              height={100}
                              alt={product?.product_title}
                              style={{
                                cursor: 'pointer',
                              }}
                              onClick={() => updateImage(item)}
                              className={Styles.product_images}
                            />
                          </div>
                        ))}
                    </Carousel>
                  </div>
                )}
              </div>
            </div>
            <div className={Styles.detail_page_right_section}>
              <div className={Styles.page_right_content}>
                <div className={Styles.certBy}>
                  {product?.certBy &&
                    JSON.parse(product?.certBy).map((data, index) => (
                      <>
                        <div className={Styles.tag} key={index}>
                          <p>{data}</p>
                        </div>
                      </>
                    ))}
                </div>

                <p className={Styles.breadcrumbs}>
                  <Link href="/" style={{ cursor: 'pointer' }}>
                    Home
                  </Link>{' '}
                  {collectionForUrl ? (
                    <span
                      onClick={handleCatgeory}
                      className={Styles.handle_category}
                    >
                      {'> '}
                      {collectionForUrl}
                    </span>
                  ) : (
                    ''
                  )}
                  {subCollectionForUrl ? (
                    <span className={Styles.handle_subcategory}>
                      {' > '} {subCollectionForUrl}
                    </span>
                  ) : (
                    ''
                  )}
                </p>
                <div className={Styles.title}>
                  <h1>{product?.product_title}</h1>
                </div>
                <div className={Styles.reviews}>
                  <h4>
                    {reviews && reviews?.data?.ratings?.total_reviews}{' '}
                    {reviews?.data?.ratings?.total_reviews < 2
                      ? 'Review'
                      : 'Reviews'}
                  </h4>
                  <span className={Styles.emoji_left_border}>
                    {product?.emoji_ratings &&
                      Object.entries(product?.emoji_ratings).map(
                        ([key, value]) => (
                          <>
                            <span>{value}</span>
                          </>
                        )
                      )}
                  </span>
                  <Image
                    src={images.Info_svg}
                    width={20}
                    height={20}
                    alt="info icon"
                    onClick={() => setOpenEmoji(true)}
                  />
                </div>
                <div className={Styles.text_content}>
                  {product?.product_description?.length < 200 ? (
                    <p>{product?.product_description}</p>
                  ) : (
                    <p>
                      {ReadMore
                        ? product?.product_description
                        : product?.product_description.slice(0, 200)}
                      <span
                        className={Styles.read_more}
                        onClick={() => setIsReadMore(!ReadMore)}
                        style={{ cursor: 'pointer' }}
                      >
                        {ReadMore ? 'Read Less' : '...Read More'}
                      </span>
                    </p>
                  )}
                </div>
                <div>
                  <div
                    className={Styles.input_checkbox}
                    style={{ overflow: 'auto' }}
                  >
                    <div className={Styles.centering}>
                      <label className={Styles.switch}>
                        <input
                          type="checkbox"
                          name="sample"
                          id="sample"
                          checked={isSample} //setSizeNotSure
                          onChange={() => setIsSample(!isSample)}
                        />
                        <span className={Styles.slider}></span>{' '}
                      </label>
                    </div>
                    <p> This is a sample</p>
                  </div>
                </div>
                {product?.colours ? (
                  <div className={Styles.select_color_section}>
                    <div className={Styles.common_header}>
                      <h6>Select Color</h6>
                      <Image
                        src={images.Info_svg}
                        width={18}
                        height={18}
                        alt="info_icon"
                        onClick={() => setOpenPopUp('color')}
                      />

                      {openPopUp === 'color' && (
                        <InfoToolTip
                          setCondtion={openPopUp}
                          setOpenPopUp={setOpenPopUp}
                          heading={'Color'}
                        />
                      )}
                    </div>
                    <div className={Styles.colors_container}>
                      {product?.colours &&
                        Object.entries(product?.colours).map(
                          ([color, imageUrl]) => (
                            <>
                              <Dot
                                color={color}
                                imageUrl={imageUrl}
                                setSelectedColor={setSelectedColor}
                                selectedColor={selectedColor}
                                fromSingleProduct
                              />
                            </>
                          )
                        )}
                    </div>
                  </div>
                ) : (
                  ''
                )}
                {product?.swift_tag == 1 && (
                  <div className={Styles.cart_left_swift}>
                    <div className={Styles.common_header}>
                      <h6>Swift Swag</h6>
                    </div>

                    <div className={Styles.cart_left_swift_content}>
                      <div className={Styles.custom_checkbox}>
                        <input
                          type="checkbox"
                          name="swift_swag"
                          id="swift_swag"
                          value={swiftSwag}
                          checked={swiftSwag}
                          onChange={() => setSwiftSwag(!swiftSwag)}
                        />
                        <label htmlFor="swift_swag">
                          Checking this box will override the date selected
                          above to within 10 business days if you have gone
                          through the Swift Swag process. Please note additional
                          charges will apply.
                        </label>
                      </div>
                    </div>
                  </div>
                )}
                {!isSample && Object.keys(finalDecorationKeyVal).length > 0 && (
                  <>
                    <div className={Styles.customization_text}>
                      <div className={Styles.common_header}>
                        <p className={Styles.Common_p_text}>
                          Select Customization
                        </p>
                        <Image
                          src={images.Info_svg}
                          width={18}
                          height={18}
                          alt="info_icon"
                          onClick={() => setOpenPopUp('customization')}
                        />

                        {openPopUp === 'customization' && (
                          <InfoToolTip
                            setCondtion={openPopUp}
                            setOpenPopUp={setOpenPopUp}
                            heading={'Customization'}
                          />
                        )}
                      </div>
                      <div className={Styles.buttons}>
                        {finalDecorationKeyVal &&
                          Object.keys(finalDecorationKeyVal).length > 0 &&
                          Object.entries(finalDecorationKeyVal).map(
                            ([key, val], index) =>
                              val !== undefined && (
                                <>
                                  {val?.decoration_type !==
                                    '"No Decoration"' && (
                                    <p
                                      className={`${Styles.btn} ${
                                        selectedCustomization === index
                                          ? Styles.active
                                          : ''
                                      }`}
                                      onClick={() =>
                                        selectCustomizations(index, key, val)
                                      }
                                    >
                                      {val?.decoration_type &&
                                        JSON.parse(val?.decoration_type)}
                                    </p>
                                  )}
                                </>
                              )
                          )}
                      </div>
                    </div>
                  </>
                )}
                {!isSample && (
                  <div className={Styles.para_text}>
                    <div className={Styles.common_header}>
                      <p className={Styles.font_weight}>
                        Upload Logo/ Artwork{' '}
                        <span className={Styles.fw400}>
                          (.ai, .svg, .jpg, .png .pdf or .eps vector format)
                        </span>
                      </p>
                      <Image
                        src={images.Info_svg}
                        width={18}
                        height={18}
                        alt="info_icon"
                        onClick={() => setOpenPopUp('Artwork')}
                      />
                      {openPopUp === 'Artwork' && (
                        <InfoToolTip
                          setCondtion={openPopUp}
                          setOpenPopUp={setOpenPopUp}
                          heading={'Upload logo'}
                        />
                      )}
                    </div>
                    <div className={Styles.upload_logo}>
                      {uploadFirstLogo ? (
                        <>
                          <div className={Styles.position_relative}>
                            <Image
                              src={
                                uploadResponse
                                  ? uploadResponse
                                  : URL.createObjectURL(uploadFirstLogo)
                              }
                              width={150}
                              height={150}
                            />

                            <RxCross2
                              onClick={
                                uploadResponse
                                  ? () => setUploadResponse('')
                                  : () => setUploadFirstLogo('')
                              }
                              className={Styles.cross_logo}
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div {...getRootProps()}>
                            <input {...getInputProps()} />

                            <label
                              htmlFor="file1"
                              className={Styles.uploaded_content}
                            >
                              {!isDragActive ? (
                                <>
                                  <span className={Styles.colorLight}>
                                    Drop your design here or browse
                                  </span>
                                </>
                              ) : (
                                <>
                                  <span className={Styles.colorLight}>
                                    Drop your design here or browse
                                  </span>
                                  <input
                                    type="file"
                                    name=""
                                    id="file1"
                                    accept=".svg,.jpg,.jpeg .eps, .cdr, .ai, .pdf, image/svg+xml, application/postscript, application/pdf,image/jpeg, image/png"
                                    onChange={uploadFirstFile}
                                  />
                                </>
                              )}
                            </label>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
                 <Image
                                  src={('https://ethical-images.s3.ca-central-1.amazonaws.com/' + filteredProducts[0]?.logoImg?.path)}
                                  width={49}
                                  height={66}
                                  alt="product_image"
                                />
                <div className={Styles.border_top}>
                  <div className={Styles.number_of_units}>
                    <div className={Styles.common_header}>
                      <p className={Styles.Common_p_text}>
                        Enter the number of units you need?
                      </p>
                      <Image
                        src={images.Info_svg}
                        width={18}
                        height={18}
                        alt="Info_svg"
                        onClick={() => setOpenPopUp('number_unit')}
                      />
                      {openPopUp === 'number_unit' && (
                        <InfoToolTip
                          setCondtion={openPopUp}
                          setOpenPopUp={setOpenPopUp}
                          heading={'Unit'}
                        />
                      )}
                    </div>
                  </div>
                  <div className={Styles.input_data_required}>
                    <input
                      type="number"
                      name="orderQuantity"
                      // value={filterData ? filterData : quantity}
                      // defaultValue={filterData  ? filterData : quantity}
                      value={(state ? state : quantity)}

                      onChange={handleQuantity}
                      onBlur={(e) => {
                        if (!quantity || !state) {
                          setErrorMessage('Please enter a quantity.');
                        }
                      }}
                    />
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    {isSample ? (
                      <span>(maximum 3 units allowed for sample)</span>
                    ) : (
                      <span>(minimum {+actualMinQty} units required)</span>
                    )}
                  </div>
                </div>
                <div className={Styles.select_size_quantity}>
                  {(product &&
                    JSON.parse(product.product_catogries)[0] !==
                    'rec69XOh569fKbqwT') ||
                    sizeNotSure ||
                    isSample ? (
                    ''
                  ) : (
                    <>
                      <div className={Styles.common_header}>
                        <p>Select sizes quantity</p>
                      </div>
                      <div className={Styles.inputs}>
                        {Object.keys(sizeQuantity).map((key) => (
                          <>
                            <div className={Styles.size_div}>
                              <label htmlFor="">{key}</label>
                              <input
                                placeholder={key}
                                type="number"
                                name={key}
                                value={sizeQuantity[key]}
                                onChange={(e) => handleQuantitySize(e, key)}
                                min="0"
                              />
                            </div>
                          </>
                        ))}
                      </div>
                    </>
                  )}
                  {isSample ||
                    (product &&
                      JSON.parse(product.product_catogries)[0] !==
                      'rec69XOh569fKbqwT') ? (
                    ''
                  ) : (
                    <div className={Styles.flex_row}>
                      <div className={Styles.centering}>
                        <label htmlFor="sizeCheckbox" className={Styles.switch}>
                          <input
                            type="checkbox"
                            id="sizeCheckbox"
                            checked={sizeNotSure} //setSizeNotSure
                            onChange={() => setSizeNotSure(!sizeNotSure)}
                          />
                          <span className={Styles.slider}></span>{' '}
                        </label>
                      </div>
                      <p> I don’t have sizes yet</p>
                    </div>
                  )}
                </div>
              </div>
              <div className={Styles.position_sticky}>
                <div className={Styles.sticky_bottom}>
                  <div className={Styles.business_box}>
                    <div className={Styles.standard_business_section}>
                      <div className={Styles.common_header}>
                        <p>Production time</p>
                        <Image
                          src={images.Info_svg}
                          width={18}
                          height={18}
                          alt="info_icon"
                          onClick={() => setOpenPopUp('production_time')}
                        />
                        {openPopUp === 'production_time' && (
                          <InfoToolTip
                            setCondtion={openPopUp}
                            setOpenPopUp={setOpenPopUp}
                            heading={'Production Time'}
                          />
                        )}
                      </div>
                      <p className={Styles.standart_icons}>
                        <strong>Standard</strong> - 15{' '}
                        <strong>Business days</strong>
                      </p>
                    </div>
                    <div className={Styles.price_section}>
                      {!isSample ? (
                        <p>{`Price ${totalPrice !== Infinity ? totalPrice.toFixed(2) : 0
                          }/unit`}</p>
                      ) : (
                        <p>{`Price ${col1Price ? col1Price : 0}/unit`}</p>
                      )}
                      <p>
                        total Price $
                        {isSample
                          ? (quantity * col1Price).toFixed(2)
                          : quantity
                            ? (quantity * totalPrice).toFixed(2)
                            : 0}
                      </p>
                    </div>
                  </div>
                  <div className={Styles.add_to_bulk_container}>
                    <button disabled={!quantity || !state} onClick={handleAddToCart}>
                      Add to bulk estimate
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {openEmoji && (
        <EmojiModal EmojiModal={EmojiModal} setOpenEmoji={setOpenEmoji} />
      )}
      {shareIcons && (
        <>
          <Share setShareIcons={setShareIcons} item={product} />
        </>
      )}
    </>
  )
}

export default Product
