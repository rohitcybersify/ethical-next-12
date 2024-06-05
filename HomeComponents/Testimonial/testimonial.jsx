import React, { useRef } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import styles from '../Testimonial/testimonial.module.css'
import { FaStar } from "react-icons/fa6";
import images from '../../../constants/images'
import Image from 'next/image';
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
  },
  tablet: {
    breakpoint: { max: 1024, min: 767 },
    items: 3,
  },
  mobile_horizontel: {
    breakpoint: { max: 767, min: 576 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 576, min: 0 },
    items: 1,
  },
};
function TesimoanialCard({heading ,paragraph, subheading, timing}) {
  
  return (
    <>
      <div className={styles.Testimonail_card}>
        
        <div className={styles.start_icons}><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></div>

        <p className={styles.main_para}>{paragraph}</p>
        <h3>{heading}</h3>
        <h4>{subheading}</h4>
        <p className={styles.timing}>{timing}</p>
        
      </div>
    </>
  );
}
const Tesimoanial=({data})=> {
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
  return (
    <section className='container'>
      <div className='Testimonail_wraaper'>
    <div className={styles.testimoanilSec}>
      <div className={styles.testimoanilContent}>
      <div>
      <p>{data?.data?.title}</p>
      <h2 className={styles.additional_heading}>{data?.data?.sub_title?.slice(0,8)} <b>{data?.data?.sub_title?.slice(8,20)}</b></h2>
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
        {data?.client_data?.map((res)=>
        <div className={styles.testimonail_sec}><TesimoanialCard  heading={res?.heading} paragraph={res?.paragraph} subheading={res?.sub_heading} timing={res?.timing} /></div>
        )}
      
      </Carousel>
      </div>
    </div>
    </div>
    </section>
  );
}

export default Tesimoanial;
