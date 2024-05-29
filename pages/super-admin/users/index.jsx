import React, { useEffect, useState } from 'react'
import Pagination from '../../../components/pagination/Pagination'
import { FaEye, FaRegEdit } from 'react-icons/fa'
import { RiDeleteBin6Line } from 'react-icons/ri'
import Styles from './users.module.css'
import Layout from '../../../components/super-adminLayout/Layout'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import useFetch from '../../../lib/useFetch'

const Users = () => {
  const router = useRouter()
  const [users, setUsers] = useState([])
  const [editUser, setEditUser] = useState(false)
  const [Id, setId] = useState('')
  const role = useSelector((state) => state.auth.role)

  const [
    getloadQuery,
    { response: getResponse, loading: getLoading, error: getError },
  ] = useFetch(`/sadm/customers`, {
    method: 'get',
  })

  const [
    EditloadQuery,
    { response: EditResponse, loading: EditLoading, error: EditError },
  ] = useFetch(`/sadm/user/details/${Id}`, {
    method: 'get',
  })

  useEffect(() => {
    getloadQuery()
  }, [])

  useEffect(() => {
    EditloadQuery()
  }, [Id])

  useEffect(() => {
    if (getResponse) {
      setUsers(getResponse?.data)
    } else if (getError) {
      return
    }
  }, [getResponse, getError])

  useEffect(() => {
    if (role !== 'super admin') {
      router.push('/login')
    }
  }, [role])

  return (
    <>
      <Layout>
        {/* Customer data table */}
        <div className={Styles.Users_data_table}>
          <table>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Permissions</th>
              <th>Action</th>
            </tr>
            {users &&
              users.map((user, index) => (
                <>
                  <tr key={index}>
                    <td>{user && user.name}</td>
                    <td>{user && user.email}</td>
                    <td>{user && user.role}</td>
                    <td></td>
                    <td>
                      <div className={Styles.action_icons}>
                        <span>
                          <FaEye fontSize={18} cursor="pointer" />
                        </span>
                        <span>
                          <FaRegEdit
                            fontSize={18}
                            cursor="pointer"
                            onClick={() => setEditUser(true)}
                          />
                        </span>
                        <span>
                          <RiDeleteBin6Line fontSize={18} cursor="pointer" />
                        </span>
                      </div>
                    </td>
                  </tr>
                </>
              ))}
          </table>
          {/* Pagination section */}
          {/* <div className={Styles.pagination_container}>
            <div className={Styles.pagination_content}>
              <Pagination />
            </div>
          </div> */}
        </div>
      </Layout>

      {editUser && (
        <section className={Styles.shareInvoiceModal}>
          <div className={Styles.shareInvoiceModalDiv}>
            <h2>Edit users</h2>
            {/* <p>Please enter details</p> */}

            <div className={Styles.fomr_share}>
              <input
                type="text"
                id="Name"
                name="Name"
                placeholder="Enter username"
                className={Styles.input}
                autoComplete="off"
              />
              {/* <ErrorMessage
                            name="email"
                            component="div"
                            className={Styles.error}
                          /> */}

              <input
                type="text"
                id="Email"
                name="Email"
                placeholder="Enter email address"
                className={Styles.input}
                autoComplete="off"
              />

              <div className={Styles.Input_wrpper}>
                <input
                  type="number"
                  id="Enter_password"
                  name="Enter Password"
                  placeholder="Enter Password"
                  className={Styles.input}
                  autoComplete="off"
                />

                <input
                  type="number"
                  id="Retype_password"
                  name="Retype Password"
                  placeholder="Retype Password"
                  className={Styles.input}
                  autoComplete="off"
                />
              </div>
              <select type="select">
                <option>Role</option>
                <option> klRole</option>
                <option> Rokolkle</option>
                <option> Rokolkle</option>
              </select>

              <div className={Styles.submite_btn}>
                <button onClick={() => setEditUser(false)}>Back</button>
                <button>Update</button>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default Users
