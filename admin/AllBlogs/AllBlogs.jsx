import { useRouter } from "next/router";
import images from "../../../constants/images";
import BlogCard from "../BlogCard/BlogCard";
import Image from 'next/image';
import ReactHtmlParser from 'react-html-parser';
import Styles from './AllBlogs.module.css'
import { useState, useEffect } from "react";
import useFetch from "../../../lib/useFetch";
import Loaders from '@components/loaders/Loaders'
import { useDispatch } from "react-redux";
import { setPage as setPageRedux } from '../../../redux-setup/pageSlice'
import Link from "next/link";


const AllBlogs = () => {
    // console.log('articles', articles)
    const router = useRouter()
    const [data, setData] = useState([])
    const [featuredData, setFeaturedData] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1);
    const dispatch = useDispatch()

    console.log("totalpages", totalPages)
    console.log("page", page)
    console.log("featuredData",setFeaturedData)


    const [loadQuery, { response, loading, error }] = useFetch(`/sadm/all-blog-article?page=${page}`,
        {
            method: 'get',
        }
    )

    console.log("response", response)


    useEffect(() => {
        loadQuery()
        window.scrollTo({
            top: '0',
            left: '0',
            behavior: 'smooth'
        })
    }, [page])

    useEffect(() => {
        if (response) {
            setData(response?.articles.data)
            setFeaturedData(response?.dataFaetured)
            setTotalPages(response?.articles.last_page)
            dispatch(setPageRedux(page))
        } else {
            return
        }
    }, [response, error])

    console.log('data', data)
    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };


    // Pagination

    const [perPage, setPerPage] = useState(10);
    const [size, setSize] = useState(perPage);
    const [current, setCurrent] = useState(1);

    const PerPageChange = (value) => {
        setSize(value);
        const newPerPage = Math.ceil(datatableUsers.length / value);
        if (current > newPerPage) {
            setCurrent(newPerPage);
        }
    }

    const getData = (current, pageSize) => {
        // Normally you should get the data from the server
        return data.slice((current - 1) * pageSize, current * pageSize);
    };

    const PaginationChange = (page, pageSize) => {
        setCurrent(page);
        setSize(pageSize)
    }

    const PrevNextArrow = (current, type, originalElement) => {
        if (type === 'prev') {
            return <button><i className="fa fa-angle-double-left"></i></button>;
        }
        if (type === 'next') {
            return <button><i className="fa fa-angle-double-right"></i></button>;
        }
        return originalElement;
    }


    // const [categories, setCategories] = useState([]);

    // useEffect(() => {
    //     const fetchCategories = async () => {
    //         try {
    //             const response = await fetch(`/sadm/all-blog-article`, {
    //                 method: 'GET',
    //             });
    //             if (!response.ok) {
    //                 throw new Error('Failed to fetch categories');
    //             }
    //             const data = await response.json();
    //             console.log("data category", data);
    //             setCategories(data);
    //         } catch (error) {
    //           console.log(error, "Fetching Blog Categories Failed....");
    //         }
    //     };

    //     fetchCategories();
    // }, []);

    // console.log("categories",categories);


    return (
        <div>
            {loading && <Loaders />}
                {data && data?.length > 0 && featuredData && featuredData.length > 0 && (
                    <>
                        <Link href={`/blogs/articles/${featuredData[0]?.handle}`}>
                            <div key={featuredData[0]?.id}>
                                <section className={Styles.Main_blogbanner}>
                                    <div className={Styles.Blog_container}>
                                        <div className={Styles.blog_mainDiv}>
                                            <Image src={featuredData[0]?.image_url} width={600} height={400} alt='' />
                                            <div className={Styles.content_blog}>
                                                <Image src={images.Calender} width="18" height="18" alt='date_img' style={{marginTop:"5px",objectFit:"contain"}}/><span style={{marginLeft:"5px"}}>{formatDate(featuredData[0]?.created_at)}</span>
                                                {/* <span>{formatDate(featuredData[0]?.created_at)}</span> */}
                                                <span>{featuredData[0]?.readTime}</span>
                                                <h1>{featuredData[0]?.title}</h1>
                                                <p>{ReactHtmlParser(featuredData[0]?.summary_html)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </Link>
                        
                        {/* FILTER SECTION */}
                        {/* <section className="filter__handle__section">
                            <div>
                                <select>
                                    {categories.map(category => (
                                        <option key={category?.id} value={category?.id}>
                                            {category?.blog_category}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </section> */}
                         
                         {/* POSTS */}
                        <div className={`${Styles.Blog_container} ${Styles.blog_card_container}`}>
                            <div className={Styles.blog_mainDiv}>
                                {data.slice(1).map(article => (
                                    <BlogCard key={data.id} article={article} />
                                ))}
                            </div>
                        </div>

                        {/* PAGINATION */}
                        <div className={Styles.pagination_container}>
                            {totalPages > 1 && (
                                <div className={Styles.pagination_content}>
                                    <button
                                        className={`${Styles.btn_flex} ${Styles.btnGap}`}
                                        onClick={() => setPage(page - 1)}
                                        disabled={page === 1}
                                    >
                                        Previous
                                    </button>
                                    {/* Displaying page numbers */}
                                    {Array.from({ length: Math.min(totalPages, totalPages - 2) }, (_, i) => (
                                        <button
                                            key={i + 1}
                                            className={page === i + 1 ? 'active__pagination' : ''}
                                            onClick={() => setPage(i + 1)}
                                        >
                                            {totalPages === i + 1 ? totalPages - 1 : i + 1}
                                        </button>
                                    ))}
                                    {/* Displaying "Last" button */}
                                    <button
                                        className={page === 4 ? 'active__pagination' : ''}
                                        //className={`${Styles.btn_flex} ${Styles.btnGap}`}
                                        onClick={() => setPage(totalPages - 1)}
                                    >
                                        {totalPages - 1}
                                    </button>
                                    {/* <span>...</span> */}
                                    <button
                                        className={page === totalPages ? 'active__pagination' : ''}
                                        onClick={() => setPage(totalPages)}
                                    >
                                        {totalPages}
                                    </button>
                                    <button
                                        className={`${Styles.btn_flex} ${Styles.btnGap}`}
                                        onClick={() => setPage(page + 1)}
                                        disabled={page === totalPages}
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </div>

                    </>
                )}
        </div>
    )
}

export default AllBlogs;