import React from 'react'
import { useSelector } from 'react-redux'
import Styles from '../../styles/category.module.css'

const CountryBasedText = () => {
  const userSelectedCountry = useSelector((state) => state.country.country)

  const userCurrentCountry = useSelector(
    (state) => state.country.userCurrentCountry
  )
  let c = userCurrentCountry
    ? userCurrentCountry === 'United States'
      ? 'usa'
      : userCurrentCountry === 'Canada'
      ? 'canada'
      : userCurrentCountry
    : 'usa'

  return (
    <>
      {c !== userSelectedCountry &&
        userCurrentCountry !== null &&
        (userCurrentCountry === 'United States' ||
          userCurrentCountry === 'Canada') && (
          <div className={Styles.dected_style}>
            You are on{' '}
            {userCurrentCountry === 'United States'
              ? 'ethicalswag.com'
              : 'ethicalswag.ca'}
            .You can also shop on{' '}
            {userCurrentCountry === 'United States'
              ? 'ethicalswag Canada'
              : 'ethicalswag Usa'}{' '}
            products with fast local delivery. Click here to go to this website
          </div>
        )}
      {c !== userSelectedCountry &&
        userCurrentCountry !== 'United States' &&
        userCurrentCountry !== 'Canada' &&
        userCurrentCountry !== null && (
          <div className={Styles.dected_style}>
            We detected your location in {userCurrentCountry}. We don't ship
            products outside canada or usa yet. We are showing you products that
            can be shipped to {userSelectedCountry}.
          </div>
        )}
    </>
  )
}

export default CountryBasedText
