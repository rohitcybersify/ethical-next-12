import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Image from 'next/image';
import images from '../../../constants/images';
import styles from '../Additional_Services/Additional.module.css'
import Link from 'next/link';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
function AdditionalCard({ imgUrl, altImg, heading ,paragraph}) {

  console.log(imgUrl, 'imgUrl')
  return (
    <>
      <div className={styles.AdditionalCard}>
        <div className={styles.img_addional}><Image src={imgUrl} alt={altImg} width={280} height={90} /></div>
        <h4>{heading}</h4>
        <p>{paragraph}</p>
      </div>
    </>
  );
}
const Additional_services=({data})=> {
  console.log(data,"qqq")
  return (
    <div className={styles.slider_container}>
      <div className={styles.Additonal_content}>
      <h2 className={styles.additional_heading}>Additional <b>Services</b></h2>
      <Carousel
        swipeable={true}
        draggable={true}
        showDots={true}
        responsive={responsive}
        ssr={false}
        infinite={true}
        autoPlay={false}
        autoPlaySpeed={5000}
        arrows={false}
        keyBoardControl={true}
        customTransition="all .5s"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={['tablet', 'mobile']}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        slidesToSlide={1}
      >
        {data?.map((res)=>
          <AdditionalCard imgUrl={res?.image} heading={res?.title} paragraph={res?.description} />

        )}

        {/* <AdditionalCard imgUrl={images.ManagementImg} heading={"Effortless Inventory Management"} paragraph={"Say goodbye to cluttered offices and logistical headaches with Ethical Swag's seamless inventory management solutions."} />

        <AdditionalCard imgUrl={images.ShippingImg} heading={"Shipping"} paragraph={"Due to the current global challenges, freight costs are fluctuating daily and we are able to quote your shipping for estimate purposes only. You will be charged according to the actual shipping costs at the time of fulfillment."} />

        <AdditionalCard imgUrl={images.fullfillmentImg} heading={"Complete Swag Fulfillment Solutions"} paragraph={"Ethical Swag provides a suite of turn-key services designed with convenience in mind to streamline your swag management process and elevate your brand presence. "} /> */}
      
      </Carousel>
      <Link href='/services'>
      <button className='btn_global'>Learn More</button>
      </Link>
      </div>
    </div>
  );
}

export default Additional_services;
