import * as React from 'react'
import Helmet from 'react-helmet'
import Header from '../components/header/header'
import RootLayout from './root-layout'
import PageLayout from './page-layout'
import 'modern-normalize'
import '../common/normalize'
import { MetaData } from '../containers/home-page/home-page.models';

interface IndexLayoutProps {
  siteMetadata: MetaData;
  siteThumbnailData: any;
  className: string;
}

const HomePageLayout: React.FC<IndexLayoutProps> = ({
    siteMetadata,
    siteThumbnailData,
    className,
    children 
}) => { 
    const description = siteMetadata.siteDescription
        .replace('{%param%}',(new Date()).toLocaleDateString('pl-PL', {  
            day : 'numeric',
            month : 'long',
            year : 'numeric'
        }
    ));

    // let thumbnailUrl = siteThumbnailData?.imageFile?.childImageSharp?.fixed?.src;
    // thumbnailUrl = thumbnailUrl 
    //     ? typeof window !== 'undefined' && `${window.location}${thumbnailUrl.substring(1)}`
    //     : undefined;
    const thumbnailUrl = 'https://ortalio.pl/static/images/ortalio.pl.jpg';

    return (
        <RootLayout
            className={className}
        >
            <Helmet
                title={siteMetadata.metaTitle}
                meta={[
                    { name: 'description', content: siteMetadata.metaDescription },
                    { name: 'keywords', content: siteMetadata.metaKeywords },
                    { property: 'og:title', content: siteMetadata.metaDescription },
                    { property: 'og:description', content: siteMetadata.metaDescription },
                    { property: 'og:image', content: thumbnailUrl },
                    { property: 'og:url', content: 'https://ortalio.pl' },
                    { property: 'og:site_name', content: siteMetadata.metaDescription },
                    { property: 'og:type', content: 'website' },
                    { name: 'twitter:card', content: thumbnailUrl },
                    { name: 'twitter:image', content: thumbnailUrl },
                    { name: 'twitter:image:alt', content: siteMetadata.siteTitle },
                    { name: 'twitter:site', content: '@PtrMarkiewicz' },
                    { name: 'twitter:title', content: siteMetadata.siteTitle },
                    { name: 'twitter:description', content: siteMetadata.metaDescription },
                ]}
                link={[
                {
                    href: '/css/Playfair-Display.css',
                    rel: 'stylesheet',
                    type: 'text/css'
                }
                ]}
            />
            <Header
                intro={siteMetadata.siteIntro}
                title={siteMetadata.siteTitle}
                description={description}
            />
            <PageLayout>{children}</PageLayout>
        </RootLayout>
    )
};

export default HomePageLayout;
