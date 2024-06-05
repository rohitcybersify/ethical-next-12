import React, { useEffect, useState } from 'react'
import Styles from './ProductCompletion.module.css'
import { Country, State, City } from 'country-state-city'
import images from '../../constants/images'
import Image from 'next/image'
import useFetch from '../../lib/useFetch'
import { useSelector } from 'react-redux'
import { RxCross2 } from 'react-icons/rx'

const ProductCompletion = () => {
  const orderId = useSelector((state) => state.userOrder.orderId)
  const [selectedFile, setSelectedFile] = useState('')
  const [singleProductDetails, setSingleProductDetails] = useState([])
  const country = useSelector((state) => state.country.country)
  const [productDetails, setProductDetails] = useState([])
  const [sizeQuantity, setSizeQuantity] = useState({
    S: 0,
    M: 0,
    L: 0,
    XL: 0,
  })
  const [values, setValues] = useState({
    singleAddress: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    companyName: '',
    address: '',
    apartment: '',
    country: '',
    state: '',
    city: '',
    pin: '',
  })

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    companyName: '',
    address: '',
    country: '',
    state: '',
    city: '',
    pin: '',
  })

  const [otherInfo, setOtherInfo] = useState({})
  const [
    getLoadQuery,
    {
      response: getUserOrderData,
      loading: getUserLoading,
      error: getUserError,
    },
  ] = useFetch(`/user/orders/view/${orderId}`, {
    method: 'get',
  })

  const [singleProductApi, { response: singleProduct, loading, error }] =
    useFetch(
      `/products/${3547}?country=${country === 'canada' ? 'canada' : 'usa'}`,
      {
        method: 'get',
      }
    )

  useEffect(() => {
    getLoadQuery()
    singleProductApi()
  }, [])

  useEffect(() => {
    if (singleProduct) {
      setSingleProductDetails(singleProduct)
    } else if (error) {
      return
    }
  }, [])

  const uploadFirstFile = (event) => {
    setSelectedFile(event.target.files[0])
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    let errorMessage = ''
    switch (name) {
      case 'firstName':
        errorMessage = value.trim() === '' ? 'First name is required' : ''
        break
      case 'lastName':
        errorMessage = value.trim() === '' ? 'Last name is required' : ''
        break
      case 'phoneNumber':
        errorMessage =
          value.trim() === ''
            ? 'Phone number is required'
            : value.trim().length !== 10
            ? 'Invalid phone number'
            : ''
        break
      case 'email':
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        errorMessage =
          value.trim() === ''
            ? 'Email address is required'
            : !emailPattern.test(value.trim())
            ? 'Invalid email address'
            : ''
        break
      case 'companyName':
        errorMessage = value.trim() === '' ? 'Company name is required' : ''
        break
      case 'address':
        errorMessage = value.trim() === '' ? 'Address is required' : ''
        break
      case 'country':
        errorMessage = value === 'Select Country' ? 'Country is required' : ''
        break
      case 'state':
        errorMessage = value === 'Select State' ? 'State is required' : ''
        break
      case 'city':
        errorMessage = value === 'Select City' ? 'City is required' : ''
        break
      case 'pin':
        errorMessage = value.trim() === '' ? 'Postal code is required' : ''
        break
      default:
        break
    }

    setErrors({
      ...errors,
      [name]: errorMessage,
    })

    setValues({
      ...values,
      [name]: value,
    })
  }

  useEffect(() => {
    if (getUserOrderData) {
      setProductDetails(getUserOrderData?.data?.product_details)
      setOtherInfo(getUserOrderData?.data?.other_info)

      const addressData =
        getUserOrderData?.data?.product_details?.[0]?.addressData || {}
      setValues({
        ...values,
        firstName: addressData?.first_name || '',
        lastName: addressData?.last_name || '',
        phoneNumber: addressData?.phone_number || '',
        email: addressData?.email || '',
        companyName: addressData?.company_name || '',
        address: addressData?.address || '',
        apartment: addressData?.apartment || '',
        country: addressData?.country || '',
        state: addressData?.state || '',
        city: addressData?.city || '',
        pin: addressData?.postal_code || '',
      })
    } else if (getUserError) {
      return
    }
  }, [getUserOrderData, getUserError])

  const hasEmptyFields = Object.values(errors).some(
    (value) => value.trim() !== ''
  )

  return (
    <>
      {productDetails &&
        productDetails.map((item) => (
          <>
            <section className={Styles.Product_details}>
              <div className={Styles.Product_details_wrapper}>
                <h6>Product Details</h6>
                <div className={Styles.img_textheader}>
                  <Image src={images.shirt_small} width={80} height={80} />
                  <div>
                    <h2>Tentree® Men’s Kangaroo Organic Cotton Hoodie</h2>
                    <p>Black</p>
                  </div>
                </div>
              </div>
              <div className={Styles.Seclect_colorWrraper}>
                <div className={Styles.Seclectcommon_heading}>
                  <h6>Selected Color</h6>
                </div>

                {singleProductDetails &&
                  singleProductDetails?.colours?.map((item) => (
                    <>
                      {}
                      <div
                        className={`${Styles.colored_dot} ${Styles.tooltip}`}
                      >
                        <span className={Styles.tooltiptext}>
                          {item?.colours}
                        </span>
                      </div>
                    </>
                  ))}
              </div>

              <div className={Styles.Seclect_Customization}>
                <div className={Styles.Seclectcommon_heading}>
                  <h6>Selected Customization</h6>
                  <Image
                    src={images.Info_Icon}
                    alt="Info_Icon"
                    width={20}
                    height={20}
                  />
                </div>

                <div className={Styles.Seclect_customize}>
                  <ul>
                    <li>
                      {item?.customization &&
                        JSON.parse(item?.customization?.key?.decoration_type)}
                    </li>
                  </ul>
                </div>
              </div>

              <div className={Styles.Upload_logoOption}>
                <div className={Styles.Seclectcommon_heading}>
                  <h6>
                    Uploaded Logo/ Artwork{' '}
                    <span>(.AI or .EPS - Vector format only)</span>
                  </h6>
                  <Image
                    src={images.Info_Icon}
                    alt="Info_Icon"
                    width={20}
                    height={20}
                  />
                </div>

                <div className={Styles.Upload_logoOptionDiv}>
                  <p>
                    <Image
                      src={item?.productimage}
                      width={200}
                      height={200}
                      alt="logo"
                    />
                  </p>
                </div>
              </div>

              {/* Edit Product */}
              <div className={Styles.edit_product_container}>
                <p>Edit your product</p>
                <div className={Styles.file_container}>
                  <p>Change logo</p>
                  <label htmlFor="edit_file">
                    <input
                      type="file"
                      name="edit_file"
                      id="edit_file"
                      accept=".svg,.jpg,.jpeg .eps, .cdr, .ai, .pdf, image/svg+xml, application/postscript, application/pdf,image/jpeg, image/png"
                      onChange={uploadFirstFile}
                    />
                  </label>

                  {selectedFile && (
                    <>
                      <div>
                        <Image
                          src={URL.createObjectURL(selectedFile)}
                          width={150}
                          height={150}
                        />
                        <RxCross2
                          className={Styles.cross_logo}
                          onClick={() => setSelectedFile('')}
                        />
                      </div>
                    </>
                  )}
                  <input type="checkbox" name="" id="" />
                  <span>I don't have a vector file</span>
                </div>
                <div className={Styles.add_more_section}>
                  <p>Add more about your changes</p>
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="6"
                    placeholder="Lorem ipsum dolor sit amet"
                  ></textarea>
                </div>
              </div>

              <div className={Styles.Number_unitWrapper}>
                <div className={Styles.Seclectcommon_heading}>
                  <h6>Entered the number of units you need?</h6>
                  <Image
                    src={images.Info_Icon}
                    alt="Info_Icon"
                    width={20}
                    height={20}
                  />
                </div>

                <div className={Styles.Seclect_customize}>
                  <input
                    type="number"
                    name="orderQuantity"
                    value={item?.quantity}
                  />
                  <span>(minimum 50 units required)</span>
                </div>
              </div>

              <div className={Styles.QuantityWrapper}>
                <div className={Styles.Seclectcommon_heading}>
                  <h6>Selected sizes quantity</h6>
                  <Image
                    src={images.Info_Icon}
                    alt="Info_Icon"
                    width={20}
                    height={20}
                  />
                </div>

                <div className={Styles.QuantityWrapper_customize}>
                  {Object.keys(sizeQuantity).map((item) => (
                    <>
                      <div className={Styles.Quantitynumber_Div}>
                        <label>{item}</label>
                        <input
                          placeholder={item}
                          type="number"
                          name="orderQuantity"
                          value={sizeQuantity[item]}
                        />
                      </div>
                    </>
                  ))}
                </div>
              </div>

              {/* <div className={Styles.Buygive_Div}>
                <div className={Styles.Seclectcommon_heading}>
                  <h6>Buy 1 Give 1</h6>
                  <Image
                    src={images.Info_Icon}
                    alt="Info_Icon"
                    width={20}
                    height={20}
                  />
                </div>
                <span className={Styles.organization_text}>
                  {' '}
                  (select which organization should receive the products if
                  purchasing a product where the supplier donates a unit for
                  every unit sold)
                </span>

                <div className={Styles.Seclect_customize}>
                  <ul>
                    <li>Organization 1</li>
                    <li>Organization 2</li>
                    <li>Organization 3</li>
                    <li>Organization 4</li>
                  </ul>
                </div>
              </div> */}

              {/* <div className={Styles.fragrance_flavour}>
                <div className={Styles.Seclectcommon_heading}>
                  <h6>Flavour or fragrance</h6>
                  <Image
                    src={images.Info_Icon}
                    alt="Info_Icon"
                    width={20}
                    height={20}
                  />
                </div>

                <div className={Styles.Seclect_customize}>
                  <ul>
                    <li>Flavour 1</li>
                    <li>Flavour 2</li>
                    <li>Flavour 3</li>
                    <li>Flavour 4</li>
                  </ul>
                </div>
              </div> */}

              {/* <div className={Styles.fragrance_flavour}>
                <div className={Styles.Seclectcommon_heading}>
                  <h6>Planting Instructions on Seed Product</h6>
                </div>

                <div className={Styles.Seclect_customize}>
                  <textarea type="text" />
                </div>
              </div> */}

              <div className={Styles.fragrance_flavour}>
                <div className={Styles.Seclectcommon_heading}>
                  <h6>Other Info</h6>
                </div>

                <div className={Styles.Seclect_customize}>
                  <div>
                    <p>
                      Selected Date:
                      {otherInfo?.selectedDate &&
                        new Date(otherInfo?.selectedDate).toLocaleDateString()}
                    </p>
                    <p>Notes about your order: {otherInfo?.textarea}</p>
                  </div>
                </div>

                <div className={Styles.Intersted}>
                  <div className={Styles.custom_checkbox}>
                    <input
                      type="checkbox"
                      id="swag"
                      checked={otherInfo?.swagPack}
                    />
                    <label htmlFor="swag">Swag Pack Kitting</label>
                  </div>

                  <div className={Styles.custom_checkbox}>
                    <input
                      type="checkbox"
                      id="Warehousing"
                      checked={otherInfo?.Warehousing}
                    />
                    <label htmlFor="Warehousing">Warehousing</label>
                  </div>

                  <div className={Styles.custom_checkbox}>
                    <input
                      type="checkbox"
                      id="Graphic"
                      checked={otherInfo?.graphicDesign}
                    />
                    <label htmlFor="Graphic">Graphic Design</label>
                  </div>

                  <div className={Styles.custom_checkbox}>
                    <input
                      type="checkbox"
                      id="Pick"
                      checked={otherInfo?.pickAndPack}
                    />
                    <label htmlFor="Pick">Pick and Pack</label>
                  </div>

                  <div className={Styles.custom_checkbox}>
                    <input
                      type="checkbox"
                      id="Sure"
                      checked={otherInfo?.notSure}
                    />
                    <label htmlFor="Sure">Not Sure</label>
                  </div>
                </div>
              </div>

              <div className={Styles.Product_selectForm}>
                <div className={Styles.Seclectcommon_heading}>
                  <h6>Product Shipping Details</h6>
                </div>
                <div>
                  <select
                    name="singleAddress"
                    id="singleAddress"
                    placeholder="Single addresses"
                    value={values.singleAddress}
                    onChange={handleChange}
                  >
                    <option value="single">Single</option>
                    <option value="multiple">Multiple</option>
                  </select>
                  <div className={Styles.error_text}></div>
                </div>

                <div>
                  <select
                    name="country"
                    value={values.country}
                    onChange={handleChange}
                  >
                    <option value="Select Country">Select Country...</option>
                    <option value="US">USA</option>
                    <option value="CA">Canada</option>
                  </select>
                  <div className={Styles.error_text}>{errors.country}</div>
                </div>

                <div className={Styles.InputWrap_Div}>
                  <div className={Styles.width_full}>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First name"
                      value={values.firstName}
                      onChange={handleChange}
                    />
                    <div className={Styles.error_text}>{errors.firstName}</div>
                  </div>
                  <div className={Styles.width_full}>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last name"
                      value={values.lastName}
                      onChange={handleChange}
                    />
                    <div className={Styles.error_text}>{errors.lastName}</div>
                  </div>
                </div>

                <div>
                  <input
                    type="number"
                    name="phoneNumber"
                    placeholder="Phone number"
                    value={values.phoneNumber}
                    onChange={handleChange}
                  />
                  <div className={Styles.error_text}>{errors.phoneNumber}</div>
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={values.email}
                    onChange={handleChange}
                  />
                  <div className={Styles.error_text}>{errors.email}</div>
                </div>

                <div>
                  <input
                    type="text"
                    name="companyName"
                    placeholder="Company name"
                    value={values.companyName}
                    onChange={handleChange}
                  />
                  <div className={Styles.error_text}>{errors.companyName}</div>
                </div>

                <div>
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={values.address}
                    onChange={handleChange}
                  />
                  <div className={Styles.error_text}>{errors.address}</div>
                </div>

                <div>
                  <input
                    type="text"
                    name="apartment"
                    placeholder="Appartment, suite, etc. (optional)"
                    value={values.apartment}
                    onChange={handleChange}
                  />
                  <div className={Styles.error_text}></div>
                </div>

                <div className={Styles.InputWraper}>
                  <div className={Styles.width_full}>
                    <select
                      name="state"
                      value={values.state}
                      onChange={handleChange}
                    >
                      <option value="Select State">Select State...</option>
                      {State?.getStatesOfCountry(values.country)?.map(
                        (option) => (
                          <>
                            <option value={option.isoCode}>
                              {option.name}
                            </option>
                          </>
                        )
                      )}
                    </select>
                    <div className={Styles.error_text}>{errors.state}</div>
                  </div>
                  <div className={Styles.width_full}>
                    <select
                      name="city"
                      value={values.city}
                      onChange={handleChange}
                    >
                      <option value="Select City">Select City...</option>
                      {values.state &&
                        City?.getCitiesOfState(
                          values.country,
                          values.state
                        )?.map((option) => (
                          <>
                            <option value={option.name}>{option.name}</option>
                          </>
                        ))}
                    </select>
                    <div className={Styles.error_text}>{errors.city}</div>
                  </div>
                  <div className={Styles.width_full}>
                    <input
                      type="text"
                      placeholder={
                        values.country === 'US' ? 'Zip Code' : 'Postal Code'
                      }
                      name="pin"
                      id="pin"
                      autoComplete="off"
                      value={values.pin}
                      onChange={handleChange}
                    />
                    <div className={Styles.error_text}>{errors.pin}</div>
                  </div>
                </div>
              </div>

              <div className={Styles.submite_btn}>
                <button>Cancel</button>
                <button disabled={hasEmptyFields} className={Styles.btn_style}>
                  Save Changes
                </button>
              </div>
            </section>
          </>
        ))}
    </>
  )
}

export default ProductCompletion
