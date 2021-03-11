import * as React from 'react'
import styled from '@emotion/styled'

const FooterCopyright = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 14px;
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