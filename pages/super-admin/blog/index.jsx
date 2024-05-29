import React, { useEffect } from 'react'
import Pagination from '../../../components/pagination/Pagination'
import { FaEye, FaRegEdit } from 'react-icons/fa'
import { PiImageThin } from 'react-icons/pi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import Styles from './blogPost.module.css'
import Layout from '../../../components/super-adminLayout/Layout'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'

const BlogPost = () => {
  const router = useRouter()
  const role = useSelector((state) => state.auth.role)

  useEffect(() => {
    if (role !== 'super admin') {
      router.push('/login')
    }
  }, [role])

  return (
    <>
      <Layout>
        <div className={Styles.BlogPost_data_table}>
          <table>
            <tr>
              <th>Name</th>
              <th>Action</th>
            </tr>
            {Array.from({ length: 13 }).map((data, i) => (
              <tr key={i}>
                <td>
                  <div className={Styles.name_cell}>
                    <input type="checkbox" name="" id="" />
                    <PiImageThin fontSize={40} />
                    <span>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor.
                    </span>
                  </div>
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
          {/* Pagination section */}
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

export default BlogPost
