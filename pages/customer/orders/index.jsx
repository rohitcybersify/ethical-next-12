import React, { useEffect, useState } from 'react'

import Styles from './orders.module.css'
import Layout from '../../../components/super-adminLayout/Layout'
import { useRouter } from 'next/router'
import useFetch from '../../../lib/useFetch'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import Loaders from '../../../components/loaders/Loaders'
import { setProductStatus } from '../../../redux-setup/orderStatus'
import { FaRegEdit } from 'react-icons/fa'
const Orders = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [userOrders, setUserOrders] = useState([])
  const [Id, setId] = useState('')
  const userId = useSelector((state) => state.auth.userId)

  const [
    getLoadQuery,
    { response: getUserData, loading: getUserLoading, error: getUserError },
  ] = useFetch(`/orders/user/${userId}`, {
    method: 'get',
  })
  const [
    deleteLoadQuery,
    {
      response: deletedUserOrderResponse,
      loading: deleteUserLoading,
      error: deletedUserError,
    },
  ] = useFetch(`/user/orders/delete/${Id}`, {
    method: 'post',
  })

  useEffect(() => {
    if (userId) {
      getLoadQuery()
    }
  }, [])
  useEffect(() => {
    if (Id) {
      deleteLoadQuery()
    }
  }, [Id])
  useEffect(() => {
    if (deletedUserOrderResponse) {
    }
    if (deletedUserError) {
      toast.error('Something Went Wrong', {
        position: 'top-center',
      })
    }
  }, [deletedUserOrderResponse, deletedUserError])
  useEffect(() => {
    if (getUserData) {
      setUserOrders(getUserData?.data)
    } else if (getUserError) {
      return
    }
  }, [getUserData, getUserError])

  const handleEdit = (id) => {
    router.push(`/customer/order-detail/${id}`)
    dispatch(setProductStatus('submitted'))
  }

  const colors = [
    { name: 'submitted', background: '#a2d061', color: '#fff' },
    { name: 'correction', background: '#fb6340', color: '#fff' },
    { name: 'approved', background: '#a2d061', color: '#fff' },
    { name: 'cancel', background: '#fb6340', color: '#fff' },
    { name: 'delivered', background: '#a2d061', color: '#fff' },
    { name: 'process', background: '#11CDEF', color: '#fff' },
  ]

  return (
    <>
      <Layout>
        {getUserLoading ? (
          <Loaders />
        ) : (
          <div className={Styles.Orders_data_table}>
            <table>
              <tr>
                <th>Serial No.</th>
                <th>Order Number</th>
                <th>Total Estimate</th>
                <th>status</th>
                <th>Action</th>
              </tr>
              {userOrders &&
                userOrders
                  .slice()
                  .sort(
                    (a, b) => new Date(b.created_at) - new Date(a.created_at)
                  )
                  .map((userOrder, index) => (
                    <tr key={userOrder}>
                      <>
                        <td>{index + 1}</td>
                        <td>{userOrder?.order_number}</td>
                        <td>{userOrder?.sub_total}</td>
                        <td>
                          {colors.map((item) => (
                            <>
                              {item.name === userOrder.status && (
                                <button
                                  onClick={() => handleStatus(userOrder)}
                                  className={Styles.button_Style}
                                  style={{ background: item.background }}
                                >
                                  {userOrder?.status}
                                </button>
                              )}
                            </>
                          ))}
                        </td>

                        <td>
                          <div className={Styles.action_icons}>
                            <button>
                              <FaRegEdit
                                fontSize={18}
                                cursor="pointer"
                                onClick={() => handleEdit(userOrder?.id)}
                              />
                            </button>
                          </div>
                        </td>
                      </>
                    </tr>
                  ))}
            </table>
          </div>
        )}
      </Layout>
    </>
  )
}
export default Orders
