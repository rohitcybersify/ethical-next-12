import React from 'react';
import 'react-multi-carousel/lib/styles.css';
import Image from 'next/image';
import images from '../../../constants/images';
import styles from '../Handpicked/handpicked.module.css'
import Bucket_root from "../../../utils/cybersifyApi"

const Handpicked=({data})=> {
  console.log(data?.logo_image,"images")
  return (
    <section className='container'>
   <div className={styles.handpicked_sec}>
    <div className={styles.handpickedImg_content}>
        <h2><div className={styles.CertifyProduct1}><Image src={data?.logo_image}  alt='CertifyImg' /></div>{data?.title}</h2>
        <p>{data?.description}</p>
    </div>
    <div className={styles.CertifyProduct}><Image src={data?.card_image} layout='fill' alt='CertifyProduct' /></div>
   </div>
    </section>
  );
}

export default Handpicked;
