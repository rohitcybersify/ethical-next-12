import { useState } from "react";
import AllBlogs from "../../../components/admin/AllBlogs/AllBlogs";
import PrimaryHeader from "../../../components/primary-header/PrimaryHeader";
import SecondaryHeader from "../../../components/secondary-header/SecondaryHeader";
import Footer from '../../../components/footer/Footer'

const Blogs = () => {
    const [isLoading,  setIsLoading] = useState(true)
    return(
        <>
            <PrimaryHeader />
            <SecondaryHeader />
            <AllBlogs />
            <Footer />
            
        </>
    )
}

export default Blogs;