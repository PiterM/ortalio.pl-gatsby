import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { togglePlayerVolume, trackSeekTo } from './player-actions';
import { TimerMode } from './player-constants';
import Slider from '@material-ui/core/Slider';
import { VolumeUp, VolumeDown } from '@material-ui/icons';
import styled from '@emotion/styled';
import styles from '../../gatsby-plugin-theme-ui/index';
import { getLayoutColumnsNumber } from '../home-page/home-page-selectors';
const { colors } = styles;
const { useState } = React;

const PlayerSlider = styled(Slider)({
    "&.MuiSlider-root": { 
        color: colors.cartButton
    }
});

const PlayerProgressGrid = styled.div({
    display: 'grid',
    gridTemplateColumns: '1fr 7fr 3fr',
    alignItems: 'center',
    height: 75,
    "@media (max-width: 960px)": {
      gridTemplateColumns: '1fr 3fr',
    }
});

interface VolumeContainerProps {
  disabled: boolean;
}

const VolumeContainer = styled.span(({ disabled }: VolumeContainerProps) => {
  const fill = disabled ? colors.neutral : '#000';
  return {
    cursor: 'pointer',
    textAlign: 'center',
    marginRight: 20,
    "& svg": {
        verticalAlign: 'middle',
        fill
    },
  }
});

const Timer = styled.div({
  textAlign: 'center',
  width: '100%',
  fontFamily: 'Space Mono, monospace',
  cursor: 'pointer',
  "& p": {
    display: 'inline',
    margin: 0,
    padding: 0
  },
  "@media (max-width: 1800px)": {
    fontSize: '16px',
    "& p": {
      display: 'block',
      "> span": {
        display: 'none'
      }
    }
  },
  "@media (max-width: 1280px)": {
    fontSize: '14px',
  }
});

const PlayerSliderContainer = styled.div({
  display: 'inline-grid',
  alignContent: 'center',
  height: '100%',
  "@media (max-width: 960px)": {
    display: 'none'
  }
});

interface PlayerProgressSliderProps {
    progress: number;
    elapsedTime: string;
    remainingTime: string;
    disabled: boolean;
    volumeDisabled: boolean;
    loadedTime: string;
    muted: boolean;
}

const PlayerProgressSlider: React.FC<PlayerProgressSliderProps> = ({ 
    progress, 
    elapsedTime, 
    remainingTime,
    loadedTime, 
    disabled, 
    volumeDisabled, 
    muted 
  }) => {
  const dispatch = useDispatch();
  const [percent, setPercent] = useState(0);
  const [mouseDown, setMouseDown] = useState(false);
  const [timerMode, setTimerMode] = useState(TimerMode.RemainingTime);

  const layoutColumnsNumber = useSelector(getLayoutColumnsNumber);

  const handleSliderChange = (event: any, percent: number) => setPercent(percent);
  const handleMouseDown = () => setMouseDown(true);
  const handleMouseUp = () => {
    dispatch(trackSeekTo(percent / 100));
    setMouseDown(false);
  };
  const handleVolumeChange = () => !disabled && dispatch(togglePlayerVolume());
  const toggleTimerMode = () => {
    const mode = timerMode === TimerMode.ElapsedTime ? TimerMode.RemainingTime : TimerMode.ElapsedTime;
    setTimerMode(mode);
  }

  const currentProgress = mouseDown ? percent : progress;
  const digitsSeparator = layoutColumnsNumber > 4 ? '&nbsp;/' : '';

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
        <Timer
          onClick={() => toggleTimerMode()}
        >
          { timerMode === TimerMode.ElapsedTime && elapsedTime.trim() &&
              <p 
                  dangerouslySetInnerHTML={{ __html: `+${elapsedTime}` }}
              />
          }
          { timerMode === TimerMode.RemainingTime && remainingTime.trim() &&
              <p 
                  dangerouslySetInnerHTML={{ __html: `-${remainingTime}` }}
              />
          }
          <p 
              dangerouslySetInnerHTML={{ __html: `<span>${digitsSeparator}</span>&nbsp;${loadedTime}` }}
          />
        </Timer>
      </PlayerProgressGrid>
  );
};

export default PlayerProgressSlider;
