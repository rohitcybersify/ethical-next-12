import React from 'react'
import Styles from '../InnerBanner/InnerBanner.module.css'
const InnerBanner = ({data}) => {
  const backgroundImage = data?.image ? `url(${data.image})` : '';
  return (
    <>
<section className={`${Styles.InnerBanner_bg}`} style={{backgroundImage:`url('${data?.image}')`}}>
{/* <section className={Styles.InnerBanner_bg} style={{ backgroundImage: backgroundImage }}> */}
<h1>{data?.title}</h1>
<p><a href="#">Home</a> <span>{'>'}</span><a href='#'>{data?.title}</a></p>
</section>
    </>
  )
}
export default InnerBanner