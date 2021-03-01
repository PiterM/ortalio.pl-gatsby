import * as React from 'react';
import styled from '@emotion/styled';

const StyledTrackText = styled.div`
  margin-top: 20px;
  text-align: center;
`;

interface TrackTextProps {
    content?: string;
}

const TrackContent: React.FC<TrackTextProps> = ({ content }) => {
  return content ? (
    <StyledTrackText
      className="audio-content"
    >
      <p dangerouslySetInnerHTML={{ __html: content }} />
    </StyledTrackText>
  ): null;
};

export default TrackContent;
