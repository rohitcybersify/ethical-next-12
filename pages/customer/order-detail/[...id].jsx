import React, { useEffect, useState } from 'react'
import Layout from '../../../components/super-adminLayout/Layout'
import Image from 'next/image'
import { Country, State, City } from 'country-state-city'
import Styles from './orderDetail.module.css'
import StepForm from '../../../components/admin/step-form/StepForm'
import CrossIcon from '../../../assets/headerPics/corss.svg'
import images from '../../../constants/images'
import { GrEdit } from 'react-icons/gr'
import { useRouter } from 'next/router'
import useFetch from '../../../lib/useFetch'
import Loaders from '../../../components/loaders/Loaders'
import { useSelector } from 'react-redux'
import Approval from '../../../components/approval/Approval'
import ProductCompletion from '../../../components/ProductCompletion/ProductCompletion'

const orderDetail = () => {
  const [orderDetail, setOrderDetail] = useState([])
  const [showDetails, setShowDetails] = useState(false)
  const [selectedFile, setSelectedFile] = useState('')
  const [data, setData] = useState([])
  const socket = useSelector((state) => state.socket.socket)
  const notifications = useSelector((state) => state.random.notifications)
  const viewItem = useSelector((state) => state.admin.viewItem)

  const orderStatus = useSelector((state) => state.userOrder.productStatus)

  const router = useRouter()
  const [openModal, setOpenModal] = useState(false)
  const [values, setValues] = useState({
    singleAddress: '',
    address: '',
    country: '',
    phone_number: '',
    city: '',
    state: '',
    postal_code: '',
    zip_code: '',
    first_name: '',
    last_name: '',
    email: '',
    companyName: '',
    appartment: '',
    street: '',
  })

  const [errors, setErrors] = useState({
    singleAddress: '',
    address: '',
    country: '',
    phone_number: '',
    city: '',
    state: '',
    postal_code: '',
    zip_code: '',
    first_name: '',
    last_name: '',
    email: '',
    companyName: '',
    appartment: '',
    street: '',
  })

  const { id } = router.query

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    setSelectedFile(file)
  }

  const [
    getLoadQuery,
    {
      response: getUserOrderData,
      loading: getUserLoading,
      error: getUserError,
    },
  ] = useFetch(`/user/orders/view/${id}`, {
    method: 'get',
  })

  const [
    EditLoadQuery,
    {
      response: UpdatedUserOrderData,
      loading: updatedUserLoading,
      error: updatedUserError,
    },
  ] = useFetch(`/user/edit/address/${id}`, {
    method: 'post',
  })

  useEffect(() => {
    getLoadQuery()
  }, [id])

  useEffect(() => {
    if (getUserOrderData) {
      setOrderDetail(getUserOrderData?.data)
    } else if (getUserError) {
      return
    }
  }, [getUserOrderData])

  const timestamp = orderDetail?.created_at

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const date = new Date(timestamp ? timestamp : null)

  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  const monthName = monthNames[month]

  const handleDetails = (detail, index) => {
    setShowDetails(true)

    setData(orderDetail?.product_details[index])
  }

  const handleUpdateAddress = (e) => {
    e.preventDefault()
    try {
      let formData = new FormData()
      formData.append('address', values.address)
      formData.append('country', values.country)
      formData.append('number', values.phone_number)
      formData.append('city', values.city)
      formData.append('state', values.state)
      formData.append(
        'postal_code',
        values.country === 'CA' ? values.postal_code : values.zip_code
      )

      EditLoadQuery(formData)
    } catch (error) {
      return
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value,
    })

    switch (name) {
      case 'address':
        setErrors({
          ...errors,
          address: value.trim() ? '' : 'Address is required',
        })
        break
      case 'country':
        setErrors({
          ...errors,
          country: value.trim() ? '' : 'Country is required',
        })
        break
      case 'phone_number':
        setErrors({
          ...errors,
          phone_number:
            value.trim().length === 10 && /^\d+$/.test(value.trim())
              ? ''
              : 'Number should be exactly 10 digits',
        })
        break
      case 'city':
        setErrors({
          ...errors,
          city: value.trim() ? '' : 'City is required',
        })
        break
      case 'state':
        setErrors({
          ...errors,
          state: value.trim() ? '' : 'State is required',
        })
        break
      case 'postal_code':
        setErrors({
          ...errors,
          postal_code: value.trim() ? '' : 'Postal Code is required',
        })
        break
      case 'zip_code':
        setErrors({
          ...errors,
          zip_code: value.trim() ? '' : 'Zip Code is required',
        })
        break
      default:
        break
    }
  }

  const handleEdit = (index) => {
    setOpenModal(true)
    setValues(orderDetail?.Addresses[index])
  }

  const handleDownloadLogo = (logoUrl) => {
    const xhr = new XMLHttpRequest()
    xhr.responseType = 'blob'

    xhr.onload = function () {
      const anchor = document.createElement('a')
      const blob = new Blob([xhr.response], {
        type: 'application/octet-stream',
      })
      const url = window.URL.createObjectURL(blob)
      anchor.href = url
      anchor.download = 'logo.jpg'
      document.body.appendChild(anchor)
      anchor.click()
      document.body.removeChild(anchor)
      window.URL.revokeObjectURL(url)
    }
    xhr.open('GET', logoUrl)
    xhr.send()
  }

  return (
    <>
      <Layout>
        {getUserLoading ? (
          <Loaders />
        ) : (
          <div className={Styles.middle_section}>
            <div className={Styles.order_completion}>
              <p>Order 1</p>
              <p>Expected Completion</p>
            </div>
            <div className={Styles.order_detail_content}>
              <span>order id - {orderDetail?.order_number}</span>

              <span>
                {getUserOrderData ? `${monthName} ${day}, ${year}` : ''}
              </span>
            </div>
            <div className={Styles.step_form_container}>
              <StepForm />
            </div>

            {orderStatus === 'view mockup' && (
              <div className={Styles.ordered_products}>
                <p>Ordered Products</p>
                {orderDetail &&
                  orderDetail?.product_details?.map((detail, index) => (
                    <>
                      <div className={Styles.content} key={index}>
                        <div className={Styles.imgContent}>
                          {detail?.productimage ? (
                            <Image
                              src={detail?.productimage}
                              width={100}
                              height={100}
                            />
                          ) : (
                            'No Image'
                          )}
                        </div>
                        <div className={Styles.text_container}>
                          <div className={Styles.text_content}>
                            <p>{detail?.heading}</p>

                            <span>Status : {orderDetail?.status}</span>
                            <span>
                              Order Number :{orderDetail?.order_number}
                            </span>
                            <span>
                              Customization Type :{' '}
                              {detail?.customization?.key?.decoration_type
                                ? JSON.parse(
                                    detail?.customization?.key?.decoration_type
                                  )
                                : 'No Decoration'}
                            </span>
                          </div>
                          <div className={Styles.button_section}>
                            <span>Upload Logo / Artwork</span>
                            <div className={Styles.buttons}>
                              {detail?.logoImg && viewItem ? (
                                ''
                              ) : (
                                <button>
                                  <GrEdit /> Edit
                                </button>
                              )}
                              {detail?.logoImg && (
                                <button
                                  onClick={() =>
                                    handleDownloadLogo(detail?.logoImg)
                                  }
                                >
                                  Download logo
                                </button>
                              )}
                              {selectedFile && (
                                <div className={Styles.selectedFile}>
                                  <p>{selectedFile.name}</p>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className={Styles.logo_section}>
                            <div className={Styles.logo}>
                              <div className={Styles.cross_icon}>+</div>
                              {detail?.logoImg && (
                                <Image
                                  src={detail?.logoImg}
                                  width={30}
                                  height={30}
                                  alt="logo"
                                />
                              )}
                            </div>
                          </div>
                          <div className={Styles.price_section}>
                            <input
                              name=""
                              id=""
                              value={`$${(detail?.totalPrice).toFixed(2)}`}
                              on
                              disabled={true}
                            />
                            <button
                              onClick={() => handleDetails(detail, index)}
                            >
                              See Details
                            </button>
                          </div>

                          <div className={Styles.uploadSample}>
                            <div className={Styles.file_Container}>
                              <div className={Styles.button_section}>
                                <div className={Styles.label_button}>
                                  {!viewItem && (
                                    <>
                                      <p>Upload Sample</p>
                                      <div className={Styles.add_icon}>
                                        <label htmlFor="file">
                                          <input
                                            type="file"
                                            id="file"
                                            onChange={handleFileChange}
                                          />
                                          <div className={Styles.add_buton}>
                                            <Image
                                              src={images.Plus_Icon}
                                              width={60}
                                              height={60}
                                            />
                                          </div>
                                        </label>
                                      </div>
                                    </>
                                  )}
                                  <div className={Styles.preview_img}>
                                    {selectedFile && (
                                      <>
                                        <div className={Styles.preview_image}>
                                          <Image
                                            src={URL.createObjectURL(
                                              selectedFile
                                            )}
                                            layout="fill"
                                            alt="selected_image"
                                          />
                                        </div>
                                      </>
                                    )}
                                  </div>
                                </div>

                                <button
                                  className={Styles.btn_green}
                                  onClick={() =>
                                    handleDownloadLogo(detail?.logoImg)
                                  }
                                >
                                  Download Sample
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
              </div>
            )}

            {orderStatus === 'view mockup' && showDetails && (
              <>
                <div className={Styles.see_details_popup}>
                  <div className={Styles.See_content}>
                    <span
                      className={Styles.cross_popup}
                      onClick={() => setShowDetails(false)}
                    >
                      <Image
                        src={images.Cross_icon}
                        width={20}
                        height={20}
                        alt="Cross_Icon"
                      />
                    </span>
                    <div>
                      <label>Order No</label>
                      <span>{orderDetail.order_number}</span>
                    </div>
                    <div>
                      <label>Customization</label>
                      <span>
                        {data?.customization?.key?.decoration_type
                          ? JSON.parse(
                              data?.customization?.key?.decoration_type
                            )
                          : 'No Decoration'}
                      </span>
                    </div>
                    <div>
                      <label>Title</label>
                      <span>{data?.heading}</span>
                    </div>
                    <div>
                      <label>Price Per Unit</label>

                      <span>{data?.pricePerUnit}</span>
                    </div>
                    <div>
                      <label>Color</label>

                      <span>{data?.colours}</span>
                    </div>
                    <div>
                      <label>Total Price</label>

                      <span>{data?.totalPrice}</span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {orderStatus === 'view mockup' && (
              <div className={Styles.shipping_address_section}>
                <p>Shipping Address</p>
                {orderDetail?.Addresses?.map((item, index) => (
                  <>
                    <div className={Styles.content}>
                      <div className={Styles.address_content}>
                        <p>Address Book</p>
                        <span>{item?.address},</span>
                        <span>{item?.country},</span>
                        <span>{item?.city},</span>
                        <span>{item.state},</span>
                        <span>{item?.postal_code},</span>
                        <span>{item?.phone_number},</span>
                        {/* <span>{item},</span> */}
                      </div>
                      <div className={Styles.button_content}>
                        {viewItem ? (
                          ''
                        ) : (
                          <button onClick={() => handleEdit(index)}>
                            <GrEdit /> Edit
                          </button>
                        )}
                      </div>
                    </div>
                  </>
                ))}
              </div>
            )}

            {orderStatus === 'view mockup' && openModal && (
              <>
                <div className={Styles.shipping_addressPopup}>
                  <div className={Styles.addressPopup_Div}>
                    <span className={Styles.cross_iconPop}>
                      <Image
                        src={images.Cross_icon}
                        onClick={() => setOpenModal(false)}
                      />
                    </span>
                    <div className={Styles.input_divWrap}>
                      <div>
                        <label htmlFor="country">Single Address</label>
                        <select
                          name="singleAddress"
                          value={values.singleAddress}
                          onChange={handleChange}
                        >
                          <option value="Select Address" disabled>
                            Select Address...
                          </option>
                          <option value="single">Single</option>
                          <option value="multiple">Multiple</option>
                        </select>
                        {errors.country && (
                          <span className={Styles.errors}>
                            {errors.country}
                          </span>
                        )}
                      </div>
                      <div>
                        <label htmlFor="address">Address</label>
                        <input
                          type="text"
                          name="address"
                          id="address"
                          value={values.address}
                          onChange={handleChange}
                        />
                        {errors.address && (
                          <span className={Styles.errors}>
                            {errors.address}
                          </span>
                        )}
                      </div>
                      <div
                        className={`${Styles.input_divWrap} ${Styles.width_100} `}
                      >
                        <div>
                          <label htmlFor="country">First Name</label>
                          <input
                            type="text"
                            placeholder="First name"
                            name="first_name"
                            id="first_name"
                            autoComplete="off"
                            value={values.first_name}
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <label htmlFor="last_name">Last Name</label>
                          <input
                            type="text"
                            placeholder="Last name"
                            name="last_name"
                            id="last_name"
                            autoComplete="off"
                            value={values.last_name}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className={Styles.input_divWrap}>
                      <div>
                        <label htmlFor="country">Country</label>
                        <select
                          name="country"
                          id="country"
                          value={values.country}
                          onChange={handleChange}
                        >
                          <option value="">Select a country</option>
                          <option value="CA">CA</option>
                          <option value="US">US</option>
                        </select>
                        {errors.country && (
                          <span className={Styles.errors}>
                            {errors.country}
                          </span>
                        )}
                      </div>

                      <div className={Styles.form_inputs}>
                        <label htmlFor="email">Email</label>
                        <input
                          type="email"
                          placeholder="Email address"
                          name="email"
                          id="email"
                          value={values.email}
                          onChange={handleChange}
                          autoComplete="off"
                        />
                        <div
                          name="email"
                          component="div"
                          className={Styles.error}
                        ></div>
                      </div>
                      <div className={Styles.form_inputs}>
                        <label htmlFor="country">Company Name</label>
                        <input
                          type="text"
                          placeholder="Email address"
                          name="email"
                          id="email"
                          value={values.email}
                          onChange={handleChange}
                          autoComplete="off"
                        />
                        <div
                          name="email"
                          component="div"
                          className={Styles.error}
                        ></div>
                      </div>
                      <div className={Styles.form_inputs}>
                        <label htmlFor="country">Apartment</label>
                        <input
                          type="text"
                          placeholder="Email address"
                          name="appartment"
                          id="appartment"
                          value={values.appartment}
                          onChange={handleChange}
                          autoComplete="off"
                        />
                        <div
                          name="email"
                          component="div"
                          className={Styles.error}
                        ></div>
                      </div>
                      <div className={Styles.form_inputs}>
                        <label htmlFor="street">Street</label>
                        <input
                          type="text"
                          placeholder="Street"
                          name="street"
                          id="street"
                          value={values.street}
                          onChange={handleChange}
                          autoComplete="off"
                        />
                        <div
                          name="email"
                          component="div"
                          className={Styles.error}
                        ></div>
                      </div>
                      <div>
                        <label htmlFor="number">Number</label>
                        <input
                          type="number"
                          name="phone_number"
                          id="phone_number"
                          value={values.phone_number}
                          onChange={handleChange}
                        />
                        {errors.phone_number && (
                          <span className={Styles.errors}>
                            {errors.phone_number}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className={Styles.input_divWrap}>
                      <div>
                        <label htmlFor="state">State</label>
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
                        {errors.state && (
                          <span className={Styles.errors}>{errors.state}</span>
                        )}
                      </div>
                      <div>
                        <label htmlFor="city">City</label>
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
                                <option value={option.name}>
                                  {option.name}
                                </option>
                              </>
                            ))}
                        </select>
                        {errors.city && (
                          <span className={Styles.errors}>{errors.city}</span>
                        )}
                      </div>
                    </div>

                    {values.country === 'CA' && (
                      <div>
                        <label htmlFor="postal_code">Postal Code</label>
                        <input
                          type="text"
                          name="postal_code"
                          id="postal_code"
                          value={values.postal_code}
                          onChange={handleChange}
                        />
                        {errors.postal_code && (
                          <span className={Styles.errors}>
                            {errors.postal_code}
                          </span>
                        )}
                      </div>
                    )}

                    {values.country === 'US' && (
                      <div>
                        <label htmlFor="zip_code">Zip Code</label>
                        <input
                          type="text"
                          name="zip_code"
                          id="zip_code"
                          value={values.zip_code}
                          onChange={handleChange}
                        />
                        {errors.zip_code && (
                          <span className={Styles.errors}>
                            {errors.zip_code}
                          </span>
                        )}
                      </div>
                    )}

                    <div className={Styles.btn_popup}>
                      <button
                        className={Styles.updatebtn}
                        disabled={Object.values(errors).some(
                          (error) => error !== ''
                        )}
                        onClick={handleUpdateAddress}
                      >
                        Update
                      </button>
                      <button
                        className={Styles.Cancelbtn}
                        onClick={() => setOpenModal(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {orderStatus === 'view mockup' && (
              <div className={Styles.other_info_container}>
                <p>Other Info</p>
                <div className={Styles.content}>
                  <p>Accepted Order Date</p>

                  <span>
                    {orderDetail?.other_info?.selectedDate
                      ? new Date(
                          orderDetail?.other_info?.selectedDate
                        ).toLocaleDateString()
                      : ''}
                  </span>

                  <p>Important note about your order</p>
                  <span>{orderDetail?.other_info?.textarea}</span>
                </div>
              </div>
            )}

            {orderStatus === 'view mockup' && (
              <div className={Styles.cancelation_request_container}>
                <p>Cancellation Request</p>
                <div className={Styles.content}>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Lorem ipsum dolor sit amet, consn ectetur adipiscing elit.
                    Lorem ipsum dolor sit ame.
                  </p>

                  <button className={Styles.Btn_fill}>Cancel Request</button>
                </div>
              </div>
            )}

            {orderStatus === 'submitted' && (
              <>
                <Approval orderDetail={orderDetail} />
              </>
            )}
          </div>
        )}
      </Layout>
    </>
  )
}

export default orderDetail
