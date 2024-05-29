import { useRouter } from 'next/router'
import Head from 'next/head'
import DefaultErrorPage from 'next/error'
import builderConfig from '@config/builder'
import Footer from '@components/footer/Footer'
import PrimaryHeader from '@components/primary-header/PrimaryHeader'
import PageNotFound from '../components/PageNotFound/PageNotFound'
import SecondaryHeader from '@components/secondary-header/SecondaryHeader'
import Certified from '@components/certified-swag-section/certified'
import StackCards from '../components/StackCards/StackCards'
import Location from '../components/location/Location'
import Product from '../components/products-final-builder-component/Product'
import Input from '../components/input/Input'
import Loaders from '@components/loaders/Loaders'
import '@builder.io/widgets/dist/lib/builder-widgets-async'
import {
  BuilderComponent,
  builder,
  useIsPreviewing,
  Builder,
} from '@builder.io/react'
import Modal from '@components/modal/Modal'
import CountryBasedText from '@components/locationStatus/CountryBasedText'
import { GA_TRACKING_ID } from '@lib/useFetch'
import { useEffect } from 'react'
import * as ga from '../lib/gtag'
import Image from '../assets/bag_image.png'
import { NextSeo } from 'next-seo'
builder.init(builderConfig.apiKey)

export async function getStaticProps({ params }) {
  const page =
    (await builder
      .get('page', {
        userAttributes: {
          urlPath: '/' + (params?.page?.join('/') || ''),
        },
      })
      .toPromise()) || null

  return {
    props: {
      page,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 5 seconds
    // revalidate: 5,
  }
}

export async function getStaticPaths() {
  const pages = await builder.getAll('page', {
    options: { noTargeting: true },
    omit: 'data.blocks',
  })

  return {
    paths: pages.map((page) => `${page.data?.url}`),
    fallback: true,
  }
}

Builder.registerComponent(Footer, {
  name: 'Footer',
})

Builder.registerComponent(PrimaryHeader, {
  name: 'PrimaryHeader',
})

Builder.registerComponent(SecondaryHeader, {
  name: 'SecondaryHeader',
})

Builder.registerComponent(Certified, {
  name: 'Certified',
})

Builder.registerComponent(Product, {
  name: 'Products-page',
})

Builder.registerComponent(Input, {
  name: 'Services-Input',
})

Builder.registerComponent(StackCards, {
  name: 'StackCards',
})

Builder.registerComponent(Modal, {
  name: 'Modal',
})

// Builder.registerComponent(Location, {
//   name: 'Country-Modal',
// })

Builder.registerComponent(CountryBasedText, {
  name: 'CountryText',
})

export default function Page({ page }) {
  const router = useRouter()

  const isPreviewingInBuilder = useIsPreviewing()
  const show404 = !page && !isPreviewingInBuilder

  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url)
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  if (router.isFallback) {
    return (
      <>
        <Loaders />
      </>
    )
  }

  const title = page?.data?.title || 'Default Title'

  const description = page?.data?.description || 'Default description'

  return (
    <>
      <NextSeo
    title={title}
    description={description}
    canonical={`https://ethicalswag.com${router.asPath}`}
    openGraph={{
      type: 'website',
      url: `https://ethicalswag.com${router.asPath}`,
      title: `${title}`,
      description: `${description}`,
      images: [
        {
          url: `https://test.cybersify.tech//Eswag//storage//app//public//images//office-and-supplies.jpg`,
          width: 1200,
          height: 630,
          alt: 'Ethical Swag Team',
        },
      ],
      site_name: 'Ethical Swag',
    }}
  />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <title>{title}</title>
        <meta name="description" content={description} /> */}
        {/* <link rel="icon" href="/favicon.ico" /> */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap&family=DM+Sans:ital,opsz,wght@0,9..40,100;0,9..40,200;0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;0,9..40,900;0,9..40,1000;1,9..40,100;1,9..40,200;1,9..40,300;1,9..40,400;1,9..40,500;1,9..40,600;1,9..40,700;1,9..40,800;1,9..40,900;1,9..40,1000"
          rel="stylesheet"
        />
        <link
          rel="icon"
          href="/favicon.ico"
          type="image/x-icon"
          sizes="32x32"
        />
        {/* Google tag (gtag.js) */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
              `,
          }}
        />
        {/* <!-- Google Tag Manager (noscript) --> */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MHB8LJW5"
            height="0"
            width="0"
            style="display:none;visibility:hidden"
          ></iframe>
        </noscript>
        {/* <!-- End Google Tag Manager (noscript) → */}

        {!page && <meta name="robots" content="noindex" />}
      </Head>
      {show404 ? (
        // <DefaultErrorPage statusCode={404} suppressHydrationWarning />
        <PageNotFound />
      ) : (
        <BuilderComponent
          model="page"
          content={page}
          suppressHydrationWarning
        />
      )}
    </>
  )
}
