import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import PrimaryHeader from '../../components/primary-header/PrimaryHeader'
import SecondaryHeader from '../../components/secondary-header/SecondaryHeader'
import Footer from '../../components/footer/Footer'
import InnerBanner from '../../components/InnerBanner/InnerBanner'
import SliderSection from '../../components/slider/SliderSection'
import SustainableChoices from '../../components/AboutComoponent/SustainableChoices/SustainableChoices'
import Kindofbusiness from '../../components/AboutComoponent/KindBusiness/KindBusiness'
import styles from '../../pages/about-us/about.module.css'
import images from '../../constants/images'
import Membership from '../../components/AboutComoponent/Membership/Membership'
import Styles from '../../styles/category.module.css'
import Image from 'next/image'
import {
  setCollectionForUrl,
} from '../../redux-setup/categorySlice'
import Slider1 from '../../components/about/aboutslider'

const About = () => {

  const baseUrl = "https://ethical3.s3.ca-central-1.amazonaws.com/images/"
  const data = {
    sponsor: {
      data: [
        {
          image: `${baseUrl}Google_img.png`
        },
        {
          image: `${baseUrl}Greenpeace_img.png`
        },
        {
          image: `${baseUrl}Microsoft_img.png`
        },
        {
          image: `${baseUrl}Nespresso_img.png`
        },
        {
          image: `${baseUrl}Stanford_img.png`
        },
      ]
    },
    inner_banner_title: {
      title: " About Us",
      image:`${baseUrl}jpeg-optimizer_About_UsBanner.jpg`
    },
    sustainable_choices_data: {
      image: `${baseUrl}jpeg-optimizer_SustainableImg.png`,
      // second_image
      title: "Making It EASY To Make Sustainable Choices",
      description: {
        des1: "You will find a curated selection of items on our site, but not too much!",
        des2: "We source well-designed, sustainable goods including products sourced from recycled, organic, and biodegradable content.",
        des3: "Align your product selection with your company values - such as Certified B Corp products, companies with give-back programs, supporting women-owned or LGBTQ2+ friendly suppliers and more.",
        des4: "We have selected the products with care for quality, value and all the things that are important to you. We stand behind what we sell and are always looking for new and innovative products to add to our tried and true staples we know you love."
      }
    },
    kind_bussiness: {
      image: `${baseUrl}jpeg-optimizer_RecognizingTeam.jpeg`,
      title: "Building A Different Kind Of Business",
      description: {
        des1: "As a Certified B Corp, at Ethical Swag we only work with suppliers that meet our rigorous standards related to social compliance, environmental impact, product safety, supply chain security and product quality.",
        des2: "We measure and offset our carbon footprint and embody the principles of sustainability in every aspect of our operations.",
        des3: "We want to meet you where you are, no judgment. We offer a good/better/best approach to sourcing products to ensure there are options, no matter what your budget, and are happy to share with you the criteria for product selection..",
        des4: "The dollars you invest in swag become a force for good with positive ripple effects along the supply chain. Launching in 2024, our ESG impact reporting will break it all down for you. See how you can make a difference with Ethical Swag."
      }
    },
    employee: {
      title: "Our Team",
      sub_title: "Want To Put A Face To The Name?",
      description: "Meet the Humans Behind Ethical Swag Our team is here to support you with your swag project every step along the way.",
      employee_details: [
        {
          image:`${baseUrl}Alison.png`,
          name: 'Alison Beierlein',
          job_profile: "Operations Manager",
          city: "Pemberton"
        },
        {
          image: `${baseUrl}Amy.png`,
          name: 'Amy Gardiner',
          job_profile: "Graphic Designer",
          city: "Ontario, Canada"
        },
        {
          image: `${baseUrl}Ellie.png`,
          name: 'ELLIE',
          job_profile: "Key Account Manager",
          city: "North Vancouver, BC"
        },
        {
          image: `${baseUrl}Lisa Langdale.png`,
          name: 'Lisa Langdale',
          job_profile: "Production Assistant",
          city: "Pemberton"
        },
        {
          image:`${baseUrl}Elizabeth.png`,
          name: 'Elizabeth Moraa Mirera',
          job_profile: "Production Assistant",
          city: "Nairobi, Kenya"
        },
        {
          image: `${baseUrl}Tara.png`,
          name: 'Tara Milburn',
          job_profile: "CEO",
          city: "Sydney, Ns"
        },
        {
          image: `${baseUrl}alice.png`,
          name: 'Alice Obaga',
          job_profile: "Administrative Assistant",
          city: "Nairoby, Kenya"
        },
        {
          image: `${baseUrl}Deb MacPherson.png`,
          name: 'Deb MacPherson',
          job_profile: "Procurement Specialist",
          city: "Sydney, Cape Breton NS"
        },
        {
          image: `${baseUrl}Kelly Ann Leng.png`,
          name: 'Kelly Ann Leng',
          job_profile: "Fulfillment Coordinator",
          city: "Sydnet, NS, Canada"
        },
        {
          image: `${baseUrl}John Paul Bruzula.png`,
          name: 'John Paul Bruzula',
          job_profile: "Procurement Specialist",
          city: "Mabalacat City, Pampanga"
        },
        {
          image: `${baseUrl}Torsa Jamil.png`,
          name: 'Torsa Jamil',
          job_profile: "Production Assistant",
          city: "Halifax, NS"
        },
      ]
    },
    commitment: {
      image:"../../assets/certifiy_corp.webp",
      title: "Commitment",
      sub_title: "Our Mission",
      description: "Ethical Swag is in the business of significantly improving other people's lives. The way we do that is to work with partners who put people and planet first, paying fair wages and taking care of the footprint left behind."
    },
    Swag_partner: {
      title: "A Swag Partner You Can Trust",
      description1: "We understand that your reputation is on the line. Your customized swag needs to showcase your brand. That is why we put so much care into every aspect of your project, from ensuring your artwork meets our design criteria, to cross-checking shipping details, to following up to make sure you were happy with your products. Our dedicated, and experienced team members go above and beyond to make sure our clients’ projects are a success.",
      description2: " Our custom platform plays a big role in this mission. To provide you with peace of mind, Ethical Swag’s website, client portals, and information security protocols are ISO 27001 compliant, meaning your information is protected following internationally recognized best practices.",
      first_card_title: "Annual Information Security Awareness Training",
      first_card_des: "To keep our staff in the know about best practices",
      second_card_title: "Annual Information Security Awareness Training",
      second_card_des: "To keep our staff in the know about best practices",
      third_card_title: "World-Class Support",
      third_card_des: "Ethical Swag retains information security experts to guide our senior management as needed",
      woman_owned_count: "100%",
      active_product_count: "1200",
      client_satisfaction_rate_count: "98%"
    },

    awards_nominations: {
      title: "Awards & Nominations",
      description: "As we grow as a company our impact on our communities and industry is being recognized by clients, users, and institutions.",
      image:`${baseUrl}award_img.7c48b063.svg`
      // image: images.AwardsImg
    },
    membership:{
      title:"All Certifications & <b>Memberships</b>",
      description:"We started Ethical Swag to give you trusted, easy to find options that best reflect your brand values. It's hard to know when green washing is going on - we get it.<br></br>As a Certified B Corp, we are continually audited to a global sustainability standard so that you can trust us. It's important because it's not what you say, but what you do, that matters.<br></br> We have built into our DNA a focus on people, planet and profit. We have set out to be wildly successful, so we can use that success to have an impact on our staff, our clients, our communities and our world. We invite you to be a part of that",
      card:[
        {
          image:`${baseUrl}jpeg-optimizer_Pledge.webp`,
          heading:"Pledge 1%",
          paragraph:"Ethical Swag is a proud contributor to the PLEDGE 1% Movement, an initiative that inspires, educates, and empowers."
        },
        {
          image:`${baseUrl}jpeg-optimizer_WomenBusiness.webp`,
          heading:"Women Business Enterprises Canada Council (WBE Canada)",
          paragraph:"Ethical Swag is a certified Women Business Enterprise - a way to connect with procurement opportunities to helps corporations & governments to deliver on their supplier diversity commitments."
        },
        {
          image:`${baseUrl}jpeg-optimizer_CertifiedB.webp`,
          heading:"Certified B Corporation",
          paragraph:"B Corp Certification is a designation that a business is meeting high standards of verified performance, accountability."
        },
        {
          image:`${baseUrl}jpeg-optimizer_Bonneville.webp`,
          heading:"Bonneville environmental foundation",
          paragraph:"BEF is a non-profit organization that markets green power products to public utilities, businesses, government agencies."
        },
      ]
    },
    canada_awards:{
      title:"2022 - <b>WBE Canada excellence awards </b> AWARDS  - WBE rising start finalist",
      image:`${baseUrl}jpeg-optimizer_2022.png`
    },
    _2021_winners:{
      title:"2021 - Winner: <b>Technopreneure </b>of the year award",
      image:`${baseUrl}jpeg-optimizer_2021.jpeg`
      // image:images.aboutAwards_Img
    },
    _2021_awards:{
      title:"2021 - <b>Beyond borders exporter </b> of the year award",
      image:`${baseUrl}award_img.7c48b063.svg`
    }

  }

console.log(data?.canada_awards?.image,"canada_awards")
  const router = useRouter()
  const dispatch = useDispatch()
  const [relatedCategories, setRelatedCategories] = useState([])
  const allCategories = useSelector((state) => state.category.allCategories)
  const collectionForUrl = useSelector(
    (state) => state.category.collectionForUrl
  )
  console.log(relatedCategories, "relatedCategories")
  useEffect(() => {
    const generateRelatedCategories = () => {
      const related =
        allCategories &&
        Object.keys(allCategories).filter(
          (category) => (category === collectionForUrl, 'category')
        )
      if (related.length > 2) {
        const randomIndices = []
        while (randomIndices.length < 2) {
          const randomIndex = Math.floor(Math.random() * related.length)
          if (!randomIndices.includes(randomIndex)) {
            randomIndices.push(randomIndex)
          }
        }
        setRelatedCategories(randomIndices.map((index) => related[index]))
      } else {
        setRelatedCategories(related)
      }
    }

    generateRelatedCategories()
  }, [collectionForUrl, allCategories])

  const handlePush = (data) => {
    router.push(`/category/${data}?cat_id=${allCategories[data]?.airtabelId}`)
    dispatch(setCollectionForUrl(data))
    // dispatch(setSubCollectionForUrl(''))
  }
  const backgroundImage1 = data?.commitment?.image ? `url(${data?.commitment?.image})` : 'url(../../assets/certifiy_corp.webp)';
  console.log( data?.commitment?.image,"backgroundImage1")
  return (
    <>
      <PrimaryHeader />
      <SecondaryHeader />
      <InnerBanner data={data?.inner_banner_title} />
      <SliderSection data={data?.sponsor}/>
      <SustainableChoices data={data?.sustainable_choices_data} />
      <Kindofbusiness data={data?.kind_bussiness} />
      <Slider1 data={data?.employee} />
      <section className='container'>
        <div  className={styles.OurMissionImg}>
          <div className={styles.OurMissionContent}>
            <span className={styles.misionsubheading}>{data?.commitment?.title}</span>
            <h2>{data?.commitment?.sub_title}</h2>
            <p>{data?.commitment?.description}</p>
          </div>
        </div>
      </section>

      <section className='container swag_partner '>
        <div className={styles.Swag_partner}>
          <div className='Text_row align_center'>
            <div className={styles.LeftContent}>
              <div className={styles.Awareness}>
                <span>01</span>
                <h4>{data?.Swag_partner?.first_card_title}</h4>
                <p>{data?.Swag_partner?.first_card_des}</p>
              </div>

              <div className={styles.Awareness}>
                <span>02</span>
                <h4>{data?.Swag_partner?.second_card_title}</h4>
                <p>{data?.Swag_partner?.second_card_des}</p>
              </div>

              <div className={styles.Awareness}>
                <span>03</span>
                <h4>{data?.Swag_partner?.third_card_title}</h4>
                <p>{data?.Swag_partner?.third_card_des}</p>
              </div>

            </div>
            <div className={styles.RightContent}>
              <h2>{data?.Swag_partner?.title.slice(0, 14)} <b>{data?.Swag_partner?.title.slice(14, 30)}</b></h2>
              <p>{data?.Swag_partner?.description1}
                <br></br>
                <br></br>
                {data?.Swag_partner?.description2}
              </p>
              <div className={styles.featuresSec}>
                <div className={styles.featuresDiv}>
                  <h3 className='purple'>{data?.Swag_partner?.woman_owned_count}</h3>
                  <p>Woman Owned</p>
                </div>
                <div className={styles.featuresDiv}>
                  <h3 className='light_blue'>{'>'}{data?.Swag_partner?.active_product_count}</h3>
                  <p>Active Products</p>
                </div>
                <div className={styles.featuresDiv}>
                  <h3 className='Light_pink'>{'>'}{data?.Swag_partner?.client_satisfaction_rate_count}</h3>
                  <p>Client Satisfaction Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Membership data={data?.membership}/>

      <section className={styles.AwardsNominations}>
        <div className='container Text_row align_center'>
          <div className={styles.AwardsNominations_content}>
            <h2>{data?.awards_nominations?.title}</h2>
            <p>{data?.awards_nominations?.description}</p>
          </div>
          <div className={styles.AwardsImg}>
            <Image src={data?.awards_nominations?.image} layout='fill' alt='AwardsImg' />
          </div>
        </div>

      </section>

      <section className={styles.AwardsNominations_wrap}>

        <div className='container Text_row align_center my-5' >
          <div className={styles.AwardsImg}>
         
            <Image src={data?.canada_awards?.image} layout='fill' alt='AwardsImg' />
          {/* </div> */}
          </div>
          <div className={styles.AwardsNominations_content}>
            <h2 dangerouslySetInnerHTML={{ __html: data?.canada_awards?.title }}/>
          </div>

        </div>

      </section>


      <section className={styles.AwardsNominations_wrap}>

        <div className='container Text_row align_center flex-direction my-5'>

          <div className={styles.AwardsNominations_content}>
            <h2  dangerouslySetInnerHTML={{ __html: data?._2021_winners?.title }} />
          </div>

          <div className={styles.AwardsImg}>
            <Image src={data?._2021_winners?.image} layout='fill' alt='AwardsImg' />
          </div>
        </div>

      </section>


      <section className={styles.AwardsNominations_wrap}>

        <div className='container Text_row align_center my-5'>
          <div className={styles.AwardsImg}>
            <Image src={data?._2021_awards?.image} layout='fill' alt='AwardsImg' />
          </div>
          <div className={styles.AwardsNominations_content}>
          <h2  dangerouslySetInnerHTML={{ __html: data?._2021_awards?.title }} />
          </div>

        </div>

      </section>



      <div className={Styles.related_categories}>
        <div className={Styles.content_wrapper}>
          {relatedCategories &&
            relatedCategories.map((data) => (
              <>
                <div className={Styles.img_content_1}>
                  <div className={Styles.imgContent}>
                    <Image
                      src={allCategories[data]?.image}
                      layout="fill"
                      alt="Related Categories"
                    />
                  </div>
                  <div className={Styles.textContent}>
                    <div>
                      <h3 className={Styles.text_capitalize}>{data}</h3>
                    </div>

                    <button onClick={() => handlePush(data)}>Shop Now</button>
                  </div>
                </div>
              </>
            ))}
        </div>
      </div>

      <Footer />
    </>
  )
}

export default About
