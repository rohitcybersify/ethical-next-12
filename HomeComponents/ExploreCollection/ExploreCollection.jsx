import React from 'react';
import 'react-multi-carousel/lib/styles.css';
import Image from 'next/image';
import images from '../../../constants/images';
import styles from '../ExploreCollection/ExploreCollection.module.css'
import Link from 'next/link';


const ExploreCollections = ({ data }) => {
  console.log(data, "qw12")
  const abc = data?.data?.images?.map((res) => console.log(res, "qw12"))
  return (
    <section className='Conatiner'>
      <div className={styles.ExploreCollection}>
        <div className={styles.Explore_content}>
          <p>{data?.data?.title}</p>
          <h2>{data?.data?.Sub_titles.slice(0, 7)}  <b>{data?.data?.Sub_titles?.slice(7, 50)}</b></h2>
         <Link href='/products'>
          <button className='btn_global'>View all products</button>
         </Link>

        </div>
        <div className={styles.Explore_category}>
          {data?.images?.map((res) =>
            <div className={styles.explore_images}><Image src={res?.image} layout='fill' alt={res?.title} />
              <span className={styles.category_heading}>{res?.title}</span></div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ExploreCollections;
