import React from "react"
import styled from '@emotion/styled';
import { dimensions } from '../../Common/variables';
import { SocialMediaData } from '../../common/models';

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

  & .social-icon img {
    object-position: left center;
    -webkit-transition: all 0s ease-in-out 0s;
    -moz-transition: all 0s ease-in-out 0s;
    -o-transition: all 0s ease-in-out 0s;
    transition: all 0s ease-out 0.1s !important;
    max-width: none;
    width: ${2 * dimensions.socialIcon.edge}px
    height: ${dimensions.socialIcon.edge}px;
  }

  & .social-icon:hover {
    opacity: 1;
  }

  & .social-icon:hover img,
  & .social-icon img:hover {
      object-position: -${dimensions.socialIcon.edge}px center;
  }
`;

interface SocialIconsOwnProps {
    socialMediaData: SocialMediaData[];
}

const SocialIcons: React.FC<SocialIconsOwnProps> = ({ socialMediaData }) => (
    <StyledSocialIconsSection>
        {socialMediaData.map((item, key) => renderSocialIcon(key, item))}
    </StyledSocialIconsSection>
);

export function renderSocialIcon(key: number, item: SocialMediaData) {
  return (
    <a 
      href={item.url} 
      target="_blank" 
      rel="noopener noreferrer"
      key={key} 
      className="social-icon"
    >
      <img
        alt={`${item.imageAltText}`}
        title={`${item.imageAltText}`}
        src={item.imageSourceUrl}
        width={2 * dimensions.socialIcon.edge}
        height={dimensions.socialIcon.edge}
      />
    </a>
  );
}

export default SocialIcons;