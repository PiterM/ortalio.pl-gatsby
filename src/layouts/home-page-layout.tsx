import * as React from 'react'
import Helmet from 'react-helmet'
import Header from '../components/header/header'
import RootLayout from './root-layout'
import PageLayout from './page-layout'
import 'modern-normalize'
import '../common/normalize'
import { MetaData } from '../containers/home-page/home-page.models';
import styles from '../gatsby-plugin-theme-ui';
const { images } = styles;

interface IndexLayoutProps {
  siteMetadata: MetaData;
  className: string;
}

const HomePageLayout: React.FC<IndexLayoutProps> = ({
    siteMetadata,
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

    const thumbnailUrl = `https://ortalio.pl${images.siteThumbnail}`;

    return (
        <RootLayout
            className={className}
        >
            <Helmet
                title={siteMetadata.metaTitle}
                meta={[
                    { name: 'description', content: siteMetadata.metaDescription },
                    { name: 'keywords', content: siteMetadata.metaKeywords },
                    { property: 'og:title', content: siteMetadata.metaTitle },
                    { property: 'og:description', content: siteMetadata.metaDescription },
                    { property: 'og:image', content: thumbnailUrl },
                    { property: 'og:url', content: 'https://ortalio.pl' },
                    { property: 'og:site_name', content: siteMetadata.metaDescription },
                    { property: 'og:type', content: 'website' },
                    { name: 'twitter:card', content: thumbnailUrl },
                    { name: 'twitter:image', content: thumbnailUrl },
                    { name: 'twitter:image:alt', content: siteMetadata.siteTitle },
                    { name: 'twitter:site', content: '@PtrMarkiewicz' },
                    { name: 'twitter:title', content: siteMetadata.metaTitle },
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
