import React from 'react'
import { useMediaQuery } from '@mui/material';
import styles from '../../components/about/aboutslider.module.css'
import images from '../../constants/images';
import Image from "next/image"
const AboutsliderCard=({data})=> {
    const isAbove767px = useMediaQuery('(min-width:769px)');
  return (
    <>
    {isAbove767px ?
      <div className={styles.Testimonail_card}>
        <div className="d-flex gap-1 justify-content-center w-full">
        {/* {data?.employee_details.slice(0,4)?.map((res)=> */}
        <div className="gap-3 d-flex flex-column w-full">
            <div className={styles.teammates}>
            <div className={styles.teammate_img}><Image src={images?.AlisonImg} /></div>
            <h4>
            Alison Beierlein
            </h4>
            <p className={styles.Teammate_profession}>Operations Manager</p>
            <span className={styles.Teammate_Place}>Pembertn</span>
            </div>
        </div>
        <div className="gap-3 d-flex flex-column w-full">
            <div className={styles.teammates}>
            <div className={styles.teammate_img}><Image src={images?.AlisonImg} /></div>
            <h4>
            Alison Beierlein
            </h4>
            <p className={styles.Teammate_profession}>Operations Manager</p>
            <span className={styles.Teammate_Place}>Pembertn</span>
            </div>
        </div>
        <div className="gap-3 d-flex flex-column w-full">
            <div className={styles.teammates}>
            <div className={styles.teammate_img}><Image src={images?.AlisonImg} /></div>
            <h4>
            Alison Beierlein
            </h4>
            <p className={styles.Teammate_profession}>Operations Manager</p>
            <span className={styles.Teammate_Place}>Pembertn</span>
            </div>
        </div>
        <div className="gap-3 d-flex flex-column w-full">
            <div className={styles.teammates}>
            <div className={styles.teammate_img}><Image src={images?.AlisonImg} /></div>
            <h4>
            Alison Beierlein
            </h4>
            <p className={styles.Teammate_profession}>Operations Manager</p>
            <span className={styles.Teammate_Place}>Pembertn</span>
            </div>
        </div>
        {/* )}  */}
        
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
export default AboutsliderCard;