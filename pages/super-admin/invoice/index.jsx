import React, { useEffect } from 'react'
import Styles from './invoice.module.css'
import Pagination from '../../../components/pagination/Pagination'
import { FaRegEdit } from 'react-icons/fa'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { Invoice_Data } from '../../../constants/data'
import { FaEye } from 'react-icons/fa'
import Layout from '../../../components/super-adminLayout/Layout'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
const Invoice = () => {
  const router = useRouter()

  const role = useSelector((state) => state.auth.role)

  const getStatusColor = (status) => {
    switch (status) {
      case 'Draft':
        return '#11CDEF'
      case 'Paid':
        return '#a2d061'
      case 'Declined':
        return '#FB6340'
      default:
        return 'white'
    }
  }

  useEffect(() => {
    if (role !== 'super admin') {
      router.push('/login')
    }
  }, [role])

  return (
    <>
      <Layout>
        {/* Customer data table */}
        <div className={Styles.invoice_data_table}>
          <table>
            <tr>
              <th>Invoice No.</th>
              <th>Customer</th>
              <th>Category</th>
              <th>Issue Date</th>
              <th>Due Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
            {Invoice_Data.map((data, i) => (
              <tr key={i}>
                <td>
                  <input type="checkbox" name="" id="" />
                  {data.invoice}
                </td>
                <td>{data.customer}</td>
                <td>{data.category}</td>
                <td>{data.issue_Date}</td>
                <td>{data.due_Date}</td>
                <td>{data.amount}</td>
                <td>
                  <button
                    style={{
                      backgroundColor: getStatusColor(data.status),
                      color: '#fff',
                      padding: '3px 15px',
                      borderRadius: '10px',
                    }}
                  >
                    {data.status}
                  </button>
                </td>
                <td>
                  <div className={Styles.action_icons}>
                    <span>
                      <FaEye fontSize={18} />
                    </span>
                    <span>
                      <FaRegEdit fontSize={18} />
                    </span>
                    <span>
                      <RiDeleteBin6Line fontSize={18} />
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </table>

          {/* <div className={Styles.pagination_container}>
            <div className={Styles.pagination_content}>
              <Pagination />
            </div>
          </div> */}
        </div>
      </Layout>
    </>
  )
}

export default Invoice
