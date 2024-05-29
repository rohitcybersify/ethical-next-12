import React from 'react'
import Image from 'next/image'
import Styles from './Card.module.css'
import images from '../../../constants/images'

const Card = ({ card }) => {
  return (
    <>
      <div className={Styles.card_container}>
        <div className={Styles.card_left}>
          <p className={Styles.text}>{card.text}</p>
          <span className={Styles.price}>{card.price}</span>
          <span
            className={Styles.percent}
            style={{ color: card.id === 3 ? 'red' : '#a2d061' }}
          >
            {card.percent}
          </span>
        </div>
        <div className={Styles.card_right}>
          <div className={Styles.card_icon}>{card.icon}</div>
        </div>
      </div>
    </>
  )
}

export default Card
