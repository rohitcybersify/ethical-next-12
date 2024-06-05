import React from 'react';
import Styles from './KindBusiness.module.css';
import images from '../../../constants/images';
import Image from 'next/image';
import { FaCirclePlay } from "react-icons/fa6";


const Kindofbusiness = ({ data }) => {

  function playVideo() {
    const posterContainer = document.getElementById('posterContainer');
    const videoIframe = document.getElementById('videoIframe');
    if (posterContainer) {
      posterContainer.style.display = 'none';
    }
    if (videoIframe) {
      videoIframe.style.display = 'block';
      videoIframe.src += "?autoplay=1"; // Add autoplay to the video URL
    }
  }

  return (
    <>
      <section className={Styles.Kindofbusiness}>
        <div className='container'>
          <div className={Styles.Img_textrap}>
            <div className='Text_row align_center'>
              <div>
                <h2>{data?.title}</h2>
                <p>{data?.description?.des1}<br /><br />
                  {data?.description?.des2}<br /><br />
                  {data?.description?.des3}<br /><br />
                  {data?.description?.des4}</p>
              </div>
              <div className={Styles.Video_sec}>
                <div id="posterContainer" className={Styles.Overlay_videoImg} onClick={playVideo}>
                  <Image src={data?.image} layout='fill' alt='AboutThumbnail' />
                  <button className={Styles.playButton}><FaCirclePlay /></button>
                </div>
                <iframe
                  id="videoIframe"
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/iEhBnpKYGS8"
                  title="What Makes Us Different"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  style={{ display: 'none' }} // Initially hide the iframe
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Kindofbusiness;
