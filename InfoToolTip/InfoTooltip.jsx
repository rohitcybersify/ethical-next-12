import Styles from '../EmojiModal/EmojiModal.module.css'
import { RxCross1 } from 'react-icons/rx'
const InfoToolTip = ({ setCondtion, setOpenPopUp, heading }) => {
  return (
    <>
      <div className={Styles.container_overlay}>
        <div className={Styles.popup}>
          <div className={Styles.headingContainer}>
            <h2>{heading}</h2>
            <RxCross1 cursor="pointer" onClick={() => setOpenPopUp('')} />
          </div>
          <div className="">
            {setCondtion === 'quantity' && (
              <>
                <div className={Styles.info}>
                  <p>
                    We label our products with emojis to help you find those
                    that best align with your company values. Below is the guide
                    so you can best understand what they mean.
                  </p>
                  <p>
                    We label our products with emojis to help you find those
                    that best align with your company values. Below is the guide
                    so you can best understand what they mean.
                  </p>
                  <p>
                    We label our products with emojis to help you find those
                    that best align with your company values. Below is the guide
                    so you can best understand what they mean.
                  </p>
                </div>
              </>
            )}
            {setCondtion === 'color' && (
              <>
                <div className={Styles.info}>
                  <p>
                    Pick which colour option you would like for this product.
                  </p>
                </div>
              </>
            )}
            {setCondtion === 'customization' && (
              <>
                <div className={Styles.info}>
                  <p>
                    Pick how you would like the product decorated. Some of the
                    most popular options include:
                  </p>
                  <p>
                    Screen Printing: This method involves applying ink directly
                    onto the surface of a product through a mesh screen. It's
                    ideal for decorating apparel and large quantities of
                    promotional items due to its cost-effectiveness for larger
                    runs.
                  </p>
                  <p>
                    Embroidery: Using thread to stitch a design directly into
                    fabric, embroidery is commonly used for caps, polos,
                    jackets, and bags. It offers a high-quality and durable
                    finish that elevates the perceived value of the swag.
                  </p>
                  <p>
                    Heat Transfer: This method involves printing a design onto
                    special paper and then using heat and pressure to transfer
                    the ink onto the product. Heat transfers are great for
                    full-color images on t-shirts and other fabrics.
                  </p>
                  <p>
                    Sublimation: A process where ink is turned into gas through
                    heat and infused directly into a product’s material. It
                    works best on polyester fabrics and is excellent for
                    producing vibrant, full-color images that cover large areas.
                  </p>
                  <p>
                    Laser Engraving: This method uses lasers to etch a design
                    into the surface of an item. Commonly used on metal, glass,
                    and wood, laser engraving offers a sophisticated,
                    long-lasting result.
                  </p>
                  <p>
                    Pad Printing: Ideal for decorating items that are difficult
                    to print on due to their shape, such as pens and golf balls.
                    It involves transferring ink from a silicone pad to the
                    item, allowing precise and detailed imagery on uneven
                    surfaces.
                  </p>
                  <p>
                    Digital Printing: Similar to your standard inkjet or laser
                    printer, digital printing allows for high-detail, full-color
                    graphics on a variety of materials. It's versatile and good
                    for small to medium-sized orders.
                  </p>
                  <p>
                    Each method has its own set of advantages, and the choice
                    often depends on the type of product, material, quantity,
                    and the detail required in the artwork.
                  </p>
                </div>
              </>
            )}
            {setCondtion === 'Artwork' && (
              <>
                <div className={Styles.info}>
                  <p>
                    Provide your design or artwork file so we can provide a
                    virtual proof of your product to review. We will need your
                    design in vector format but if you don’t have vector art
                    yet, just submit your estimate request and our team will be
                    in touch.
                  </p>
                </div>
              </>
            )}
            {setCondtion === 'number_unit' && (
              <>
                <div className={Styles.info}>
                  <p>
                    Let us know how many items you want to order. The pricing
                    will adjust based on the quantity you enter. If you’d like
                    to see the price breaks, click on the “Price Break” button.
                  </p>
                </div>
              </>
            )}
            {setCondtion === 'production_time' && (
              <>
                <div className={Styles.Production_time}>
                  <p>
                    If you need your products in a rush (less than 20 business
                    days), make sure you shop our “Swift Swag” collection and
                    let us know you need Swift Swag service when you submit your
                    estimate request. Otherwise, standard production times are
                    around 20 business days. Our team will coordinate with you
                    regarding your “in hands date” to make sure you get your
                    swag on time.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default InfoToolTip
