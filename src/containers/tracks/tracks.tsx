import * as React from "react";
import { colors, dimensions } from '../../common/variables';
import styled from '@emotion/styled';

const NoTracksInfo = styled.p({
  textAlign: 'center',
  width: '100%',
  marginTop: 100
});

const StyledPage = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 2fr);
  text-align: center;
  padding-bottom: ${dimensions.mediaPlayerHeight.mini}px;
  margin-top: 50px;
`;

const StyledPageColumn = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    flex-direction: column;
    width: auto;

    & + & {
        border-left: 1px solid ${colors.newspaperText};
    }
`;

export interface TracksProps {
  tracks: any;
}

const Tracks: React.FC<TracksProps> = ({ tracks }: any) => {
    if (!tracks || !tracks.length ) {
        return <NoTracksInfo>Sorry. No content here yet.</NoTracksInfo>;
    }
    return 
};

export default Tracks;
