import * as React from 'react';
import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { NextPreviousTrackMode } from './player-constants';
import styles from '../../gatsby-plugin-theme-ui/index';
import { playPreviousTrack, playNextTrack } from './player-actions';
const { images } = styles;

interface NextPreviousButtonProps {
    mode: NextPreviousTrackMode;
}

const NextPreviousButton = styled.div(({ mode }: NextPreviousButtonProps) => {
    let opacity = 1;
    let size = '40%';
    let backgroundImage = mode === NextPreviousTrackMode.Next ? images.nextIcon : images.previousIcon;
    let backgroundSize = '102% 102%';
    let backgroundSizeLoadingActive =  '85% 85%';
    
    return {
      background: `transparent url('${backgroundImage}') center center no-repeat`,
      backgroundSize,
      opacity,
      transition: 'all 0.05s ease, background 0.05s ease-in-out',
      position: 'absolute',
      width: size,
      height: size,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      cursor: 'pointer',
      ":active": {
        backgroundSize: backgroundSizeLoadingActive
      }
}});

const PlayerNextPreviousButtonContainer = styled.div({
    position: 'relative',
    height: '90px',
    width: '90px',
    margin: '0 15px'
});

interface PlayerNextPreviousButtonProps {
    mode: NextPreviousTrackMode;
}

const PlayerNextPreviousTrackButton: React.FC<PlayerNextPreviousButtonProps> = ({ mode }) => {
    const dispatch = useDispatch();
    const swithToNeighbourTrack = () => { 
        mode === NextPreviousTrackMode.Next && dispatch(playNextTrack());
        mode === NextPreviousTrackMode.Previous && dispatch(playPreviousTrack());
    }

    return (
        <PlayerNextPreviousButtonContainer>
            <NextPreviousButton 
                onClick={swithToNeighbourTrack}
                mode={mode}
            />
        </PlayerNextPreviousButtonContainer>
    );
}

export default PlayerNextPreviousTrackButton;
