import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Styles from './Catalogue.module.css'
import Loaders from '../../components/loaders/Loaders'
import useFetch from '../../lib/useFetch'
import { useDispatch, useSelector } from 'react-redux'
import { setCollectionForUrl,setSubCategoryOnTop,setSubCollectionForUrl } from '../../redux-setup/categorySlice'
import { useRouter } from 'next/router'
const Catalogue = () => {
  const dispatch = useDispatch()
  const [active, setActive] = useState(false)
  const router = useRouter()
  const [categoryData, setCategoryData] = useState([])
  const [loadQuery, { response, loading, error }] = useFetch(
    `/category`,
    {
      method: 'get',
    },
    'formdata'
  )

  const allCategories = useSelector((state) => state.category.allCategories)

  const handlePush = (category) => {
    setActive(true)
    router.push(
      `/category/${category}`
    )
    dispatch(setCollectionForUrl(`${category}`))
    dispatch(setSubCategoryOnTop(allCategories[category]?.matchingValues))
    dispatch(setSubCollectionForUrl(''))


  }

  useEffect(() => {
    loadQuery()
  }, [])

  useEffect(() => {
    if (response) {
      setCategoryData(response?.data)
    } else if (error) {
      return
    }
  }, [response, error])

  return (
    <>
      {loading || active ? (
        <Loaders />
      ) : (
        <div className={Styles.collection_container}>
          <div className={Styles.banner_heading}>
            <p>Home / Collections</p>
            <h2>Catalog</h2>
          </div>

          <div className={Styles.collection_wrapper}>
            {Object.entries(categoryData).map(([category, details]) => (
              <div
                key={details.airtabelId}
                className={Styles.div_loopData}
                style={{ cursor: 'pointer' }}
                onClick={() => handlePush(category, details?.airtabelId)}
              >
                <h2 onClick={() => handlePush(category)}>{category}</h2>

                {details?.image && (
                  <Image
                    src={details?.image}
                    alt={details?.image}
                    width={500}
                    height={500}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
export default Catalogue