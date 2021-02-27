import * as React from 'react'
import Helmet from 'react-helmet'
import Header from '../../Components/Header/Header'
import LayoutRoot from './root.layout'
import PageLayout from './page.layout'
import 'modern-normalize'
import '../../Common/normalize'
import { GlobalData } from '../../Pages/HomePage/HomePage.models';

interface IndexLayoutProps {
  globalData: GlobalData;
  className: string;
}

const HomePageLayout: React.FC<IndexLayoutProps> = ({
    globalData,
    className,
    children 
}) => { 
    const description = globalData.siteDescription
        .replace('{%param%}',(new Date()).toLocaleDateString('pl-PL', {  
            day : 'numeric',
            month : 'long',
            year : 'numeric'
        }
    ));

    return (
        <LayoutRoot
            className={className}
        >
            <Helmet
                title={globalData.metaTitle}
                meta={[
                    { name: 'description', content: globalData.metaDescription },
                    { name: 'keywords', content: globalData.metaKeywords },
                    { property: 'og:title', content: globalData.metaDescription },
                    { property: 'og:description', content: globalData.metaDescription },
                    { property: 'og:image', content: 'https://ortalio.pl/images/ortalio.pl.jpg' },
                    { property: 'og:url', content: 'https://ortalio.pl' },
                    { property: 'og:site_name', content: globalData.metaDescription },
                    { property: 'og:type', content: 'website' },
                    { name: 'twitter:card', content: 'summary_large_image' },
                    { name: 'twitter:image', content: 'https://ortalio.pl/images/ortalio.pl.jpg' },
                    { name: 'twitter:image:alt', content: globalData.siteTitle },
                    { name: 'twitter:site', content: '@ortalio' },
                    { name: 'twitter:title', content: globalData.siteTitle },
                    { name: 'twitter:description', content: globalData.metaDescription },
                ]}
                link={[
                {
                    href: 'https://fonts.googleapis.com/css?family=Playfair+Display:400,700,900,400italic,700italic,900italic|Droid+Serif:400,700,400italic,700italic',
                    rel: 'stylesheet',
                    type: 'text/css'
                }
                ]}
            />
            <Header
                intro={globalData.siteIntro}
                title={globalData.siteTitle}
                description={description}
            />
            <PageLayout>{children}</PageLayout>
        </LayoutRoot>
    )
};

export default HomePageLayout;
