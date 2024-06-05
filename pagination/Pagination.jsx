import React, { useEffect, useState } from 'react';
import Styles from './pagination.module.css';
import { MdArrowBackIos } from 'react-icons/md';
import { IoChevronForwardSharp } from 'react-icons/io5';
import { useRouter } from 'next/router';

const Pagination = ({
  products,
  page,
  setPage,
  paginatedProducts,
  setPaginatedProducts,
}) => {
  const [arr, setArr] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 15;
  const router = useRouter();

  const paginate = (currentPage) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginated = products.slice(startIndex, endIndex);
    setPaginatedProducts(paginated);
  };

  const handlePageChange = (val) => {
    if (val === 'prev') {
      if (page > 1) {
        const newPage = page - 1;
        setPage(newPage);
        router.push({ pathname: router.pathname, query: { ...router.query, page: newPage } }, undefined, { shallow: true });
      }
    } else if (val === 'next') {
      if (page < totalPages) {
        const newPage = page + 1;
        setPage(newPage);
        router.push({ pathname: router.pathname, query: { ...router.query, page: newPage } }, undefined, { shallow: true });
      }
    }
  };

  const generatePageNumbers = () => {
    let pageNumbers = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (page <= 3) {
        pageNumbers = [1, 2, 3, 4, '...', totalPages];
      } else if (page >= totalPages - 2) {
        pageNumbers = [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
      } else {
        pageNumbers = [1, '...', page - 1, page, page + 1, '...', totalPages];
      }
    }

    setArr(pageNumbers);
  };

  useEffect(() => {
    const pages = Math.ceil(products?.length / itemsPerPage);
    setTotalPages(pages);
  }, [products]);

  useEffect(() => {
    const pageParam = parseInt(router.query.page);
    if (!isNaN(pageParam) && pageParam >= 1 && pageParam !== page) {
      setPage(pageParam);
    } else if (isNaN(pageParam)) {
      setPage(1); // Default to page 1 if no valid page parameter is found
    }
  }, [router.query.page, setPage, page]);

  useEffect(() => {
    if (totalPages) {
      generatePageNumbers();
      paginate(page);
    }
  }, [totalPages, page]);

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
    router.push({ pathname: router.pathname, query: { ...router.query, page: pageNumber } }, undefined, { shallow: true });
  };

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
                onClick={() => typeof item === 'number' && handlePageClick(item)}
                style={{ cursor: item === '...' ? 'default' : 'pointer' }}
              >
                {item}
              </button>
            ))}

            <button
              onClick={() => handlePageChange('next')}
              disabled={page === totalPages}
              style={{
                opacity: page === totalPages ? '0.7' : '1',
                cursor: page === totalPages ? 'not-allowed' : 'pointer',
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
  );
};


export default Pagination;
