import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Image from 'next/image';
import images from '../../../constants/images';
import styles from './Membership.module.css'
import React, { useRef } from 'react';


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
    breakpoint: { max: 1024, min: 600 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 1,
  },
};
const MembershipCard=({ imgUrl, altImg, heading ,paragraph})=> {


  console.log(imgUrl, 'imgUrl')

  
 
  
  return (
    <>
      <div className={styles.MembershipCard}>
        <div className={styles.img_addional}><Image src={imgUrl} alt={altImg} width={280} height={90} /></div>
        <h4>{heading}</h4>
        <p>{paragraph}</p>
      </div>
     
    </>
  );
}
function Membership({data}) {
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
    <div className={styles.membershipsSlider}>
      <div className='Text_row align_center container membershipsSlider'>
      <div className={styles.membershipsContent}>
     <h2 dangerouslySetInnerHTML={{ __html: data?.title }} />
    <p dangerouslySetInnerHTML={{ __html: data?.description }} />
  </div>

      <div> <Carousel
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
        {data?.card.map((res)=>
        <MembershipCard imgUrl={res?.image} heading={res?.heading} paragraph={res?.paragraph} className={styles.single_membership} />
        )}
{/* 
        <MembershipCard imgUrl={images.WomenBusinessImg} heading={"Women Business Enterprises Canada Council (WBE Canada)"} paragraph={"Ethical Swag is a certified Women Business Enterprise - a way to connect with procurement opportunities to helps corporations & governments to deliver on their supplier diversity commitments."} />

        <MembershipCard imgUrl={images.CertifiedBImg} heading={"Certified B Corporation"} paragraph={"B Corp Certification is a designation that a business is meeting high standards of verified performance, accountability."} />

        <MembershipCard imgUrl={images.BonnevilleImg} heading={"Bonneville environmental foundation"} paragraph={"BEF is a non-profit organization that markets green power products to public utilities, businesses, government agencies."} /> */}

    
      
      </Carousel>

      <div className=" gap-3 mt-5 d-flex none_display ">
      <button className='Arrow_btn bg_lighArrow' onClick={handlePrevious}>
          <Image src={images.NextArrow} alt='PrevArrow' />
        
        </button>
        <button className='Arrow_btn' onClick={handleNext}>
        <Image src={images.NextArrow} alt='NextArrow' />
  
        </button>
      </div>
      </div>
    
      </div>
    </div>
  );
}

export default Membership;
