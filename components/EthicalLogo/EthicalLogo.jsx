import React from 'react'
import images from '../../constants/images'
import Image from 'next/image'
import { useRouter } from 'next/router'

const EthicalLogo = () => {
  const router = useRouter()

  return (
    <>
      <Image
        src={images.Ethical_new_logo}
        width={220}
        height={50}
        alt="search"
        onClick={() => router.push('/')}
        style={{ cursor: 'pointer' }}
      />
    </>
  )
}

export default EthicalLogo
