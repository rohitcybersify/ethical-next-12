import React from 'react'
import Image from 'next/image'
import Styles from './superadmin.module.css'
import SideBar from '../../../components/admin/SideBar/SideBar'
import Navbar from '../../../components/admin/Navbar/Navbar'
import Card from '../../../components/admin/superAdmin/Card'
import ActiveUsers from '../../../components/admin/superAdmin/ActiveUsers'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { BiUpArrowAlt } from 'react-icons/bi'
import { FaCheck } from 'react-icons/fa6'
import images from '../../../constants/images'
import {
  Active_Users,
  Latest_Members,
  Orders_Preview,
  SuperAdmin_Cards,
} from '../../../constants/data'
const SuperAdmin = () => {
  return (
    <>
      <section className={Styles.superAdmin_section}>
        <div className={Styles.superAdmin_section_container}>
          <div className={Styles.superAdmin_content}>
            <div className={Styles.superAdmin_left_content}>
              <SideBar data={images.ethical_swag} />
            </div>
            <div className={Styles.superAdmin_right_content}>
              <Navbar data="Dashboard" thumbnail={images.User_icon} />
              <div className={Styles.dashboad_wrapper}>
                <div className={Styles.cards_container}>
                  {SuperAdmin_Cards.map((card) => (
                    <Card card={card} key={card.id} />
                  ))}
                </div>
                {/* Active Users */}
                <div className={Styles.superAdmin_middle_section}>
                  <div className={Styles.active_user_card}>
                    <div className={Styles.active_user_column}>
                      <div className={Styles.active_user_chart}></div>
                      <div className={Styles.active_user_text}>
                        <p>Active Users</p>
                        <span>
                          <b>(+23%)</b> than last week
                        </span>
                      </div>
                      <div className={Styles.active_user_list}>
                        {Active_Users.map((user) => (
                          <>
                            <ActiveUsers user={user} key={user.id} />
                          </>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className={Styles.sales_overview}>Sales Overview</div>
                </div>

                {/* Latest Members */}
                <div className={Styles.bottom_section}>
                  <div className={Styles.latest_members}>
                    <div className={Styles.latest_members_top_content}>
                      <div>
                        <h3 className={Styles.heading}>Latest Members</h3>
                        <div className={Styles.bottom_text}>
                          <span>
                            <FaCheck color="#27c2e8" />
                          </span>
                          <span>
                            <b>30 done</b> this month
                          </span>
                        </div>
                      </div>
                      <div className={Styles.right_icon}>
                        <span>
                          <HiOutlineDotsVertical />
                        </span>
                      </div>
                    </div>
                    {/* latest member bottom section */}
                    <div className={Styles.table_container}>
                      <table>
                        <tr>
                          <th>Companies</th>
                          <th>Members</th>
                          <th>Budget</th>
                          <th>Completion</th>
                        </tr>
                        {Latest_Members.map((data) => (
                          <>
                            <tr key={data.id}>
                              <td>{data.companies}</td>
                              <td>
                                <Image
                                  src={data.members}
                                  width={25}
                                  height={25}
                                  className={Styles.image}
                                />
                              </td>
                              <td>{data.budget}</td>
                              <td>
                                <progress
                                  className={Styles.progress}
                                  value={data.completion}
                                  max="100"
                                  style={{
                                    backgroundImage:
                                      data.bgColor === 'green'
                                        ? `linear-gradient(to right, #8de72d 40%, #54CB32 20%, #29B635 40%)`
                                        : 'linear-gradient(to right, #ff7e5f, #feb47b)',
                                  }}
                                ></progress>
                              </td>
                            </tr>
                          </>
                        ))}
                      </table>
                    </div>
                  </div>
                  <div className={Styles.orders_overview}>
                    <div className={Styles.orders_overview_container}>
                      <div className={Styles.orders_overview_textContent}>
                        <h2>Orders overview</h2>
                        <div className={Styles.bottom_text}>
                          <span>
                            <BiUpArrowAlt color="#82d657" fontSize={25} />
                          </span>
                          <span>
                            <b>24%</b> this month
                          </span>
                        </div>
                      </div>
                      {/* middle content*/}
                      <div className={Styles.bottom_Content}>
                        {Orders_Preview.map((order, i) => (
                          <>
                            <div className={Styles.order_Content} key={i}>
                              <span>{order.icon}</span>
                              <div className={Styles.order_right_content}>
                                <p className={Styles.text}>{order.text}</p>
                                <p className={Styles.time}>{order.time}</p>
                              </div>
                            </div>
                          </>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default SuperAdmin
