import React, { useEffect, useState } from 'react'
import Styles from './AddRoles.module.css'
import { FaRegEdit } from 'react-icons/fa'
import { RiDeleteBin6Line } from 'react-icons/ri'
import Layout from '../../../components/super-adminLayout/Layout'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import useFetch from '../../../lib/useFetch'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'

const showPermission = [
  { name: 'Products', options: ['Edit', 'View', 'Delete'] },
  { name: 'Orders', options: ['Edit', 'View', 'Delete'] },
  { name: 'Users', options: ['Edit', 'View', 'Delete'] },
  { name: 'Reports', options: ['Edit', 'View', 'Delete'] },
]

const AddRoles = () => {
  const router = useRouter()
  const role = useSelector((state) => state.auth.role)
  const [roleName, setRoleName] = useState('')
  const [permissions, setPermissions] = useState([
    {
      category: 'Products',
      boxes: [
        { name: 'Edit', checked: false },
        { name: 'View', checked: false },
        { name: 'Delete', checked: false },
      ],
    },
    {
      category: 'Orders',
      boxes: [
        { name: 'Edit', checked: false },
        { name: 'View', checked: false },
        { name: 'Delete', checked: false },
      ],
    },
    {
      category: 'Users',
      boxes: [
        { name: 'Edit', checked: false },
        { name: 'View', checked: false },
        { name: 'Delete', checked: false },
      ],
    },
    {
      category: 'Reports',
      boxes: [
        { name: 'Edit', checked: false },
        { name: 'View', checked: false },
        { name: 'Delete', checked: false },
      ],
    },
  ])

  return (
    <>
      <Layout>
        <div className={Styles.middle_section}>
          <input
            type="text"
            placeholder="Role Name"
            name="role"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
          />
          <table>
            <tr>
              <th>Permission</th>
              <th>Edit</th>
              <th>View</th>
              <th>Delete</th>
            </tr>
            {permissions &&
              permissions.map((permission) => (
                <>
                  <tr>
                    <td>{permission.category}</td>
                    {permission.boxes.map((box) => (
                      <>
                        <td>
                          <input
                            type="checkbox"
                            id={box.name}
                            name={box.name}
                            value={box.checked}
                            checked={box.checked}
                          />
                        </td>
                      </>
                    ))}
                  </tr>
                </>
              ))}
          </table>
        </div>
        <div className={Styles.AddRoles_data_table}>
          <table>
            <tr>
              <th>Role</th>
              <th>Permissions</th>
              <th>Action</th>
            </tr>
          </table>
        </div>
      </Layout>
    </>
  )
}

export default AddRoles
