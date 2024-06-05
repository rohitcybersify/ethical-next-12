import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Image from 'next/image';
import images from '../../constants/images';
import styles from './logoSlider.module.css'

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 6,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};
function ImageElement({ imgUrl, altImg }) {

  console.log(imgUrl, 'imgUrl')
  return (
    <>
      <div>
        <Image src={imgUrl} alt={altImg} width={280} height={90} />
      </div>
    </>
  );
}
function SliderSection({data}) {
  console.log(data,"aaa222")
  return (
    <div className={styles.slider_container}>
      <Carousel
        swipeable={true}
        draggable={true}
        showDots={true}
        responsive={responsive}
        ssr={false}
        infinite={true}
        autoPlay
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
        {data?.data.map((res)=>
        <ImageElement imgUrl={res?.image}  />
        )}
       
      </Carousel>
    </div>
  );
}

export default SliderSection;
