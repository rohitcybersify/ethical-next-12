'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Styles from './dashboard.module.css'
import { GoDotFill } from 'react-icons/go'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { FaRegEdit } from 'react-icons/fa'
import useFetch from '../../../lib/useFetch'
import { BsFillBoxFill } from 'react-icons/bs'
import { IoKeyOutline } from 'react-icons/io5'
import { CiUser } from 'react-icons/ci'
import { IoMdCart } from 'react-icons/io'
import Layout from '../../../components/super-adminLayout/Layout'
import Loaders from '../../../components/loaders/Loaders'
import { timeAgo } from '@lib/utils'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import images from '../../../constants/images'

const Dashboard = () => {
  const router = useRouter()
  const role = useSelector((state) => state.auth.role)
  const [data, setData] = useState([])
  const [singleImage, setSingleImage] = useState('')
  const [totalNewCustomer, setTotalNewCustomer] = useState([])
  const [newProducts, setNewProducts] = useState([])

  const [
    count,
    { response: countResponse, loading: countLoading, error: countError },
  ] = useFetch(`/sadm/count`, {
    method: 'get',
  })

  const [
    recentProducts,
    {
      response: productsResponse,
      loading: productsLoading,
      error: productsError,
    },
  ] = useFetch(`/sadm/product/recent`, {
    method: 'get',
  })
  //column_1_retail_price_cad product_title image
  const [
    recentCustomers,
    {
      response: customerResponse,
      loading: customerLoading,
      error: customerError,
    },
  ] = useFetch(`/sadm/customer/recent`, {
    method: 'get',
  })

  useEffect(() => {
    if (role !== 'super admin') {
      router.push('/login')
    }
  }, [role])

  useEffect(() => {
    count()
    recentProducts()
    recentCustomers()
  }, [])

  useEffect(() => {
    if (countResponse) {
      setData(countResponse?.data)
    } else if (countError) {
      return
    }
  }, [countResponse, countError])

  useEffect(() => {
    if (productsResponse) {
      setNewProducts(productsResponse?.data)
    } else if (productsError) {
      return
    }
  }, [productsResponse, productsError])

  useEffect(() => {
    if (customerResponse) {
      setTotalNewCustomer(customerResponse?.data)
    } else if (customerError) {
      return
    }
  }, [customerResponse, customerError])

  return (
    <>
      <Layout>
        <div className={Styles.middle_content}>
          <div className={Styles.container}>
            <div className={Styles.content}>
              <div>
                <span>
                  <BsFillBoxFill color="#a2d061" fontSize={30} />
                </span>
              </div>
              <div>
                {data?.allProductCount && (
                  <p className={Styles.number}>{data?.allProductCount}</p>
                )}
                <p className={Styles.text}>{'Products'}</p>
              </div>
            </div>
          </div>
          <div className={Styles.container}>
            <div className={Styles.content}>
              <div>
                <span>
                  <IoMdCart color="#a2d061" fontSize={30} />
                </span>
              </div>
              <div>
                {data?.allOrderCount && (
                  <p className={Styles.number}>{data?.allOrderCount}</p>
                )}
                <p className={Styles.text}>{'Orders'}</p>
              </div>
            </div>
          </div>
          <div className={Styles.container}>
            <div className={Styles.content}>
              <div>
                <span>
                  <CiUser color="#a2d061" fontSize={30} />
                </span>
              </div>
              <div>
                {data?.allCustomerCount > 0 && (
                  <p className={Styles.number}>{data?.allCustomerCount}</p>
                )}
                <p className={Styles.text}>{'Customers'}</p>
              </div>
            </div>
          </div>
          <div className={Styles.container}>
            <div className={Styles.content}>
              <div>
                <span>
                  <IoKeyOutline color="#a2d061" fontSize={30} />
                </span>
              </div>
              <div>
                {data?.allSaleCount > 0 && (
                  <p className={Styles.number}>{data?.allSaleCount}</p>
                )}
                <p className={Styles.text}>{'Sales'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Content */}
        <div className={Styles.bottom_content}>
          <div className={Styles.bottom_left_content}>
            <h2>New Product</h2>
            {productsLoading ? (
              <div className="">
                <Loaders />
              </div>
            ) : (
              <div className={Styles.new_product_table}>
                <table>
                  <tr>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Status</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>

                  {newProducts &&
                    newProducts.map((item) => (
                      <>
                        <tr>
                          {item?.product_title && (
                            <td>{item?.product_title}</td>
                          )}
                          {item?.image ? (
                            <td>
                              <span>
                                <Image
                                  src={item?.image}
                                  width={25}
                                  height={25}
                                  icon="product"
                                />
                              </span>
                            </td>
                          ) : (
                            <>
                              <td>
                                <span>
                                  <Image
                                    src={images.No_product}
                                    width={25}
                                    height={25}
                                    icon="product"
                                  />
                                </span>
                              </td>
                            </>
                          )}
                          <td>
                            <div className={Styles.status}>
                              <div>
                                <span>
                                  <GoDotFill color="#a2d061" />
                                </span>
                              </div>
                              <div>
                                <span>In Stock</span>
                              </div>
                            </div>
                          </td>
                          <td></td>
                          <td>
                            <div className={Styles.status}>
                              <div className={Styles.action}>
                                <span>
                                  <FaRegEdit fontSize={18} />
                                </span>
                              </div>
                              <div>
                                <span>
                                  <RiDeleteBin6Line fontSize={18} />
                                </span>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </>
                    ))}
                </table>
              </div>
            )}
          </div>

          <div className={Styles.bottom_right_content}>
            <h2>New Customers</h2>
            <div className={Styles.newCustomers_data}>
              {totalNewCustomer &&
                totalNewCustomer.map((item) => (
                  <>
                    <div className={Styles.Customer}>
                      {item?.name && <p className={Styles.name}>{item.name}</p>}
                      {item.created_at && (
                        <p className={Styles.time}>
                          {timeAgo(item?.created_at)}
                        </p>
                      )}
                    </div>
                  </>
                ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Dashboard
