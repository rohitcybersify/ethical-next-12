import Styles from './Dot.module.css'

import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Dot = ({
  color,
  imageUrl,
  selectedColor,
  setSelectedColor,
  fromFilters,
  filteredColors,
  setFilteredColors,
  fromSingleProduct,
}) => {
  const router = useRouter()
  const [showSpan, setShowSpan] = useState(false)
  const isCategoryPage = useSelector((state) => state.random.isCategoryPage)

  const handleSelect = (color) => {
    if (router.asPath != '/') {
      if (fromFilters) {
        const index = filteredColors.indexOf(color)

        if (index !== -1) {
          const updatedColors = [...filteredColors]
          updatedColors.splice(index, 1)
          setFilteredColors(updatedColors)
        } else {
          setFilteredColors((prevColors) => [...prevColors, color])
        }
      } else {
        setSelectedColor(color)
      }
    }
  }

  const setOutlineColor = () => {
    if (fromFilters) {
      return filteredColors.includes(color) && '#a2d061'
    } else {
      return selectedColor === color ? '#a2d061' : ''
    }
  }
  const setOutlineWidth = () => {
    if (fromFilters) {
      return filteredColors.includes(color) && '2px'
    } else {
      return selectedColor === color ? '2px' : '1px'
    }
  }
  return (
    <>
      {color && (
        <div
          className={`${Styles.colored_dot} ${Styles.tooltip} ${
            isCategoryPage === true ? Styles.categorydot_wrap : ''
          }${fromSingleProduct && Styles.product_color}`}
          style={{
            background: `url(${imageUrl})`,
            outlineColor: setOutlineColor(),
            outlineWidth: setOutlineWidth(),
          }}
          onClick={() => handleSelect(color)}
        >
          <span class={Styles.tooltiptext}>{color}</span>
        </div>
      )}
    </>
  )
}

export default Dot
