import React, { useEffect, useState } from 'react'
import { FaEye, FaRegEdit } from 'react-icons/fa'
import { RiDeleteBin6Line } from 'react-icons/ri'
import Styles from './orders.module.css'
import Layout from '../../../components/super-adminLayout/Layout'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { setViewItem } from '../../../redux-setup/adminSlice'
import useFetch from '../../../lib/useFetch'
import Loaders from '../../../components/loaders/Loaders'

const Orders = () => {
  const router = useRouter()
  const [orders, setOrders] = useState([])
  const dispatch = useDispatch()
  const [Id, setId] = useState('')
  const role = useSelector((state) => state.auth.role)

  const [
    getloadQuery,
    { response: getResponse, loading: getLoading, error: getError },
  ] = useFetch(`/sadm/orders`, {
    method: 'get',
  })

  const [
    deleteLoadQuery,
    { response: deleteResponse, loading: deleteLoading, error: deleteError },
  ] = useFetch(`/sadm/orders/delete/${Id}`, {
    method: 'POST',
  })

  useEffect(() => {
    if (role !== 'super admin') {
      router.push('/login')
    }
  }, [role])

  useEffect(() => {
    getloadQuery()
  }, [])

  useEffect(() => {
    if (Id) {
      deleteLoadQuery()
      getloadQuery()
    }
  }, [Id])

  useEffect(() => {}, [deleteResponse])

  useEffect(() => {
    if (getResponse) {
      setOrders(getResponse?.data)
    }
  }, [getResponse])

  const handleEdit = (id, type) => {
    if (type === 'Edit') {
      router.push(`/customer/order-detail/${id}`)
      dispatch(setViewItem(false))
    } else if (type === 'View') {
      router.push(`/customer/order-detail/${id}`)
      dispatch(setViewItem(true))
    }
  }

  const handleDelete = (id) => {
    setId(id)
  }

  return (
    <>
      <Layout>
        {getLoading ? (
          <Loaders />
        ) : (
          <>
            <div className={Styles.Orders_data_table}>
              <table>
                <tr>
                  <th>Order Number</th>
                  <th>Total Estimate</th>

                  <th>Status</th>
                  <th>Action</th>
                </tr>
                {orders &&
                  orders.map((item, index) => (
                    <>
                      <tr key={index}>
                        <td>{item?.order_number}</td>
                        <td>{item?.sub_total}</td>

                        <td>{item?.status}</td>
                        <td>
                          <div className={Styles.action_icons}>
                            <span>
                              <FaEye
                                fontSize={18}
                                cursor="pointer"
                                onClick={() => handleEdit(item?.id, 'View')}
                              />
                            </span>
                            <span>
                              <FaRegEdit
                                fontSize={18}
                                cursor="pointer"
                                onClick={() => handleEdit(item?.id, 'Edit')}
                              />
                            </span>
                            {/* <span>
                              <RiDeleteBin6Line
                                fontSize={18}
                                cursor="pointer"
                                onClick={() => handleDelete(item?.id)}
                              />
                            </span> */}
                          </div>
                        </td>
                      </tr>
                    </>
                  ))}
              </table>
            </div>
          </>
        )}
      </Layout>
    </>
  )
}

export default Orders
