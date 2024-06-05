import React,{useState} from 'react';
import Styles from './HeroSection.module.css'; // Import your CSS file
import Router from 'next/router';
function HeroSection({ data }) {
  const [isActiveLoading, isActiveSetLoading] = useState(false)
  const handlePush = (param) =>{
    isActiveSetLoading(true)
    Router.push(param)
  }
    const containerClass = `${Styles.container} ${data?.banner_image ? Styles.banner_image : ''}`;
  // style={{ backgroundImage: `url(${imageUrl})` }}
  return (
    <section className={Styles.banner_image} style={{backgroundImage:`url('${data?.image}')`}}>
      <div className={Styles.content}>
        <h1 className={Styles.banner_heading}>{data?.title}</h1>
        <p className={Styles.banner_paragraph}>{data?.sub_title}</p>
        <button className={Styles.banner_button} disabled={isActiveLoading} onClick={() => {handlePush('/products')}}>{isActiveLoading ? 'Loading...' : 'Shop Now'}</button>
      </div>
    </section>
  );
}
export default HeroSection;
