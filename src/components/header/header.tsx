import * as React from 'react'
import { useSelector } from 'react-redux';
import styled from '@emotion/styled'
import { colors, fonts } from '../../common/variables';
import styles from '../../gatsby-plugin-theme-ui';
import { getLayoutColumnsNumber } from '../../containers/home-page/home-page-selectors';
import './header.scss';

const StyledHeaderDiv = styled.div`
  text-align: center;
  position: relative;
  padding: 20px;
`

const HeaderWrapperDiv = styled.div``;

const StyledHeaderWeatherForcastBox = styled.div`
  position: absolute;
  width: 18%;
  left: 40%;
  top: 20%;
  line-height: 20px;
  display: inline-block;
  margin: 0 50px 20px -360px;
  font-family: ${styles.fonts.body};
`;

const StyledHeaderTitle = styled.header`
  display: inline-block;
  margin-bottom: 20px;
  letter-spacing: 6px;
  margin: 0 auto;

  & h1 {
    font-family: ${fonts.headline}, serif;
    font-weight: 900;
    font-size: 80px;
    text-transform: uppercase;
  }
}
`;

const StyledHomePageLink = styled.a`
  color: ${colors.newspaperText};
  outline: none;

  &:hover {
    text-decoration: none;
  }
`;

const StyledSubHeader = styled.div`
  text-transform: uppercase;
  border-bottom: 2px solid #2f2f2f;
  border-top: 2px solid #2f2f2f;
  padding: 12px 0 12px 0;
  font-family: ${styles.fonts.weatherForecast};
`;

interface HeaderProps {
  intro: string;
  title: string;
  description: string;
}

const Header: React.FC<HeaderProps> = ({ intro, description: description, title }: HeaderProps) => {

    const columnsNumber = useSelector(getLayoutColumnsNumber);
    const headerDescription = columnsNumber <= 4 
      ? intro
      : description;
      
    return (
      <StyledHeaderDiv>
        <HeaderWrapperDiv>
          <StyledHeaderWeatherForcastBox
            className="site-intro"
          >
            <div dangerouslySetInnerHTML={{ __html: intro }} />
          </StyledHeaderWeatherForcastBox>
          <StyledHeaderTitle>
            <h1>
              <StyledHomePageLink 
                href="/" 
                className="site-header"
                data-text={title}
              >
                {title}
              </StyledHomePageLink>
            </h1>
          </StyledHeaderTitle>
        </HeaderWrapperDiv>
        <StyledSubHeader>
          <div dangerouslySetInnerHTML={{ __html: headerDescription }} />
        </StyledSubHeader>
      </StyledHeaderDiv>
    );
}

export default Header;