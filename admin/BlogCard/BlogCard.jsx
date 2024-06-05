
import Image from 'next/image';
import ReactHtmlParser from 'react-html-parser';
import Styles from './blog_card.module.css'
import Link from "next/link";
import { useDispatch } from 'react-redux';
import images from '../../../constants/images';

const BlogCard = ({ article }) => {
    const dispatch = useDispatch()
    console.log(article, "article")

    // console.log('id', article.id)
    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <>
            <Link href={`/blogs/articles/${article.handle}`} >
                <div className={Styles.blog_mainDiv}>
                    <div className={Styles.img_div}> {article.image_url && (
                        <Image src={article.image_url} width={600} height={350} />
                    )}</div>
                    <div className={Styles.content_blog}>
                        <div className={Styles.time_table}>
                            <span><Image src={images.Calender} width="18" height="18" alt='date_img' />{formatDate(article.created_at)}</span>
                            <span> <Image src={images.Tshirt} width="18" height="18" alt='date_img' />5 Min Read</span></div>
                        <h1>{article.title}</h1>
                        <p>{ReactHtmlParser(article.summary_html)}</p>
                        {/* <p>{ReactHtmlParser(truncateSummary(article.summary_html))}</p> */}
                    </div>
                </div>
            </Link>
        </>
    );
}

export default BlogCard;




