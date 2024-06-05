import React, { useRef } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
// import styles from '../../components/HomeComponents/Testimonial/testimonial.module.css'
// import styles from '../../components/aboutslider/aboutslider.module.css''
import styles from '../../components/about/aboutslider.module.css'
import { FaStar } from "react-icons/fa6";
import { useMediaQuery } from '@mui/material';
import images from '../../constants/images';
import Image from "next/image"
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 2,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 767 },
    items: 1,
  },
  mobile_horizontel: {
    breakpoint: { max: 767, min: 576 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 576, min: 0 },
    items: 1,
  },
};
function AboutsliderCard({data}) {
    const isAbove767px = useMediaQuery('(min-width:769px)');
  return (
    <>
    {isAbove767px ?
      <div className={styles.Testimonail_card}>
        <div className="d-flex gap-1 justify-content-center w-full">
        <div className="gap-3 d-flex flex-column w-full">
            <div className={styles.teammates}>
            <div className={styles.teammate_img}><Image src={images?.AlisonImg} /></div>
            <h4>
            Alison Beierlein
            </h4>
            <p className={styles.Teammate_profession}>Operations Manager</p>
            <span className={styles.Teammate_Place}>Pemberton</span>
            </div>
       
            <div className={styles.teammates}>
            <div className={styles.teammate_img}><Image src={images?.AlisonImg} /></div>
            <h4>
            Alison Beierlein
            </h4>
            <p className={styles.Teammate_profession}>Operations Manager</p>
            <span className={styles.Teammate_Place}>Pemberton</span>
            </div>
        </div>
        <div className="gap-3 d-flex flex-column w-full">
        <div className={styles.teammates}>
           <div className={styles.teammate_img}> <Image src={images?.AlisonImg} /></div>
            <h4>
            Alison Beierlein
            </h4>
            <p className={styles.Teammate_profession}>Operations Manager</p>
            <span className={styles.Teammate_Place}>Pemberton</span>
            </div>
            <div className={styles.teammates}>
           <div className={styles.teammate_img}> <Image src={images?.AlisonImg} /></div>
            <h4>
            Alison Beierlein
            </h4>
            <p className={styles.Teammate_profession}>Operations Manager</p>
            <span className={styles.Teammate_Place}>Pemberton</span>
            </div>
        </div>
        </div>
      </div>:
      <div className={styles.Testimonail_card}>
       <div className={styles.teammates}>
       <div className={styles.teammate_img}><Image src={images?.AlisonImg} /></div>
            <h4>
            Alison Beierlein
            </h4>
            <p className={styles.Teammate_profession}>Operations Manager</p>
            <span className={styles.Teammate_Place}>Pemberton</span>
            </div>
      </div>}
    </>
  );
}
const Aboutslider=({data})=> {
  const carouselRef = useRef(null);

  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.next();
    }
  };

  const handlePrevious = () => {
    if (carouselRef.current) {
      carouselRef.current.previous();
    }
  };
  console.log(data?.employee_details,"data?.employee_details")
  return (
    <section className='container'>
      <div className='Testimonail_wraaper'>
    <div className={styles.testimoanilSec}>
      <div className={styles.testimoanilContent}>
      <div>
      <p>{data?.title}</p>
      <h2 className={styles.additional_heading}>{data?.sub_title.slice(0,13)} <b>{data?.sub_title.slice(13,35)}</b></h2>
      <p className={styles.paragraph}>{data?.description}</p>
      <div className=" gap-3 mt-5 d-flex none_display ">
      <button className='Arrow_btn bg_lighArrow' onClick={handlePrevious}>
          <Image src={images.NextArrow} alt='PrevArrow' />
        
        </button>
        <button className='Arrow_btn' onClick={handleNext}>
        <Image src={images.NextArrow} alt='NextArrow' />
  
        </button>
      </div>
      </div>
      <Carousel
        ref={carouselRef}
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
        <div className={styles.testimonail_sec}>
      
        <AboutsliderCard  />
          </div>
      
      </Carousel>
      </div>
    </div>
    </div>
    </section>
  );
}

export default Aboutslider;
