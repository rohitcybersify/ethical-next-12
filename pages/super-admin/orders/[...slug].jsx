import React, { useEffect, useState } from 'react'
import Styles from './orders.module.css'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'

const slug = () => {
  const [data, setData] = useState([])
  const orderPlaced = useSelector((state) => state.cart.orderPlaced)
  const orderIndex = useSelector((state) => state.cart.orderIndex)

  useEffect(() => {
    if (orderPlaced) {
      const findOrder = orderPlaced.find(
        (item, index) => item[2]?.id === orderIndex
      )
      setData(findOrder)
    }
  }, [])

  return (
    <>
      <div className="container">
        <div className="content">
          <form className={Styles.form}>
            <h3>Order Details</h3>
            <div className={Styles.input_field}>
              <label htmlFor="">Issue Date</label>
              <input
                type="date"
                name="ORDER_ID"
                placeholder="Issue Date"
                value={data[0]?.selectedDate}
              />
            </div>
            <div className={Styles.input_field}>
              <label htmlFor="">Swag Pack</label>
              <input
                type="text"
                name="Client_Linked"
                placeholder="Owner"
                value={data[0]?.swagPack.toString()}
              />
            </div>
            <div className={Styles.input_field}>
              <label htmlFor="">Warehousing</label>
              <input
                type="text"
                name="warehousing"
                placeholder="Warehousing"
                value={data[0]?.Warehousing.toString()}
              />
            </div>
            <div className={Styles.input_field}>
              <label htmlFor="">Pick & Pack</label>
              <input
                type="text"
                name="pick_&_pack"
                placeholder="Pick And Pack"
                value={data[0]?.pickAndPack.toString()}
              />
            </div>

            <h3>Shipping Details</h3>
            <div className={Styles.input_field}>
              <label htmlFor="">Single Address</label>
              <input
                type="text"
                name="address"
                placeholder="Shipping Address"
                value={data[1]?.singleAddress}
              />
            </div>
            <div className={Styles.input_field}>
              <label htmlFor="">First Name</label>
              <input type="text" name="firstName" placeholder="First Name" />
            </div>
            <div className={Styles.input_field}>
              <label htmlFor="">Last Name</label>
              <input type="text" name="lastName" placeholder="Last Name" />
            </div>
            <div className={Styles.input_field}>
              <label htmlFor="">Shipping Address</label>
              <input
                type="text"
                name="Shipping_Address"
                placeholder="Shipping Address"
              />
            </div>
            <div className={Styles.input_field}>
              <label htmlFor="">Number</label>
              <input
                type="text"
                name="Shipping_Address_2"
                placeholder="Shipping Address 2"
              />
            </div>
            <div className={Styles.input_field}>
              <label htmlFor="">Email</label>
              <input
                type="text"
                name="Shipping_City"
                placeholder="Shipping City"
              />
            </div>

            <h3>Estimate Details</h3>
            <div className={Styles.input_field}>
              <label htmlFor="">Customization</label>
              <input
                type="text"
                name="customization"
                placeholder="Customization"
              />
            </div>

            <div className={Styles.input_field}>
              <label htmlFor="">Quantity</label>
              <input type="text" name="quantity" placeholder="Quantity" />
            </div>
            <div className={Styles.input_field}>
              <label htmlFor="">Title</label>
              <input type="text" name="title" placeholder="Title" />
            </div>
            <div className={Styles.input_field}>
              <label htmlFor="">Price</label>
              <input type="text" name="price" placeholder="Price" />
            </div>

            <div className={Styles.input_field}>
              <label htmlFor="">Leave a Remark</label>

              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                placeholder="Write a Message..."
              ></textarea>
            </div>

            <div className={Styles.input_field_button}>
              <button type="button">Add Comment</button>

              <>
                <button
                  type="button"
                  onClick={() => router.push('/super-admin/orders')}
                >
                  Go Back
                </button>
              </>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default slug
