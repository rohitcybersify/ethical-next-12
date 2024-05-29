'use client'
import React from 'react'
import EthicalLogo from '../../assets/headerPics/ethical_logo.svg'
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Link,
} from '@react-pdf/renderer'
const styles = StyleSheet.create({
  page: {
    width: '100%',
    boxSizing: 'border-box',
  },
  Prouct_img: {
    borderRadius: '10',
  },
  logiImg: {
    marginTop: '20',
    marginBottom: '30',
    textAlign: 'center',
    width: '100%',
    maxWidth: '150',
    overflow: 'hidden',
    Object: 'contain',
  },
  imgg: {
    width: '100%',
    maxWidth: '70',
    overflow: 'hidden',
    Object: 'contain',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  main_pdfLogo: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    textAlign: 'left',
  },
  Total_prize: {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'end',
    width: '100%',
  },
  heading_text: {
    textAlign: 'center',
    fontSize: '12',
    fontWeight: 'normal',
    marginBottom: 10,
  },
  total_Description: {
    fontSize: '14',
    fontWeight: 'bold',
    marginTop: '10',
    textAlign: 'right',
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flexStart',
    marginBottom: 10,
  },
  pdf_wrapper: {
    textAlign: 'left',
    fontSize: '12',
    fontWeight: 'normal',
    maxWidth: '800',
    lineHeight: '1.4',
    letterSpacing: '.8',
    // marginBottom: 10,
  },
  listItemIcon: {
    width: 4, // Adjust width as per your requirement
    height: 4, // Adjust height as per your requirement
    marginRight: 3,
    marginTop: 4,
    // backgroundImage: `url(${pngImageData})`,
    // backgroundSize: 'cover',
    // backgroundRepeat: 'no-repeat',
    backgroundColor: '#000',
    borderRadius: '10',
  },
  pdf_wrapper_heading: {
    textAlign: 'left',
    fontSize: '14',
    fontWeight: 'normal',
    width: '100%',
    maxWidth: '300',
    lineHeight: '1.2',
    marginTop: '0',
    letterSpacing: -0.4,
    color: '#222222',
    fontWeight: '300',
    display: 'block',
  },
  bottom_content: {
    backgroundColor: '#FAFAFA',
    width: '100%',
    padding: '20 10 10',
    // marginTop:'146',
    position: 'absolute',
    bottom: '0',
    left: '0',
    right: '0',
  },
  top_headercontent: {
    backgroundColor: '#FAFAFA',
    width: '100%',
    padding: '30 50 30',
    paddingTop: '10',
  },
  bulk_proucts: {
    padding: '30 50 30',
    paddingTop: '10',
  },
  heading_wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '20',
    marginTop: '40',
    fontSize: '16',
  },
  disc_wrap: {
    width: '5',
    height: '5',
    backgroundColor: '#000',
  },
  pdfafter_wrapper: {
    textAlign: 'center',
    fontSize: '9',
    fontWeight: 'normal',
    marginBottom: 10,
    maxWidth: '800',
    listStyle: 'disc',
  },
  pdfafter_wrapper_1: {
    textAlign: 'center',
    fontSize: '9',
    fontWeight: 'normal',
    marginBottom: 10,
    maxWidth: '800',
    listStyle: 'disc',
  },
  pdfbottom_content: {
    textAlign: 'left',
    fontSize: '12',
    fontWeight: 'normal',
    marginBottom: 10,
    marginTop: '10',
    lineHeight: '22',
  },
  product_content: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '20',
    marginTop: '20',
  },
  content_wrap: {
    textAlign: 'left',
    fontSize: '12',
    fontWeight: 'normal',
  },
  content_wrapDescription: {
    textAlign: 'left',
    fontSize: '10',
    marginTop: '5',
    fontWeight: '500',
  },
  content_wrapDescriptionPrice: {
    textAlign: 'right',
    fontSize: '12',
    marginTop: '10',
    fontWeight: '500',
    width: '380',
    display: 'flex',
    alignItems: 'flexEnd',
  },
  content_wrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flexStart',
    marginTop: '20px',
    gap: '15px',
  },
  content_wrap_title: {
    textAlign: 'left',
    fontSize: '10',
    fontWeight: 'normal',
    paddingRight: '10px',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  Product_pdf: {
    flexDirection: 'row',
    alignItems: 'flexStart',
    marginTop: 15,
    marginBottom: 6,
    gap: 20,
    border: '1 solid #E7E7E7',
    padding: '15 10 10 10',
    borderRadius: '5',
  },
})

const Card = ({ cartItems, totalCartPrice }) => {
  const dateObj = new Date()
  const options = {
    weekday: 'short',
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }
  const formattedDate = dateObj.toLocaleDateString('en-US', options)
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <View style={styles.top_headercontent}>
            <View style={styles.main_pdfLogo}>
              <Image
                src="https://test.cybersify.tech/Eswag/storage/app/public/images/logo_img_new.png"
                style={styles.logiImg}
              />
            </View>
            <View style={styles.listItem}>
              <View style={styles.listItemIcon}></View>
              <Text style={styles.pdf_wrapper}>
                Prices described in this estimate don't include taxes, duties
                (when applicable), and shipping.
              </Text>
            </View>
            <View style={styles.listItem}>
              <View style={styles.listItemIcon}></View>
              <Text style={styles.pdf_wrapper}>
                Shipping to one or multiple locations will be estimated by our
                team when after you let us you know the shipping addresses. You
                will be billed according to the price practiced at the time of
                shipping.
              </Text>
            </View>
            <View style={styles.listItem}>
              <View style={styles.listItemIcon}></View>
              <Text style={styles.pdf_wrapper}>
                {' '}
                Changes on the decoration methods will incur in price
                alterations in the estimate.
              </Text>
            </View>
            <View style={styles.listItem}>
              <View style={styles.listItemIcon}></View>
              <Text style={styles.pdf_wrapper}>
                {' '}
                Inventory availability cannot be guaranteed until order payment
                is made.
              </Text>
            </View>
            <View style={styles.listItem}>
              <View style={styles.listItemIcon}></View>
              <Text style={styles.pdf_wrapper}>
                {' '}
                If the product selected isn't available we will find a similar
                product to replace it.
              </Text>
            </View>
          </View>

          <View style={styles.bulk_proucts}>
            <Text style={styles.heading_wrapper}>Bulk Estimate</Text>
            {cartItems &&
              cartItems?.map((item) => (
                <View style={styles.Product_pdf}>
                  <View style={styles.Prouct_img}>
                    <Image
                      style={styles.imgg}
                      src={item?.image}
                      width={40}
                      height={40}
                    />
                  </View>
                  <View>
                    <View style={styles.pdf_wrapper_heading}>
                      <Text>{item?.heading}</Text>
                    </View>
                    <Text style={styles.content_wrapDescription}>
                      Colours : {item?.colours}
                    </Text>
                    <Text style={styles.content_wrapDescription}>
                      Quantity : {item?.quantity}
                    </Text>

                    <Text style={styles.content_wrapDescription}>
                      Customization :{' '}
                      {item?.customization === null
                        ? 'No Decoration'
                        : JSON.parse(item.customization.key.decoration_type)}
                    </Text>
                    <Text style={styles.content_wrapDescriptionPrice}>
                      Starting Price : ${item?.pricePerUnit}
                    </Text>
                  </View>
                </View>
              ))}
            <View style={styles.Total_prize}>
              <Text style={styles.total_Description}>
                Total Price : ${totalCartPrice.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.bottom_content}>
          <Text style={styles.pdfafter_wrapper_1}>
            Reach out to our team if you need any help
          </Text>
          <Text style={styles.pdfafter_wrapper}>
            Email: orders@ethicalswag.com | Phone: 1-877-256-6998
          </Text>
          <Text style={styles.pdfafter_wrapper}>
            Generated on: {formattedDate}
          </Text>
        </View>
      </Page>
    </Document>
  )
}
export default Card
