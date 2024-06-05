import Image from "next/image";
import images from "../../../constants/images";
import PrimaryHeader from "../../primary-header/PrimaryHeader";
import SecondaryHeader from "../../secondary-header/SecondaryHeader";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import useFetch from "../../../lib/useFetch";
import { useEffect, useState } from "react";
import ReactHtmlParser from 'react-html-parser';
import Styles from './Single_blog.module.css'
import Loaders from '@components/loaders/Loaders'
import Footer from '../../../components/footer/Footer'

const Blog = () => {
    const router = useRouter()
    const [blogData, setBlogData] = useState()
    const handleQuery = router.query?.slug
    console.log('mist', handleQuery)
    const page = useSelector((state => state.page.currentPage))
    console.log(page, page)

    const [loadQuery, { response, loading, error }] = useFetch(`/sadm/all-blog-article?page=${page}`,
        {
            method: 'get',
        }
    )
    useEffect(() => {
        loadQuery()
    }, [page])

    useEffect(() => {
        if (response) {
            const blog = response.articles.data.filter(item => item?.handle === handleQuery);
            setBlogData(blog);
        }
    }, [response, handleQuery]);

    const handleBack = () => {
        router.push('/blogs/articles')
    }

    console.log('single', response?.articles.data)

    return (
        <>
            <PrimaryHeader />
            <SecondaryHeader />


            <section className={Styles.conatainer_Sec}>
                <div className={Styles.collection_banner} >
                    <div className={Styles.collection_banner_heading}>
                        <h1>{blogData && blogData[0]?.title}</h1>
                        <p>
                            <span
                                onClick={() => router.push('/')}
                                style={{ cursor: 'pointer' }}
                            >
                                Home
                            </span>
                            <span> {'> '}</span> 
                            <span
                                onClick={() => router.push('/blogs/articles')}
                                style={{ cursor: 'pointer' }}
                            >
                                Blog
                            </span>
                            <span> {'> '}</span> {blogData && <span>{blogData[0]?.title}</span>}
                        </p>
                    </div>
                </div>
            </section>

            {!blogData ? <Loaders /> : <section className={Styles.Single_blogConatiner}>
                <div className={Styles.Single_Content}>
                    {
                        blogData && blogData.length > 0 &&
                        <>
                            <div className={Styles.Single_firstcontent}>
                                <h1>{blogData[0].title}</h1>
                                <p>{ReactHtmlParser(blogData[0].summary_html)}</p>
                            </div>
                            <div className={Styles.Inner_blogContent}>
                                <p>{ReactHtmlParser(blogData[0].body_html)}</p>
                            </div>
                        </>
                    }
                    <button onClick={handleBack} >Back to blog</button>
                </div>
            </section>}

            <Footer />


        </>
    )
}

export default Blog;

