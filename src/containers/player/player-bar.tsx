import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { togglePlayerVolume, trackSeekTo } from './player-actions';
import Slider from '@material-ui/core/Slider';
import { VolumeUp, VolumeDown } from '@material-ui/icons';
import styled from '@emotion/styled';
import styles from '../../gatsby-plugin-theme-ui/index';
const { colors } = styles;
const { useState } = React;

const PlayerSlider = styled(Slider)({
    "&.MuiSlider-root": { 
        color: colors.cartButton
    }
});

const PlayerProgressGrid = styled.div({
    display: 'grid',
    gridTemplateColumns: '1fr 8fr 3fr',
    alignItems: 'center',
    height: 75
});

interface VolumeContainerProps {
  disabled: boolean;
}

const VolumeContainer = styled.span(({ disabled }: VolumeContainerProps) => {
  const fill = disabled ? colors.neutral : '#000';
  return {
    cursor: 'pointer',
    textAlign: 'center',
    "& svg": {
        verticalAlign: 'middle',
        fill
    }
  }
});

const Timer = styled.div({
  textAlign: 'center',
  width: '100%',
  fontFamily: 'Space Mono, monospace'
});

const PlayerSliderContainer = styled.div({
  display: 'inline-grid',
  alignContent: 'center',
  height: '100%',
});

interface PlayerProgressSliderProps {
    progress: number;
    elapsedTime: string;
    disabled: boolean;
    volumeDisabled: boolean;
    loadedTime: string;
    muted: boolean;
}

const PlayerProgressSlider: React.FC<PlayerProgressSliderProps> = ({ progress, elapsedTime, loadedTime, disabled, volumeDisabled, muted }) => {
  const dispatch = useDispatch();
  const [percent, setPercent] = useState(0);
  const [mouseDown, setMouseDown] = useState(false);

  const handleSliderChange = (event: any, percent: number) => setPercent(percent);
  const handleMouseDown = () => setMouseDown(true);
  const handleMouseUp = () => {
    dispatch(trackSeekTo(percent / 100));
    setMouseDown(false);
  };
  const handleVolumeChange = () => !disabled && dispatch(togglePlayerVolume());

  const currentProgress = mouseDown ? percent : progress;

  return (
      <PlayerProgressGrid>
        <VolumeContainer
          disabled={volumeDisabled}
        >
        { muted 
          ? <VolumeDown 
                onClick={handleVolumeChange}
            /> 
          : <VolumeUp 
                onClick={handleVolumeChange}
            /> 
        }
        </VolumeContainer>
        <PlayerSliderContainer>
          <PlayerSlider
              onChange={handleSliderChange}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              aria-labelledby="input-slider"
              defaultValue={0}
              value={currentProgress}
              min={0}
              max={100}
              step={0.1}
              disabled={disabled}
          />
        </PlayerSliderContainer>
        <Timer>{elapsedTime}{loadedTime}</Timer>
      </PlayerProgressGrid>
  );
};

export default PlayerProgressSlider;
