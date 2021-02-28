import * as React from "react"
import styled from '@emotion/styled';
import Image from 'gatsby-image';
import { dimensions } from '../../common/variables';
import { SocialMediaData } from '../../common/models';

const SocialImage = styled(Image)({
  '& picture img': {
    objectPosition: 'left center !important',
    transition: 'all 0s ease-out 0.1s !important',
    maxWidth: 'none !important',
    width: `${2 * dimensions.socialIcon.edge}px !important`,
    height: `${dimensions.socialIcon.edge}px !important`
  },
  '&:hover picture img, & picture img:hover': {
    objectPosition: `${-dimensions.socialIcon.edge}px center !important`
  }
});

const StyledSocialIconsSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0 20px 3vh 20px;
  margin: auto;
  text-align: center;

  & .social-icon {
    -webkit-transition: all 0s ease-in-out 0.07s;
    -moz-transition: all 0s ease-in-out 0.07s;
    -o-transition: all 0s ease-in-out 0.07s;
    transition: all 0s ease-in-out 0.1s !important;
    margin: 0 3px;
    opacity: 0.8;
    width: ${dimensions.socialIcon.edge}px;
    overflow: hidden;
  }

  & .social-icon:hover {
    opacity: 1;
  }
`;

interface SocialIconsOwnProps {
    socialMediaData: any[];
}

const SocialIcons: React.FC<SocialIconsOwnProps> = ({ socialMediaData }) => (
    <StyledSocialIconsSection>
        {socialMediaData.map((item, key) => renderSocialIcon(key, item.node))}
    </StyledSocialIconsSection>
);

export function renderSocialIcon(key: number, item: SocialMediaData) {
  return (
    <a 
      href={item.ortalioSocialMediaField.url} 
      target="_blank" 
      rel="noopener noreferrer"
      key={key} 
      className="social-icon"
    >
      <SocialImage fixed={item?.featuredImage?.node?.imageFile?.childImageSharp?.fixed} />
    </a>
  );
}

export default SocialIcons;