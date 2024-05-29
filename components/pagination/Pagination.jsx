import React, { useEffect, useState } from 'react'
import Styles from './pagination.module.css'
import { MdArrowBackIos } from 'react-icons/md'
import { IoChevronForwardSharp } from 'react-icons/io5'

const Pagination = ({
  products,
  page,
  setPage,
  paginatedProducts,
  setPaginatedProducts,
}) => {
  const [arr, setArr] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [startIndex, setStartIndex] = useState(2)
  const [maxPages, setMaxPages] = useState(3)
  let itemsPerPage = 15

  const paginate = (val) => {
    const startIndex = val ? 0 : (page - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    let paginated = products.slice(startIndex, endIndex)
    setPaginatedProducts(paginated)
  }

  useEffect(() => {})

  const handlePageChange = (val) => {
    if (val === 'prev') {
      page > 1 && setPage((prev) => prev - 1)
    } else if (val === 'next') {
      page < totalPages && setPage((prev) => prev + 1)
    }
  }

  const noOfPages = () => {
    let a = []

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        a.push(i)
      }
    } else {
      if (page <= 3) {
        a = [1, 2, 3, 4, '...', totalPages]
      } else if (page >= totalPages - 2) {
        a = [
          1,
          '...',
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ]
      } else {
        a = [1, '...', page - 1, page, page + 1, '...', totalPages]
      }
    }

    setArr(a)
  }

  useEffect(() => {
    window.scrollTo({
      top: '0',
      left: '0',
      behavior: 'smooth',
    })
    if (totalPages) {
      noOfPages()
    }
  }, [totalPages, page])

  useEffect(() => {
    const pages = Math.ceil(products?.length / itemsPerPage)
    setTotalPages(pages)
  }, [products, itemsPerPage])

  useEffect(() => {
    paginate('setpage1')
  }, [totalPages, products])

  useEffect(() => {
    paginate()
  }, [page, itemsPerPage])

  return (
    <>
      {totalPages > 1 && (
        <div className={Styles.pagination_container}>
          <div className={Styles.pagination_content}>
            <button
              onClick={() => handlePageChange('prev')}
              disabled={page === 1}
              style={{
                opacity: page === 1 ? '0.7' : '1',
                cursor: page === 1 ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
              }}
            >
              <MdArrowBackIos cursor="pointer" />
              Previous
            </button>

            {arr.map((item, i) => (
              <button
                className={page === item ? Styles.current_page : ''}
                key={i}
                onClick={() => typeof item === 'number' && setPage(item)}
                style={{ cursor: item === '...' ? 'default' : 'pointer' }}
              >
                {item}
              </button>
            ))}

            <button
              onClick={() => handlePageChange('next')}
              disabled={page === totalPages}
              style={{
                opacity: page == totalPages ? '0.7' : '1',
                cursor: page == totalPages ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
              }}
            >
              Next
              <IoChevronForwardSharp cursor="pointer" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Pagination
