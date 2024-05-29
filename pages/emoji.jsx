import React, { useState } from 'react'
import EmojiModal from '../components/EmojiModal/EmojiModal'

const emoji = () => {
  const [openModal, setOpenModal] = useState(false)
  return (
    <div>
      <button
        style={{ border: '1px solid black' }}
        onClick={() => setOpenModal(!openModal)}
      >
        Open Modal
      </button>

      <div
        style={{
          opacity: openModal ? '1' : '0',
          transform: openModal ? 'scale(1)' : 'scale(0)',
          transition: 'opacity 0.5s ease-in-out',
        }}
      >
        <EmojiModal />
      </div>
    </div>
  )
}

export default emoji
