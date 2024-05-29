import React, { useState } from 'react'
import Styles from './DashBoard.module.css'
import { IoSearchOutline } from 'react-icons/io5'
import { IoIosArrowBack } from 'react-icons/io'
import { IoIosArrowForward } from 'react-icons/io'
import Image from 'next/image'
import {
  Application_Sales,
  Dashboard_User_Data,
  Dashboard_table,
} from '../../../constants/data'
import images from '../../../constants/images'
import Navbar from '../Navbar/Navbar'

const DashBoard = () => {
  const [leftCardColor, setLeftCard] = useState(0)
  const [bottomCardColor, setBottomCardColor] = useState(0)
  return (
    <>
      {/* <Layout> */}
      <div className={Styles.DashBoard_container}>
        <div className={Styles.top_content}></div>
        <div className={Styles.purchase_card}>
          <nav className={Styles.nav_content}>
            <div className={Styles.left_section}>
              <button className={Styles.Add_Purchase_btn}>Add Purchase</button>
              <span className={Styles.message}>...</span>
            </div>
            <div className={Styles.middle_section}>
              <input type="text" placeholder="Search..." />
              <button style={{ cursor: 'pointer' }}>
                <span>
                  <IoSearchOutline />
                </span>
              </button>
            </div>
            <div className={Styles.right_section}>
              <p>1-50 of 2,500</p>
              <IoIosArrowBack style={{ cursor: 'pointer' }} />
              <IoIosArrowForward style={{ cursor: 'pointer' }} />
            </div>
          </nav>
          <div className={Styles.horizontal_line}></div>
          <div className={Styles.user_table}>
            <table>
              <tr>
                <input
                  type="checkbox"
                  name=""
                  id=""
                  style={{ cursor: 'pointer' }}
                />
                <th>SL.</th>
                <th>Supplier</th>
                <th>Warehouse</th>
                <th>Grand Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
              {Dashboard_table.map((data, i) => (
                <tr key={i} className={Styles.data_row}>
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    style={{ cursor: 'pointer' }}
                  />
                  <td>{data.SL}</td>
                  <td>{data.Supplier}</td>
                  <td>{data.Warehouse}</td>
                  <td>{data.Grand_total}</td>
                  <td>
                    <span
                      style={{
                        backgroundColor: data.bgColor,
                        color: '#fff',
                        padding: '5px 10PX',
                        borderRadius: '30PX',
                        cursor: 'pointer',
                      }}
                    >
                      {data.Status}
                    </span>
                  </td>
                  <td style={{ cursor: 'pointer' }}>...</td>
                </tr>
              ))}
            </table>
          </div>
        </div>
        <div className={Styles.user_card_container}>
          <div className={Styles.user_card_data}>
            <div className={Styles.user_data_container}>
              <div className={Styles.user_data_container_heading}>
                <h3>New Customers</h3>
                <IoIosArrowForward />
              </div>
              <div className={Styles.horizonatal_line}></div>
              {Dashboard_User_Data.map((userData, i) => (
                <div className={Styles.user_Content} key={i}>
                  <div className={Styles.left_content}>
                    <div className={Styles.imgContent}>
                      <Image
                        src={userData.src}
                        width={30}
                        height={30}
                        style={{ cursor: 'pointer' }}
                      />
                    </div>
                    <div className={Styles.user_text_content}>
                      <span className={Styles.userName}>{userData.Name}</span>
                      <span className={Styles.user_message}>
                        {userData.Message}
                      </span>
                    </div>
                  </div>
                  <div className={Styles.right_content}>
                    <div className={Styles.right_content_dot}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={Styles.application_sales}>
            <div className={Styles.Application_data_heading}>
              <h3>Application Sales</h3>
            </div>
            <div className={Styles.Application_data_container}>
              <table className={Styles.Application_sales_table}>
                <tr>
                  <th>Application</th>
                  <th>Sales</th>
                  <th>Change</th>
                  <th>Price</th>
                </tr>
                {Application_Sales.map((item, index) => (
                  <tr
                    className={leftCardColor === index ? Styles.activeRow : ''}
                    onClick={() => setLeftCard(index)}
                    key={i}
                  >
                    <td>
                      <p>{item.Application_Name}</p>
                      <p>{item.Application_software}</p>
                    </td>
                    <td>{item.Sales}</td>
                    <td>graph</td>
                    <td>{item.Price}</td>
                  </tr>
                ))}
              </table>
            </div>
          </div>
        </div>
        <div className={Styles.bottom_table}>
          <div className={Styles.Application_data_heading}>
            <div className={Styles.bottom_data_heading}>
              <h3>Application Sales</h3>
              <IoIosArrowForward />
            </div>
          </div>
          <div className={Styles.Application_data_container}>
            <table className={Styles.Application_sales_table}>
              <tr>
                <th>Application</th>
                <th>Sales</th>
                <th>Change</th>
                <th>Price</th>
              </tr>
              {Application_Sales.map((item, index) => (
                <tr
                  className={bottomCardColor === index ? Styles.bottomRow : ''}
                  onClick={() => setBottomCardColor(index)}
                  key={i}
                >
                  <td>
                    <p>{item.Application_Name}</p>
                    <p>{item.Application_software}</p>
                  </td>
                  <td>{item.Sales}</td>
                  <td>graph</td>
                  <td>{item.Price}</td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      </div>
      {/* </Layout> */}
    </>
  )
}

export default DashBoard
