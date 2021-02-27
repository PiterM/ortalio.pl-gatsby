import * as React from 'react'
import styled from '@emotion/styled'

const StyledLayoutMain = styled.main``;

interface LayoutMainProps {
  className?: string
}

const LayoutMain: React.FC<LayoutMainProps> = ({ children, className }) => (
  <StyledLayoutMain className={className}>{children}</StyledLayoutMain>
)

export default LayoutMain
