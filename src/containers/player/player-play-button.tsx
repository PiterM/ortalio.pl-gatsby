import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentTrack } from './player-selectors';
import { playPauseTrack } from './player-actions';
import styled from '@emotion/styled';
import { TrackPlayStatus } from '../track/track-models';
import PlayPauseButton from '../../components/play-button/play-button';

const PlayPauseButtonContainer = styled.div({
    position: 'relative',
    height: '90px',
    width: '90px',
    margin: '0 15px'
});

interface PlayerPlayPauseButtonProps {
    id: string;
}

const PlayerPlayPauseButton: React.FC<PlayerPlayPauseButtonProps> = ({ id }) => {
    const dispatch = useDispatch();
    const { status } = useSelector(getCurrentTrack);

    return (
        <PlayPauseButtonContainer>
            <PlayPauseButton 
                onClick={() => status !== TrackPlayStatus.Loading && dispatch(playPauseTrack(id))}
                trackStatus={status}
                blink={status === TrackPlayStatus.Paused}
            />
        </PlayPauseButtonContainer>
    );
}

export default PlayerPlayPauseButton;