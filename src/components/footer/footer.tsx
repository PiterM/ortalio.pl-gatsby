import * as React from 'react'
import { connect } from 'react-redux';
import styled from '@emotion/styled'
import { colors, fonts } from '../../common/variables';
import { StoreState, LayoutOptionsState } from '../../store/StoreState';
import styles from '../../gatsby-plugin-theme-ui';

const FooterCopyright = styled.div`
  text-align: center;
  position: relative;
  padding: 20px;
  font-size: 16px;
`;

const Footer: React.FC = () => {
    const yearDate = (new Date()).getFullYear();
    return (
      <FooterCopyright>
          <p>Copyright &copy; {yearDate} Piotr Markiewicz</p>
      </FooterCopyright>    
    );
}

export default Footer;