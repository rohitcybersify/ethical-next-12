import React,{useState} from 'react';
import Router from 'next/router';
// import Styles from './what_weDo.module.css'
import Styles from "./what_weDo.module.css"
const WhatWeDo = ({data}) => {

{console.log(data,"data")}
  return (
    <section className='container'>
      <div className={Styles.whatwe_do}>
      <div className={Styles.content_center}>
        <h2 className={Styles.main_heading}>{data.title.slice(0,5)} <b>{data.title.slice(5,10)}</b></h2>
        <p className='inner_subheading'>{data?.description}</p>
      </div>
      <div className={Styles.video_section}>
        <div><h2 className={Styles.main_heading}>{data.sub_title.slice(0,10)} <b>{data.sub_title.slice(10,20)} </b></h2>
        <p className='inner_subheading'>{data?.sub_description}</p></div>
        <div className={Styles.video_wrapper}>
          <iframe src='https://www.youtube.com/embed/t2V5wi2pQ8c?rel=0' />
        </div>
      
      </div>
      </div>
    </section>
  );
}
export default WhatWeDo;

