import Styles from '../Filter/Filter.module.css'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Dot from '@components/custom-colored-dot/Dot'
import Image from 'next/image'
import {
  setColorsObj,
  setShowAllFilters,
  setSwiftSwag,
} from 'redux-setup/FiltersSlice'
import images from 'constants/images'

const emojiLabels = {
  rec4VDYDrSqF2Otxe: 'Certified B-Corp',
  rec5PKO7vBF1x8lhD: 'Good',
  rec66lsvJ6kksVBZF: 'Best',
  rec6dVU6jm3O41mtz: 'Recycled',
  rec6jGqwif8ALO2Za: 'Better',
  recE8vaMjCTJXodhj: 'Social Causes',
  recF97SR100JPoSbM: 'Organic',
  recgYuoPeZiRzGwai: 'Made in the USA',
  reciyUnCGyZ1qgTRy: 'Environmental Causes',
  recswlnhXMDqmDD0n: 'Unionized',
  recUjCN6w3Sp3oZpD: 'Made in Canada',
  recy4AwvCc1SSSxf1: 'Biodegradable',
  recYZPktCJelqsI6K: 'Woman-Owned',
  // Add more mappings for other emoji ratings as needed
}

const FilterPanel = ({
  setFilteredColors,
  filteredColors,
  setDecorationsArray,
  decorationsArray,
  setProductTypeArray,
  productTypeArray,
  emojiTypeArray,
  setEmojiTypeArray,
  activeFilter,
  setActiveFilter,
}) => {
  const dispatch = useDispatch()
  const [active, setActive] = useState(false)
  const [openIndex, setOpenIndex] = useState([])
  const [allFiltersLengthArray, setAllFiltersLengthArray] = useState(0)
  const [allFilteredStateValuesArray, setAllFilteredStateValuesArray] =
    useState([])
  const [clearUniqueProduct, setClearUniqueProduct] = useState([])
  const [showall, setShowAll] = useState('')
  const [isShowAllColoursFilters, setIsShowAllColoursFilters] = useState(false)
  const [isShowAllUniqueFilters, setIsShowAllUniqueFilters] = useState(false)
  const [isShowAllDecorationFilters, setIsShowAllDecorationFilters] =
    useState(false)
  const [isShowAllEmojiFilters, setIsShowAllEmojiFilters] = useState(false)

  const [clearDecorationProduct, setClearDecorationProduct] = useState([])
  const [decoProductClear, setDecoProductClear] = useState([])
  const [clearEmojiProduct, setClearEmojiProduct] = useState([])
  const [renderDecoObj, setRenderDecoObj] = useState({})
  const allFilters = useSelector((state) => state.filter.allFilters)
  const showAllFilters = useSelector((state) => state.filter.showAllFilters)
  const colorsObj = useSelector((state) => state.filter.colorsObj)
  const swiftSwag = useSelector((state) => state.filter.swiftSwag)
  const toggleAccordion = (index) => {
    if (openIndex && openIndex.includes(index)) {
      let filteredIndex = openIndex.filter((item) => item !== index)
      setOpenIndex(filteredIndex)
    } else {
      setOpenIndex([...openIndex, index])
    }
  }

  const reorderEmojiLabels = (emojiLabels) => {
    const orderedLabels = {
      Good: '',
      Better: '',
      Best: '',
    }

    // Loop through the emoji labels and assign them to the corresponding order
    Object.entries(emojiLabels).forEach(([key, value]) => {
      if (value) {
        if (value === 'Good') {
          orderedLabels.Good = key
        } else if (value === 'Better') {
          orderedLabels.Better = key
        } else if (value === 'Best') {
          orderedLabels.Best = key
        }
      }
    })

    // Add the remaining emoji labels to the orderedLabels object
    Object.entries(emojiLabels).forEach(([key, value]) => {
      if (value !== 'Good' && value !== 'Better' && value !== 'Best') {
        orderedLabels[value] = key
      }
    })

    return orderedLabels
  }

  const orderedEmojiLabels = reorderEmojiLabels(emojiLabels)

  const handleCheckboxChange = (event, item) => {
    const { name } = event.target
    if (item.label === 'uniqueProductType') {
      Object.keys(item.children).forEach((key) => {
        if (item.children[key] === name) {
          const index = productTypeArray.indexOf(key)

          if (index !== -1) {
            let a = productTypeArray.filter((item) => item !== key)
            setProductTypeArray(a)
          } else {
            setProductTypeArray([...productTypeArray, key])
          }
        }
      })
    } else if (item.label === 'Decoration') {
      let arr = []
      Object.keys(item.children).forEach((key) => {
        if (item.children[key] === name) {
          arr.push(key)
          const index = decorationsArray.indexOf(key)

          if (index !== -1) {
            let a = decorationsArray.filter((item) => !arr.includes(item))
            setDecorationsArray(a)
          } else {
            setDecorationsArray([...decorationsArray, ...arr])
          }
        }
      })
    } else if (item.label === 'Emoji ratings') {
      Object.keys(item.children).forEach((key) => {
        if (item.children[key] === name) {
          const index = emojiTypeArray.indexOf(key)
          if (index !== -1) {
            let a = emojiTypeArray.filter((item) => item !== key)
            setEmojiTypeArray(a)
          } else {
            setEmojiTypeArray([...emojiTypeArray, key])
          }
        }
      })
    }
  }
  const handleSwagChange = (event) => {
    if (event.target.value === 'true') {
      dispatch(setSwiftSwag(true))
    } else if (event.target.value === 'false') {
      dispatch(setSwiftSwag(false))
    }
  }

  const badge = (item, array, setArrName, color) => {
    const alphabetRegex = /[a-zA-Z]/
    if (item.key === 'swiftSwag') {
      return (
        <span
          onClick={() => dispatch(setSwiftSwag(false))}
          className={Styles.select_color}
        >
          {item?.value}{' '}
          <span className={Styles.cross_selectItems}>
            <Image
              src={images.Cross_icon}
              width={10}
              height={10}
              className={Styles.crosse_color}
            />
          </span>
        </span>
      )
    } else if (item === 'color') {
      return (
        <span
          onClick={() => {
            let a = array.filter((i) => i !== color)
            setArrName(a)
          }}
          className={Styles.select_color}
        >
          {color}
          <span className={Styles.cross_selectItems}>
            <Image
              src={images.Cross_icon}
              width={20}
              height={20}
              className={Styles.crosse_color}
            />{' '}
          </span>
        </span>
      )
    } else {
      return (
        <span
          onClick={() => handleClear(item, array, setArrName, color)}
          className={Styles.select_color}
        >
          {item?.value && alphabetRegex.test(item?.value)
            ? JSON.parse(item?.value)
            : item?.value}
          <span className={Styles.cross_selectItems}>
            <Image
              src={images.Cross_icon}
              width={20}
              height={20}
              className={Styles.crosse_color}
            />
          </span>
        </span>
      )
    }
  }

  const handleClear = (item, array, setArrName, color) => {
    if (color === 'decoration') {
      let decorationObj = showAllFilters.filter(
        (item) => item.label === 'Decoration'
      )
      let obj = decorationObj.length > 0 && decorationObj[0].children
      const keysWithSameValue = []
      for (const key in obj) {
        if (obj[key] === item.value) {
          keysWithSameValue.push(key)
        }
      }
      let ar = array.filter((item) => !keysWithSameValue.includes(item))
      setArrName(ar)
    } else {
      let ar = array.filter((ar) => ar !== item.key)
      setArrName(ar)
    }
  }

  const handleClearAll = () => {
    dispatch(setSwiftSwag(false))
    setDecorationsArray([])
    setProductTypeArray([])
    setEmojiTypeArray([])
    setFilteredColors([])
  }
  useEffect(() => {
    if (showAllFilters) {
      let uniqueProductTypeObj = showAllFilters?.filter(
        (item) => item.label === 'uniqueProductType'
      )
      let obj =
        uniqueProductTypeObj.length > 0 && uniqueProductTypeObj[0].children
      const finalUnique = productTypeArray.map((productId) => {
        const key = productId
        const value = obj[productId]
        return { key, value }
      })
      setClearUniqueProduct(finalUnique)
    }
  }, [productTypeArray, showAllFilters])

  useEffect(() => {
    if (showAllFilters) {
      let decorationObj = showAllFilters?.filter(
        (item) => item.label === 'Decoration'
      )
      let obj = decorationObj.length > 0 && decorationObj[0].children

      const finalDecoration = decorationsArray.map((productId) => {
        const key = productId
        const value = obj[productId]
        return { key, value }
      })
      setClearDecorationProduct(finalDecoration)
    }
  }, [decorationsArray, showAllFilters])
  useEffect(() => {
    const uniqueValuesSet = new Set()
    const arr = []
    clearDecorationProduct.forEach((obj) => {
      const { key, value } = obj
      if (!uniqueValuesSet.has(value)) {
        uniqueValuesSet.add(value)
        arr.push({ key, value })
      }
    })
    setDecoProductClear(arr)
  }, [clearDecorationProduct])
  useEffect(() => {
    if (showAllFilters) {
      let emojiObj = showAllFilters.filter(
        (item) => item.label === 'Emoji ratings'
      )
      let obj = emojiObj.length > 0 && emojiObj[0].children
      const finalEmoji = emojiTypeArray.map((productId) => {
        const key = productId
        const value = obj[productId]
        return { key, value }
      })
      setClearEmojiProduct(finalEmoji)
    }
  }, [emojiTypeArray, showAllFilters])
  useEffect(() => {
    let arr = []
    if (showAllFilters && showAllFilters.length > 0) {
      for (let i = 0; i < showAllFilters.length; i++) {
        const element = [i]
        arr.push(i)
      }
      setAllFiltersLengthArray(arr)
    } else {
      setAllFiltersLengthArray(arr)
    }
  }, [showAllFilters])

  useEffect(() => {
    setOpenIndex(allFiltersLengthArray)
  }, [allFiltersLengthArray])

  useEffect(() => {
    if (allFilters) {
      let categoriesList = []
      if (Object.keys(allFilters).length > 0) {
        Object.entries(allFilters).map(([key, value]) => {
          let obj = {}
          obj.id = key
          obj.label = key
          obj.children = value
          categoriesList.push(obj)
        })
        dispatch(setShowAllFilters(categoriesList))
        let colors = categoriesList.filter((c) => c.label === 'Colors')
        if (colors.length > 0) {
          let colorsObjToUse = colors[0].children
          dispatch(setColorsObj(colorsObjToUse))
        } else {
          dispatch(setColorsObj({}))
        }
      }
    }
  }, [allFilters])

  useEffect(() => {
    if (showAllFilters && showAllFilters.length > 0) {
      let decoObj = showAllFilters.filter((i) => i.label === 'Decoration')[0]
      let children = decoObj.children
      let uniqueValues = {}
      for (let key in children) {
        let value = children[key]
        if (!uniqueValues[value] && value !== null) {
          uniqueValues[value] = key
        }
      }
      const reversedObj = {}
      for (const key in uniqueValues) {
        const value = uniqueValues[key]
        reversedObj[value] = key
      }
      setRenderDecoObj(reversedObj)
    }
  }, [showAllFilters])
  return (
    <>
      {swiftSwag && (
        <div className={Styles.filter_topwrapper}>
          <h3>You’re viewing Swift Swag only products.</h3>
          <button onClick={() => dispatch(setSwiftSwag(false))}>
            view all product intstead?
          </button>
        </div>
      )}

      <div className={Styles.filterPanel}>
        <span
          className={Styles.mobile_crossbtn}
          onClick={() => setActiveFilter(false)}
        >
          <Image
            src={images.Cross_icon}
            width={12}
            height={12}
            className={Styles.crosse_color}
          />
        </span>
        {(productTypeArray.length != 0 ||
          emojiTypeArray.length != 0 ||
          decorationsArray.length != 0 ||
          filteredColors.length != 0 ||
          swiftSwag === true) && (
          <div className={Styles.filterPanel_top}>
            <h4
              className={Styles.filterPanel_title}
              onClick={handleClearAll}
              style={{ cursor: 'pointer' }}
            >
              Clear All
            </h4>

            {(swiftSwag ||
              clearUniqueProduct ||
              decoProductClear ||
              clearEmojiProduct ||
              filteredColors) && (
              <p className={Styles.select_colorDiv}>
                {swiftSwag &&
                  badge({ key: 'swiftSwag', value: 'Swift Swag' }, [], null)}
                {clearUniqueProduct &&
                  clearUniqueProduct.length > 0 &&
                  clearUniqueProduct.map((item) =>
                    badge(item, productTypeArray, setProductTypeArray)
                  )}
                {decoProductClear &&
                  decoProductClear.length > 0 &&
                  decoProductClear.map((item) =>
                    badge(
                      item,
                      decorationsArray,
                      setDecorationsArray,
                      'decoration'
                    )
                  )}

                {clearEmojiProduct &&
                  clearEmojiProduct.length > 0 &&
                  clearEmojiProduct.map((item) =>
                    badge(item, emojiTypeArray, setEmojiTypeArray)
                  )}

                {filteredColors &&
                  filteredColors.length > 0 &&
                  filteredColors.map((item) =>
                    badge('color', filteredColors, setFilteredColors, item)
                  )}
              </p>
            )}
          </div>
        )}

        <div className={Styles.filterPanel_ProductCollection_list}>
          {showAllFilters?.map((item, index) => {
            return (
              <div className={Styles.accordion} key={index}>
                <div className={Styles.accordion_item}>
                  <div
                    className={Styles.items}
                    onClick={() => toggleAccordion(index)}
                  >
                    <div>
                      {item.label === 'uniqueProductType'
                        ? 'Product type'
                        : item.label}
                    </div>
                    <div className={Styles.accordion_icon}>
                      {openIndex && openIndex?.includes(index) ? '-' : '+'}
                    </div>
                  </div>
                </div>

                {openIndex.length > 0 && openIndex.includes(index) && (
                  <div className={Styles.open_accordionWrap}>
                    {openIndex.length > 0 &&
                    openIndex.includes(index) &&
                    item.label === 'Colors' ? (
                      <>
                        <div className={Styles.colors_container}>
                          {Object.keys(colorsObj).length > 0 &&
                            Object.entries(colorsObj)
                              .slice(0, isShowAllColoursFilters ? undefined : 6)
                              .map(([color, imageUrl], colorIndex) => (
                                <>
                                  <Dot
                                    key={colorIndex}
                                    color={color}
                                    imageUrl={imageUrl}
                                    fromFilters
                                    filteredColors={filteredColors}
                                    setFilteredColors={setFilteredColors}
                                  />
                                </>
                              ))}
                        </div>
                        {Object.entries(colorsObj).length > 6 && (
                          <button
                            className={Styles.see_all}
                            onClick={() =>
                              setIsShowAllColoursFilters(
                                !isShowAllColoursFilters
                              )
                            }
                          >
                            {isShowAllColoursFilters ? 'See Less' : 'See All'}
                          </button>
                        )}
                      </>
                    ) : openIndex.length > 0 &&
                      openIndex.includes(index) &&
                      item.label === 'uniqueProductType' ? (
                      <div className={Styles.custom_checkbox}>
                        {Object.entries(item.children)
                          .slice(0, isShowAllUniqueFilters ? undefined : 6)
                          .map(([key, child], childIndex) => (
                            <>
                              <li
                                key={childIndex}
                                className={Styles.filterPanel_list_item}
                              >
                                <input
                                  type="checkbox"
                                  id={`checkbox_id_${key}`}
                                  name={child}
                                  onChange={(e) =>
                                    handleCheckboxChange(e, item)
                                  }
                                  checked={productTypeArray.includes(key)}
                                />
                                <label htmlFor={`checkbox_id_${key}`}>
                                  {child && JSON.parse(child)}
                                </label>
                              </li>
                            </>
                          ))}
                        {Object.entries(item.children).length > 6 && (
                          <button
                            className={Styles.see_all}
                            onClick={() =>
                              setIsShowAllUniqueFilters(!isShowAllUniqueFilters)
                            }
                          >
                            {isShowAllUniqueFilters ? 'See Less' : 'See All'}
                          </button>
                        )}
                      </div>
                    ) : openIndex.length > 0 &&
                      openIndex.includes(index) &&
                      item.label === 'Swift swag' ? (
                      <div className={Styles.swift_swagDiv}>
                        <div className={Styles.input_checkbox}>
                          {Object.values(item.children)
                            .slice(0, showall ? undefined : 6)
                            .map((child, childIndex) => {
                              let val = child === 'SwiftSwag'
                              return (
                                <>
                                  <li
                                    key={childIndex}
                                    className={Styles.filterPanel_list_item}
                                  >
                                    <input
                                      type="radio"
                                      id={`checkbox_id_${child}`}
                                      name="radioSwiftSwag"
                                      value={val}
                                      checked={swiftSwag == val}
                                      onChange={handleSwagChange}
                                    />
                                    <label htmlFor={`checkbox_id_${child}`}>
                                      {/* {child && child.toLowerCase()} */}
                                      {child === 'SwiftSwag'
                                        ? ' Swift Swag'
                                        : 'No swift swag'}
                                    </label>
                                  </li>
                                </>
                              )
                            })}
                        </div>
                      </div>
                    ) : openIndex.length > 0 &&
                      openIndex.includes(index) &&
                      item.label === 'Decoration' ? (
                      <div className={Styles.custom_checkbox}>
                        {Object.entries(renderDecoObj)
                          .slice(0, isShowAllDecorationFilters ? undefined : 6)

                          .map(([key, child], childIndex) => (
                            <>
                              <li
                                key={childIndex}
                                className={Styles.filterPanel_list_item}
                              >
                                <input
                                  type="checkbox"
                                  id={`checkbox_id_${key}`}
                                  name={child}
                                  value={child}
                                  checked={decorationsArray.includes(key)}
                                  onChange={(e) =>
                                    handleCheckboxChange(e, item)
                                  }
                                />
                                <label htmlFor={`checkbox_id_${key}`}>
                                  {child && JSON.parse(child)}
                                </label>
                              </li>
                            </>
                          ))}
                        {Object.entries(renderDecoObj).length > 6 && (
                          <button
                            className={Styles.see_all}
                            onClick={() =>
                              setIsShowAllDecorationFilters(
                                !isShowAllDecorationFilters
                              )
                            }
                          >
                            {isShowAllDecorationFilters
                              ? 'See Less'
                              : 'See All'}
                          </button>
                        )}
                      </div>
                    ) : openIndex.length > 0 &&
                      openIndex.includes(index) &&
                      item.label === 'Emoji ratings' ? (
                      <div className={Styles.custom_checkbox}>
                        {Object.entries(orderedEmojiLabels)
                          .slice(0, isShowAllEmojiFilters ? undefined : 6)
                          .map(([key, child], childIndex) => (
                            <>
                              {item.children[child] && (
                                <li
                                  key={childIndex}
                                  className={Styles.filterPanel_list_item}
                                >
                                  <input
                                    type="checkbox"
                                    id={`checkbox_id_${key}`}
                                    name={item.children[child]}
                                    onChange={(e) =>
                                      handleCheckboxChange(e, item)
                                    }
                                    checked={emojiTypeArray.includes(child)}
                                  />
                                  <label htmlFor={`checkbox_id_${key}`}>
                                    {key} {item.children[child]}
                                  </label>
                                </li>
                              )}
                            </>
                          ))}
                        {Object.entries(item.children).length > 6 && (
                          <button
                            className={Styles.see_all}
                            onClick={() =>
                              setIsShowAllEmojiFilters(!isShowAllEmojiFilters)
                            }
                          >
                            {isShowAllEmojiFilters ? 'See Less' : 'See All'}
                          </button>
                        )}
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default FilterPanel
