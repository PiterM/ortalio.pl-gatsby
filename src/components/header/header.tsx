import * as React from 'react'
import { connect } from 'react-redux';
import styled from '@emotion/styled'
import { colors, fonts } from '../../Common/variables';
import { StoreState, LayoutOptionsState } from '../../store/StoreState';
import './Header.scss';

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
`;

const StyledHeaderTitle = styled.header`
  display: inline-block;
  margin-bottom: 20px;
  letter-spacing: 6px;

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
`;

interface HeaderOwnProps {
  intro: string;
  title: string;
  description: string;
}

interface HeaderMappedProps {
  layoutOptions: LayoutOptionsState;
}

type HeaderProps = HeaderOwnProps & HeaderMappedProps;

export class Header extends React.Component<HeaderProps> {
  render() {
    let { intro, description } = this.props;
    const { title, layoutOptions } = this.props;

    description = layoutOptions.columnsNumber <= 4 
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
          <div dangerouslySetInnerHTML={{ __html: description }} />
        </StyledSubHeader>
      </StyledHeaderDiv>
    );
  }
}

const mapStateToProps: any = (store: StoreState): HeaderMappedProps => ({
  layoutOptions: store.layoutOptions,
});

export default connect<HeaderMappedProps>(mapStateToProps)(Header);