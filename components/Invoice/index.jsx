import React, { useEffect, useState } from 'react'
import images from 'constants/images'
import Image from 'next/image'
import Styles from './invoice.module.css'
import { useRouter } from 'next/router'
const Invoice = ({ data }) => {
  return (
    <div className={Styles.pdf_desgin}>
      <div className={Styles.main_pdfLogo}>
        <Image src={images.EthicalLogo} width={300} height={300} />
      </div>

      <div className={Styles.after_logo}>
        <p>Also please note:</p>
        <br></br>

        <ul>
          <li>
            Prices described in this estimate don't include taxes, duties (when
            applicable), and shipping.
          </li>
          <li>
            Shipping to one or multiple locations will be estimated by our team
            when after you let us you know the shipping addresses. You will be
            billed according to the price practiced at the time of shipping.
          </li>
          <li>
            Changes on the decoration methods will incur in price alterations in
            the estimate.
          </li>
          <li>
            Inventory availability cannot be guaranteed until order payment is
            made
          </li>
          <li>
            If the product selected isn't available we will find a similar
            product to replace it.
          </li>
          <br></br>
          <p>Reach out to our team if you need any help:</p>
          <br></br>
          <p>Email: orders@ethicalswag.com Phone: 1-877-256-6998</p>
          <br></br>
          <p>Generated on: Wed, Mar 06, 24</p>
        </ul>
      </div>

      <div className={Styles.product_secwrapper}>
        <div className={Styles.heading_wrapper}>
          <h2>BULK ESTIMATE</h2>
          <button type="button">Clear cart</button>
        </div>
        <div className={Styles.single_pdfpro}>
          <div className={Styles.product_img}>
            <Image src={images.Product_image} width={200} height={200} />
          </div>
          <div className={Styles.content_wrap}>
            <h4>
              A great "back to school" gift, this 2-in-1 sandwich bag and
              placemat i...
            </h4>
            <p>Price : Starting at $5.47</p>
            <div className={Styles.amountContainer}>100</div>
            <Image src={images.delete_icon} width={20} height={20} />
          </div>
        </div>

        <div className={Styles.single_pdfpro}>
          <div className={Styles.product_img}>
            <Image src={images.Second_proimg} width={200} height={200} />
          </div>
          <div className={Styles.content_wrap}>
            <h4>
              A great "back to school" gift, this 2-in-1 sandwich bag and
              placemat i...
            </h4>
            <p>Price : Starting at $5.47</p>
            <div className={Styles.amountContainer}>100</div>
            <Image src={images.delete_icon} width={20} height={20} />
          </div>
        </div>
      </div>

      <div className={Styles.about_swagsec}>
        <h3>1. Tell us about your Swag Project</h3>
        <div>
          <h4>When do you need this order? *</h4>
          <input type="date" id="birthday" name="birthday" />
        </div>
        <div className={Styles.custom_checkbox}>
          <h4>Swift swag?</h4>
          <input type="checkbox" id="swift_swag" />
          <label htmlFor="swift_swag">
            Checking this box will override the date selected above to within 10
            business days if you have gone through the Swift Swag process.
            Please note additional charges will apply.
          </label>
          <span></span>
        </div>
        <div>
          <h4>Notes about your order:</h4>
          <input type="textarea" placeholder="notes about your order" />
        </div>
        <div>
          <h4>Are you interested in additional services?</h4>
          <div className={Styles.Intersted}>
            <div className={Styles.custom_checkbox}>
              <input type="checkbox" id="swag" />
              <label htmlFor="swag">Swag Pack Kitting</label>
            </div>

            <div className={Styles.custom_checkbox}>
              <input type="checkbox" id="Warehousing" />
              <label htmlFor="Warehousing">Warehousing</label>
            </div>

            <div className={Styles.custom_checkbox}>
              <input type="checkbox" id="Graphic" />
              <label htmlFor="Graphic">Graphic Design</label>
            </div>

            <div className={Styles.custom_checkbox}>
              <input type="checkbox" id="Pick" />
              <label htmlFor="Pick">Pick and Pack</label>
            </div>

            <div className={Styles.custom_checkbox}>
              <input type="checkbox" id="Sure" />
              <label htmlFor="Sure">Not Sure</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Invoice
