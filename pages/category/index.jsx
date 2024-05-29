import React from 'react'
import Catalogue from '../../components/catalogue/Catalogue'
import PrimaryHeader from '../../components/primary-header/PrimaryHeader'
import SecondaryHeader from '../../components/secondary-header/SecondaryHeader'
import Footer from '../../components/footer/Footer'

const index = () => {
  return (
    <div>
      <PrimaryHeader />
      <SecondaryHeader />
      <Catalogue />
      <Footer />
    </div>
  )
}

export default index
