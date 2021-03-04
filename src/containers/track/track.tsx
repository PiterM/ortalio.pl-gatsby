import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { getCurrentTrack } from '../player/player-selectors';
import { colors, dimensions } from '../../common/variables';
import TrackHeader from './track-header';
import { TrackPlayStatus } from './track-models';
import TrackContent from './track-content';
import { playPauseTrack } from '../player/player-actions';
import styles from '../../gatsby-plugin-theme-ui';
import './track.scss';

const { images } = styles;

const StyledTrack = styled.section`
  line-height: ${dimensions.lineHeight.regular};
  padding: 0 1% 0 1%;
  padding-bottom: 50px;
  border-top: 1px solid transparent;
  border-bottom: 1px solid transparent;
  width: 100%;
  position: relative;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                        supported by Chrome, Opera and Firefox */
  
  &:hover {
    background-color ${colors.newspaperPaperHovered};
    border-top: 1px solid ${colors.newspaperText};
    border-bottom: 1px solid ${colors.newspaperText};
    color: #000;
    cursor: pointer;
  }

  .play-icon {
    position: absolute;
    top: 5px;
    left: 5px;
    width: 10px;
    height: 10px;

    animation: blinking 1.5s infinite;
  }

  &:hover .play-icon, &:active .play-icon, &.selected .play-icon {
      background: url('${images.playIndicator}') top left no-repeat;
  }

  &.Loading .play-icon {    
    background: url('${images.sandClock}') top left no-repeat;
  }

  &.Playing .play-icon {    
    background: url('${images.playIndicator}') top left no-repeat;
    animation: none;
  }

  &.Paused .play-icon {    
    background: url('${images.playIndicator}') top left no-repeat;
  }

  &.Playing, &.Loading, &:active, &.selected {
    border-top: 1px solid ${colors.newspaperText};
    border-bottom: 1px solid ${colors.newspaperText};
    background-color: #fff;
    color: ${colors.black};
    -webkit-touch-callout: auto; /* iOS Safari */
    -webkit-user-select: auto; /* Safari */
    -khtml-user-select: auto; /* Konqueror HTML */
    -moz-user-select: auto; /* Old versions of Firefox */
    -ms-user-select: auto; /* Internet Explorer/Edge */
    user-select: auto; /* Non-prefixed version, currently
                          supported by Chrome, Opera and Firefox */

  }

  &.Playing, &.Loading, &.selected {
    cursor: text;
  }
`;

interface TrackProps {
  id: string;
  index: number;
  title: string;
  slug: string;
  shortDescription: string;
  content?: string;
}

const Track: React.FC<TrackProps> = ({ 
  id,
  index, 
  title, 
  slug,
  shortDescription, 
  content, 
}) => {
  
    const dispatch = useDispatch();

    const currentTrack = useSelector(getCurrentTrack);
    const currentTrackId = currentTrack?.details?.id;
    const thisOneActive = currentTrackId === id;

    let trackClass = '';
    const { Loading, Playing, Paused } = TrackPlayStatus;
    if (thisOneActive && [Loading, Playing, Paused].includes(currentTrack?.status)) {
      trackClass = ` ${currentTrack.status}`;
    }

    const onTrackClick = () => !thisOneActive && dispatch(playPauseTrack(id));
    
    return (
      <StyledTrack
        className={`track${trackClass}`}
        onClick={() => onTrackClick()}
        id={slug}
      >
        <span className="play-icon"></span>
        <TrackHeader
          index={index}
          title={title}
          shortDescription={shortDescription}
        />
        <TrackContent
          content={content}
        />
      </StyledTrack>
    );
}

export default Track;