import React, { useEffect } from 'react'
import { RxCross1 } from 'react-icons/rx'
import Styles from './EmojiModal.module.css'

const EmojiModal = ({EmojiModal, setOpenEmoji}) => {



  return (
    <>
      <div className={Styles.container_overlay}>
        <div className={Styles.popup}>
        <div className={Styles.headingContainer}>
          <h2>Understanding Emoji Rating</h2>
          <RxCross1 cursor="pointer" onClick={() => setOpenEmoji(false)}/>
        </div>
        <div className={Styles.info}>
          <p>
            We label our products with emojis to help you find those that best
            align with your company values. Below is the guide so you can best
            understand what they mean.
          </p>
          <p>
            😀 Good: cost competitive, comparable to other products on the
            market but sourced from suppliers who have passed 3rd party audits
            on social compliance and environmental impact.
          </p>
          <p>
            😀😀 Better: always cost competitive and have some sustainable
            features (recycled content, material made from rapidly renewed
            resource, biodegradable, etc.)
          </p>
          <p>
            😀😀😀 Best: when possible, sourced as closely as possible to end
            client (North American made), preferred use of sustainable material,
            third party accreditation, and/or supplier is Certified B
            Corporation and/or supplier has significant audited giving projects,
            etc. Product quality is very high AND it is still cost competitive.
          </p>
          <p>👩 = Made by a women-owned business</p>
          <p>👩‍👧‍👦 = Made by a company which supports social causes</p>
          <p>🤝 = Made by a company in which the employees are unionized</p>
          <p>🤎 = Made by a black-owned business</p>
          <p>🪶 = Made by an indigenous-owned business</p>
          <p>🧕 = Made by a refugee-owned business</p>
          <p>🐝 = Made by a Certified B Corporation</p>
          <p>🐟 = Made by a company which supports environmental causes</p>
          <p>💚 = Made with certified organic materials</p>
          <p>♻️ = Made with recycled materials</p>
          <p>🌱 = Made with biodegradable materials</p>
          <p>
            🐰 = Made with vegan materials or ingredients; cruelty-free, no
            animal testing.
          </p>
          <p>🍁 = Made in Canada</p>
          <p>⭐️ = Made in the USA</p>
          <p>
            Don't hesitate to contact us if you require more information on the
            product's environmental stewardship, social compliance, or quality
            certifications.
          </p>
        </div>
        </div>
      </div>
    </>
  )
}

export default EmojiModal
