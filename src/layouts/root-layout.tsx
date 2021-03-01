import * as React from 'react';
import { Global, css } from '@emotion/react';
import styled from '@emotion/styled';
import normalize from '../common/normalize';

const StyledRootLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

interface RootLayoutProps {
  className?: string
}

const RootLayout: React.FC<RootLayoutProps> = ({ children, className }) => (
  <>
    <Global styles={() => css(normalize)} />
    <StyledRootLayout className={className}>{children}</StyledRootLayout>
  </>
)

export default RootLayout
