'use client'
import React, { useState, useEffect } from 'react'
import cartImg from '../../assets/headerPics/cart.svg'
import searchImg from '../../assets/headerPics/Search-black.svg'
import heartImg from '../../assets/headerPics/Heart.svg'
import downIcon from '../../assets/headerPics/down-black.svg'
import EthicalLogo from '../../components/EthicalLogo/EthicalLogo'
import Usa from '../../assets/headerPics/use_flag.svg'
import Canada from '../../assets/headerPics/canada-flag.svg'
import { FaChevronDown } from 'react-icons/fa'
import CrossIcon from '../../assets/headerPics/corss.svg'
import Humburg from '../../assets/headerPics/menu-bar.png'
import { RxCross2 } from 'react-icons/rx'
import styles from './secondaryHeader.module.css'
import { Button } from '@/components/ui/button'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Image from 'next/image'
import { useRouter } from 'next/router'
import useFetch from '@lib/useFetch'
import { countries } from 'constants/data'
import { useDispatch, useSelector } from 'react-redux'
import { setAllFilters } from 'redux-setup/FiltersSlice'
import {
  setIsCategoryPage,
  setIsSingleProductPage,
} from 'redux-setup/randomSlice'
import { selectCountry } from 'redux-setup/countrySlice'
import {
  getAllCategories,
  setSubCategoryOnTop,
  setCollectionForUrl,
  setSubCollectionForUrl,
  setProductsRes,
  setProductsLoading,
  setProductsError,
  setProductID,
} from 'redux-setup/categorySlice'

import Loaders from '@components/loaders/Loaders'
import Location from '../location/Location'
import { clearEmptyCart, deleteAllCartItems } from 'redux-setup/cartSlice'
const SecondaryHeader = () => {
  const dispatch = useDispatch()

  const router = useRouter()
  const [showResults, setShowResults] = useState(false)
  const [searchItems, setSearchItems] = useState([])
  const [showSearchInput, setShowSearchInput] = useState(false)
  const [openLinks, setOpenLinks] = useState(false)
  const [searchProduct, setSearchProduct] = useState('')
  const [inputbtn, setInputBtn] = useState(false)
  const [country, setCountry] = useState()
  const [countryTosend, setCountryToSend] = useState()
  const [screenSize, setScreenSize] = useState(992)
  const [showOnMobile, setShowOnMobile] = useState(false)
  const countryFromRedux = useSelector((state) => state.country.country)
  const cartStates = useSelector((state) => state.cart.cartStates)

  const [url, setUrl] = useState('')

  const [loadQuery, { response, loading, error }] = useFetch(
    `/serach?query=${searchProduct}&${
      countryFromRedux === 'usa'
        ? 'available_in_usa=1'
        : 'available_in_canada=1'
    }`,
    {
      method: 'get',
    },
    'formdata'
  )

  const wishlistItems = useSelector((state) => state.wishlist.items)

  const cartItems = useSelector((state) => state.cart.cartItems.length)
  const allCategories = useSelector((state) => state.category.allCategories)
  const selectedNameDateFilterValue = useSelector(
    (state) => state.cart.selectedNameDateFilterValue
  )

  let route = router.asPath.split('/').filter((item) => item !== '')
  const routeArray = route.map((item) => decodeURIComponent(item))
  const urlCategory = routeArray[1]
  let urlCategoryIdd = allCategories[urlCategory]?.airtabelId

  const getSingleProductPageRoute =
    router.asPath.includes('/cart') ||
    router.asPath.includes('/shipping') ||
    router.asPath.includes('/billing-address') ||
    router.asPath.includes('/category') ||
    router.asPath.includes('/products') ||
    router.asPath.includes('/contact') ||
    router.asPath.includes('/wishlist')

  const handleSetSubCategory = (item) => {
    dispatch(setSubCategoryOnTop(allCategories[item]?.matchingValues))
    dispatch(setCollectionForUrl(item))
    dispatch(setSubCollectionForUrl(null))
    router.push(`/category/${item}`)
  }

  const [
    getProducts,
    { response: productsRes, loading: productsLoading, error: productsError },
  ] = useFetch(url, {
    method: 'get',
  })
  const [
    getSideFilters,
    { response: filtersRes, loading: filtersLoading, error: filtersError },
  ] = useFetch(`sidebarfilter?category=${urlCategoryIdd}`, {
    method: 'get',
  })
  const [
    getCategories,
    {
      response: categoriesRes,
      loading: categoriesLoading,
      error: categoriesError,
    },
  ] = useFetch(`/category`, {
    method: 'get',
  })

  const handleResize = () => {
    setScreenSize(window.innerWidth)
  }

  const sendToProduct = (item) => {
    dispatch(setProductID(item?.id))
    const formattedSlug = item?.product_title
      ? encodeURIComponent(
          item.product_title.toLowerCase().replace(/[ %]/g, '-')
        )
      : ''
    setShowResults(false)
    dispatch(setCollectionForUrl(''))
    dispatch(setSubCollectionForUrl(''))
    setInputBtn(false)
    setShowSearchInput(false)
    setSearchProduct('')
    router.push(`/products/${formattedSlug}`)
  }

  const handleMobileLinks = (e, key, type) => {
    e.preventDefault()

    if (type === 'link') {
      router.push(`/category/${key}`)
    } else if (type === 'about') {
      router.push('/about-us')
    } else if (type === 'contact') {
      router.push('/contact')
    }
    setOpenLinks(false)
    setInputBtn(false)
  }

  const handleInput = (boolean) => {
    if (boolean === true) {
      setShowSearchInput(true)
      setInputBtn(true)
    } else if (boolean === false) {
      setShowSearchInput(false)
      setInputBtn(false)
      setShowResults(false)
      setSearchProduct('')
    }
  }

  const handleChange = (e) => {
    const text = e.target.value
    if (text.trim().length > 0) {
      setSearchProduct(text)
      setShowResults(true)
    } else {
      setSearchProduct('')
      setShowResults(false)
    }
  }

  useEffect(() => {
    let timer
    timer = setTimeout(() => {
      if (searchProduct.length > 0) {
        loadQuery()
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [searchProduct])

  useEffect(() => {
    if (response) {
      setSearchItems(response?.data?.data)
    } else if (error) {
      return
    }
  }, [response, error])

  const handleCart = () => {
    router.push('/cart')
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    dispatch(setIsSingleProductPage(router.asPath.includes('/products')))
  }, [router.asPath])

  useEffect(() => {
    if (inputbtn) {
      document.documentElement.classList.add('inputAdded')
    } else {
      document.documentElement.classList.remove('inputAdded')
    }
    return () => {
      document.documentElement.classList.remove('inputAdded')
    }
  }, [inputbtn])

  useEffect(() => {
    let r = router.asPath.split('/').filter((item) => item !== '')
    const newArray = r.map((item) => decodeURIComponent(item))

    if (newArray[0] === 'category') {
      dispatch(setIsCategoryPage(true))
    } else {
      dispatch(setIsCategoryPage(false))
    }
  }, [router.asPath])

  useEffect(() => {
    setCountryToSend(
      countryFromRedux === 'usa' ? 'available_in_usa' : 'available_in_canada'
    )
  }, [countryFromRedux])

  useEffect(() => {
    let r = router.asPath.split('/').filter((item) => item !== '')
    const newArray = r.map((item) => decodeURIComponent(item))
    let category0 = newArray[1]

    if (
      allCategories &&
      countryTosend &&
      router.query.category &&
      router.query.category.length > 0
    ) {
      let r = router.asPath.split('/').filter((item) => item !== '')
      const newArray = r.map((item) => decodeURIComponent(item))

      let category0 = newArray[1]

      let urlCategoryId = allCategories[category0]?.airtabelId
      let getColllectionIdd = decodeURIComponent(JSON.stringify(r[2]))

      let searchFromMain = allCategories[category0]?.matchingValues
      let collectionIdToUse =
        searchFromMain &&
        Object.keys(searchFromMain).find(
          (key) => searchFromMain[key] === getColllectionIdd
        )
      if (category0) {
        const route = `/products?product_catogries=${urlCategoryId}${
          collectionIdToUse ? `&collection_ids=${collectionIdToUse}` : ''
        }${
          selectedNameDateFilterValue ? `&${selectedNameDateFilterValue}=1` : ''
        }&${countryTosend}=1`
        setUrl(route)
        getSideFilters()
      }
    }
  }, [router.asPath, countryTosend, selectedNameDateFilterValue])

  useEffect(() => {
    if (url) {
      getProducts()
    }
  }, [url])

  useEffect(() => {
    if (filtersRes) {
      dispatch(setAllFilters(filtersRes.data))
    }
  }, [filtersRes])

  useEffect(() => {
    dispatch(setProductsRes(productsRes))
    dispatch(setProductsLoading(productsLoading))
    dispatch(setProductsError(productsError))
  }, [productsRes, productsLoading, productsError])

  useEffect(() => {
    getCategories()
  }, [])

  useEffect(() => {
    if (categoriesRes?.data) {
      dispatch(getAllCategories(categoriesRes?.data))
    }
  }, [categoriesRes])

  return (
    <>
      <Location />
      <div
        className={`${styles.header} ${openLinks ? styles.open_Sidebar : ''}`}
      >
        <div className={styles.primary_header_container}>
          <span className={styles.humburg_menu}>
            <Image
              src={Humburg}
              width={34}
              height={34}
              alt="downIcon"
              onClick={() => setOpenLinks(true)}
            />
          </span>
          <div className={styles.container_1}>
            <div className={styles.header_logo}>
              <EthicalLogo />
            </div>
          </div>
          <>
            <div className={styles.container_2}>
              <div className={styles.menu_center}>
                <span className={styles.menu_cross}>
                  <Image
                    src={CrossIcon}
                    width={20}
                    height={20}
                    alt="Cross_Icon"
                    onClick={() => setOpenLinks(false)}
                  />
                </span>
                <div
                  variant="ghost"
                  className={styles.shop_menu}
                  style={{ cursor: 'pointer' }}
                  onClick={() => router.push('/')}
                >
                  Home
                </div>

                <div className={styles.text_with_down_icon}>
                  <>
                    <div className="text_with_down_icon"></div>
                    <div
                      id="shop"
                      className={`${openLinks ? styles.mega_menu_open : ''} ${
                        styles.shop_menu
                      }`}
                      style={{ cursor: 'pointer' }}
                      onMouseEnter={() => setOpenLinks(true)}
                      onMouseLeave={() => setOpenLinks(false)}
                    >
                      Shop
                      {allCategories && (
                        <div
                          className={styles.header_menu_wrapper}
                          style={{
                            top: getSingleProductPageRoute ? '111px' : '60px',
                          }}
                        >
                          <div className={styles.header_menu}>
                            {Object.keys(allCategories).map((item, i) => (
                              <div className={styles.mega_menu} key={i}>
                                <span
                                  className={`${styles.shop_menu} ${styles.shop_menuWrap}`}
                                  onClick={() => handleSetSubCategory(item)}
                                >
                                  {item.replace(/-/g, ' ')}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                </div>
                <div className="text_with_down_icon">
                  <div
                    variant="ghost"
                    className={styles.shop_menu}
                    style={{ cursor: 'pointer' }}
                    onClick={() => router.push('/about-us')}
                  >
                    About
                  </div>
                </div>
                <div
                  variant="ghost"
                  className={styles.shop_menu}
                  style={{ cursor: 'pointer' }}
                  onClick={() => router.push('/contact')}
                >
                  Contact
                </div>
              </div>
            </div>
          </>

          <div
            className={`${styles.mobile_menu} ${
              openLinks ? styles.open_Sidebar : ''
            }`}
          >
            <div className={styles.mobile_menuwrap}>
              <ul>
                <span className={styles.menu_cross}>
                  <Image
                    src={CrossIcon}
                    width={20}
                    height={20}
                    alt="Cross_Icon"
                    onClick={() => setOpenLinks(false)}
                  />
                </span>
                <li onClick={(e) => handleMobileLinks(e, '/', 'about')}>
                  Home
                </li>
                <li onClick={() => setShowOnMobile(!showOnMobile)}>
                  shop{' '}
                  <span>
                    <FaChevronDown fontSize={12} />
                  </span>
                  <div className={styles.mobi_submenu}>
                    {showOnMobile && (
                      <ul>
                        {Object.keys(allCategories).map((key) => (
                          <>
                            <li
                              onClick={(e) => handleMobileLinks(e, key, 'link')}
                            >
                              {key}
                            </li>
                          </>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
                <li onClick={(e) => handleMobileLinks(e, '/about-us', 'about')}>
                  About
                </li>
                <li
                  onClick={(e) => handleMobileLinks(e, '/contact', 'contact')}
                >
                  Contact
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.container_3}>
            <div className="">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className={`${styles.language_dropdown} ${styles.desktop_menu}`}
                  >
                    <span className="flag-img">
                      {countryFromRedux ? (
                        <Image
                          src={
                            countryFromRedux === 'canada'
                              ? Canada
                              : countryFromRedux === 'usa'
                              ? Usa
                              : null
                          }
                          width={28}
                          height={20}
                          alt="like"
                        />
                      ) : (
                        'choose'
                      )}
                    </span>
                    <span className={styles.dropdown_icon}>
                      <Image
                        src={downIcon}
                        width={14}
                        height={14}
                        alt="search"
                      />
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className={styles.language_wrapdropdown}>
                  <DropdownMenuRadioGroup
                    value={country}
                    onValueChange={(newValue) => {
                      setCountry(newValue)
                      router.push(router.asPath, undefined, {
                        locale: newValue === 'canada' ? 'en-ca' : 'en-us',
                      })
                      dispatch(clearEmptyCart('Cart'))
                      dispatch(selectCountry(newValue))
                      dispatch(deleteAllCartItems())
                    }}
                  >
                    <div className={styles.countries_dropdown_container}>
                      {countries.map((c, i) => {
                        return (
                          <DropdownMenuRadioItem value={c.country} key={i}>
                            <Image
                              src={c.imageSrc}
                              width={30}
                              height={22}
                              alt="like"
                            />
                          </DropdownMenuRadioItem>
                        )
                      })}
                    </div>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className={styles.header_searchicon}>
              <span>
                <Image
                  src={searchImg}
                  width={24}
                  height={24}
                  alt="search"
                  onClick={() => handleInput(true)}
                />

                <div
                  className={`${styles.searchInput} ${
                    showSearchInput ? styles.show_input : ''
                  }`}
                >
                  <div className={styles.centerField}>
                    <input
                      type="text"
                      placeholder="Search"
                      value={searchProduct}
                      onChange={handleChange}
                    />

                    <span>
                      <RxCross2
                        color="black"
                        fontSize={28}
                        className={styles.cross_search}
                        onClick={() => handleInput(false)}
                      />
                    </span>

                    {showResults && (
                      <>
                        <div className={styles.search_results}>
                          {loading && (
                            <li>
                              <Loaders />
                            </li>
                          )}
                          <ul>
                            {searchItems &&
                              searchItems.map((item, i) => (
                                <>
                                  {item?.image && !error && (
                                    <li
                                      className={styles.search_productlist}
                                      onClick={() => sendToProduct(item)}
                                      key={i}
                                    >
                                      <Image
                                        src={item?.image}
                                        width={80}
                                        height={80}
                                        alt={item?.product_description}
                                      />
                                      <div
                                        className={styles.search_productcontent}
                                      >
                                        <h4>{item?.product_title}</h4>
                                      </div>
                                    </li>
                                  )}
                                </>
                              ))}
                          </ul>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </span>
            </div>
            {screenSize > 767 && (
              <button
                className=""
                onClick={() => router.push('/wishlist')}
                style={{ cursor: 'pointer', position: 'relative' }}
              >
                <Image
                  src={heartImg}
                  width={29}
                  height={29}
                  alt=""
                  className={styles.cursor_pointer}
                />
                <span
                  style={{
                    color: '#fff',
                    position: 'absolute',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '20px',
                    height: '20px',
                    top: '-3px',
                    right: '-8px',
                    borderRadius: '50%',
                    background: '#a2d061',
                    padding: '5px',
                  }}
                >
                  {wishlistItems.length}
                </span>
              </button>
            )}

            <button
              className=""
              onClick={handleCart}
              style={{ cursor: 'pointer', position: 'relative' }}
            >
              <Image
                src={cartImg}
                width={27}
                height={27}
                alt="cart icon"
                className={styles.cursor_pointer}
              />

              <span
                style={{
                  color: '#fff',
                  position: 'absolute',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '20px',
                  height: '20px',
                  top: '-3px',
                  right: '-8px',
                  borderRadius: '50%',
                  background: '#a2d061',
                  padding: '5px',
                }}
              >
                {cartItems}
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
export default SecondaryHeader
