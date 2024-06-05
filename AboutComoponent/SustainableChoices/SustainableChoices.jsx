import React from 'react'
import Styles from './SustainableChoices.module.css'
// import images from '../../../constants/images'
import Image from 'next/image'
import Link from 'next/link'
const SustainableChoices = ({data}) => {

  console.log(data,"cvc")
  return (
    <>
      <section className='container'>
        <div className={Styles.SustainableChoices}>
          <h2>{data?.title.slice(0,22)} <b>{data?.title.slice(22,45)}</b></h2>
          <div className={Styles.Img_textrap}>
            <div className='Text_row'>
              <div className={Styles.image}><Image src={data?.image} layout='fill' alt="SustainableImg" /></div>
              <div>
                <p>
                  {data?.description?.des1}<br></br><br></br>

                  {data?.description?.des2}
                  <br></br><br></br>
                  {data?.description?.des3}
                  <br></br><br></br>
                  {data?.description?.des4}</p>
                  <Link href='/category'>
                <button className='btn_global aligned_left'>Shop All Swag</button>
                   </Link> 
              </div>
            </div>
          </div>
        </div>

      </section>
    </>
  )
}

export default SustainableChoices
