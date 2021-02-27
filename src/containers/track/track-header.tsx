import * as React from 'react'
import { useSelector } from 'react-redux';
import styled from "@emotion/styled";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import Link from 'gatsby-link';
import CartButton from '../../components/header-cart-button';
import { getCartQuantity } from '../cart/cart-selectors';

const LogoLink = styled(Link)({
    transition: 'all 0.3s ease',
    ":hover": {
        opacity: 0.6
    },
    ":active": {
      opacity: 0.2
    }
});

const Header = styled.div({
    width: '100%',
    height: '100px',
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    marginTop: '1rem',
    paddingTop: '1rem'
});

const Logo = styled(Img)({
    width: 151,
    height: 42,
  "@media(max-width:600px)": {
    width: 75,
    height: 75
  }
});


const TrackHeader: React.FC = () => {
  // const data = useStaticQuery(graphql`
  //   query {
  //     ortl {
  //       ortalioMusicSiteData {
  //         edges {
  //           node {
  //             data {
  //               logo {
  //                 altText
  //                 sourceUrl(size: MEDIUM)
  //                 imageFile {
  //                   childImageSharp {
  //                     fixed(width: 151, height: 42) {
  //                       width
  //                       height
  //                       src
  //                       srcSet
  //                     }
  //                   }
  //                 }
  //               }
  //             }
  //           }
  //         }
  //       }    
  //     }
  //   }
  // `);
  const data: any = null;

  const siteData = data?.ortl?.ortalioMusicSiteData?.edges[0]?.node?.data;
  if (!siteData) {
    return null;
  }

  const logoFixed = siteData.logo?.imageFile?.childImageSharp?.fixed;
  const cartQuantity = useSelector(getCartQuantity);

  return (
    <Header>
        <LogoLink to={'/'}>
            <Logo fixed={logoFixed} />
        </LogoLink>
        <CartButton cartQuantity={cartQuantity} />
    </Header>
  );
};

export default TrackHeader;
