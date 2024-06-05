import React, { useEffect, useState } from 'react'
import certifiedLogo from '../../assets/footerPics/certified.svg'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Link from 'next/link'
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa'
import { FaYoutube } from 'react-icons/fa6'
import banks from '../../assets/footerPics/banks.svg'
import {
  initialValuesNewLetter,
  validationNewsLetter,
} from '../../lib/validationSchemas'
import Image from 'next/image'
import styles from './footer.module.css'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import useFetch from '../../lib/useFetch'

const Footer = () => {
  const country = useSelector((state) => state.country.country)
  const [isButtonClicked, setIsButtonClicked] = useState(false)
  const router = useRouter()

  const [loadQuery, { response, loading, error }] = useFetch(
    `/newsletter`,
    {
      method: 'post',
    },
    'formdata'
  )

  const onSubmit = async (values) => {
    try {
      setIsButtonClicked(true)
      let formData = new FormData()
      const data = {
        email: values.email,
      }
      formData.append('email', values.email)
      loadQuery(data)
      values.email = ''
    } catch (error) {
      setIsButtonClicked(false)
      return
    }
  }

  useEffect(() => {
    if (response) {
      setIsButtonClicked(false)
      toast.success(response?.message, {
        position: 'top-center',
        autoClose: 1500,
      })
    } else if (error) {
      return
    }
  }, [response, error])

  return (
    <div className={styles.footer_section}>
      <div className={styles.footer_container}>
        <div className={styles.main_footer_container}>
          <div className={styles.container_column_1}>
            <div className="">
              <Image
                src={certifiedLogo}
                height={135}
                width={80}
                alt="certified corporation logo"
              />
            </div>
            <div className={styles.heading_footer}>
              We are formally committed to donate more than 20% of profits to
              charity each year.
            </div>
            <Formik
              initialValues={initialValuesNewLetter}
              validationSchema={validationNewsLetter}
              onSubmit={onSubmit}
            >
              {({ values, error, resetForm }) => (
                <>
                  <Form>
                    <div className={styles.inputContainer}>
                      <div>
                        <Field
                          type="text"
                          id="email_Newsletter"
                          name="email"
                          placeholder="Join Our Newsletter"
                          autoComplete="off"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className={styles.error}
                        />
                      </div>

                      <button type="submit" disabled={isButtonClicked === true}>
                        {isButtonClicked ? 'Sending...' : 'Send'}
                      </button>
                    </div>
                  </Form>
                </>
              )}
            </Formik>

            <div className={styles.social_links}>
              <a href="https://www.facebook.com/ethicalswag" target="_blank">
                <FaFacebookF />
              </a>
              <a
                href="https://www.linkedin.com/company/ethical-swag/"
                target="_blank"
              >
                <FaLinkedinIn />
              </a>
              {/* <a href="https://www.instagram.com/ethicalswag/" target="_blank">
                <FaInstagram />
              </a> */}
              <a
                href="https://www.youtube.com/channel/UCLQe2_4Tf2k8BOsgM8bWOjA"
                target="_blank"
              >
                <FaYoutube />
              </a>
            </div>
          </div>
          <div className={styles.container_column_2}>
            <div className={styles.heading_footer_2}>Quick Links</div>
            <div className="">
              <span
                className={styles.footer_li}
                style={{ cursor: 'pointer' }}
                onClick={() => router.push('/category/apparel')}
              >
                Swag Packs
              </span>
            </div>
            <div className="">
              <span
                className={styles.footer_li}
                style={{ cursor: 'pointer' }}
                onClick={() => router.push('/about-us')}
              >
                About
              </span>
            </div>
            <div className="">
              <span
                className={styles.footer_li}
                style={{ cursor: 'pointer' }}
                onClick={() => router.push('/blogs/articles')}
              >
                Blogs
              </span>
            </div>
            <div className="">
              <span
                className={styles.footer_li}
                style={{ cursor: 'pointer' }}
                onClick={() => router.push('/services')}
              >
                Services
              </span>
            </div>
            <div className="">
              <span
                className={styles.footer_li}
                style={{ cursor: 'pointer' }}
                onClick={() => router.push('/how-to-order')}
              >
                What to Expect
              </span>
            </div>
            <div className="">
              <span
                className={styles.footer_li}
                style={{ cursor: 'pointer' }}
                onClick={() => router.push('/contact')}
              >
                Contact
              </span>
            </div>
            <div className="">
              <span
                className={styles.footer_li}
                style={{ cursor: 'pointer' }}
                onClick={() => router.push('/privacy-policy')}
              >
                Privacy Policy
              </span>
            </div>
          </div>
          <div className={styles.container_column_3}>
            <div className={styles.column_1}>
              <div className={styles.heading_footer_2}>Customer Support</div>
              <div className="">
                <span
                  className={styles.footer_li}
                  style={{ cursor: 'pointer' }}
                  onClick={() => router.push('/faq')}
                >
                  Frequently Asked Questions
                </span>
              </div>
              <div>
                <span
                  className={styles.footer_li}
                  style={{ cursor: 'pointer' }}
                  onClick={() => router.push('/terms-of-service')}
                >
                  Terms of Service
                </span>
              </div>
              <div>
                <span
                  className={styles.footer_li}
                  style={{ cursor: 'pointer' }}
                  onClick={() => router.push('/privacy-policy')}
                >
                  Privacy Policy
                </span>
              </div>
            </div>
            <div className={styles.column_2}>
              <div className={styles.heading_footer_2}>Reach Out</div>
              <div className={styles.footer_li}>
                <Link
                  href="mailto:info+swagpackca@ethicalswag.com"
                  target="_blank"
                  style={{ textTransform: 'lowercase' }}
                >
                  info@ethicalswag.com
                </Link>
              </div>
              <div>
                <a className={styles.footer_li} href="tel:1-877-206-6998">
                  1-877-206-6998
                </a>
              </div>
              <div>
                <a className={styles.footer_li} href="tel:1-902-500-1086">
                  1-902-500-1086
                </a>
              </div>
            </div>
          </div>
          <div className={styles.container_column_4}>
            <div className={styles.column_4_1st_part}>
              <div className={styles.heading_footer_2}>Sustainability</div>
              <div>
                <span
                  className={styles.footer_li}
                  style={{ cursor: 'pointer' }}
                  onClick={() => router.push('/faq')}
                >
                  Frequently Asked Questions
                </span>
              </div>
              <div>
                <span
                  className={styles.footer_li}
                  style={{ cursor: 'pointer' }}
                  onClick={() => router.push('/terms-of-service')}
                >
                  Terms of Service
                </span>
              </div>
              <div className="">
                <span
                  className={styles.footer_li}
                  style={{ cursor: 'pointer' }}
                  onClick={() => router.push('/privacy-policy')}
                >
                  Privacy Policy
                </span>
              </div>
            </div>
            <div className={styles.column_4_2nd_part}>
              <div className={styles.heading_footer_2}>Resources</div>
              <div className="">
                <span
                  className={styles.footer_li}
                  style={{ cursor: 'pointer' }}
                  onClick={() => router.push('/how-to-order')}
                >
                  How to Order
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.horizontal_line_container}>
          <hr className={styles.horizontal_line} />
        </div>
        <div className={styles.banks_main_container}>
          <div className={styles.banks_main_container_left}>
            © 2024 Ethical Swag | {country === 'canada' ? 'Canada' : 'USA'}
          </div>
          <div className={styles.banks_main_container_right}>
            We accept credit cards
            <Image src={banks} alt="bank logo" width={228} height={30} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
