import styled from '@emotion/styled';
import styles from '../../gatsby-plugin-theme-ui';
import { TrackPlayStatus } from '../../containers/track/track-models';
const { colors, images } = styles;

interface PlayButtonLayerProps {
    trackStatus: TrackPlayStatus;
    blink: boolean;
}

export default styled.div(({ trackStatus, blink }: PlayButtonLayerProps) => {
    const { Playing, Paused, Loading } = TrackPlayStatus;
    const opacity = 1;
    const backgroundColor = '#fff';
    let size = '80%';
    let backgroundImage;
    let backgroundSize = '102% 102%';
    let backgroundSizeLoadingActive =  '85% 85%';
    const animation = blink ? 'blinking 1.5s infinite' : 'none';
    
    switch (trackStatus) {
      case (Playing):
        backgroundImage = images.pauseIcon;
        break;
      case (Loading):
        backgroundImage = images.loaderIcon;
        backgroundSize = '140% 140%';
        backgroundSizeLoadingActive = backgroundSize;
        break;
      case (Paused):
      default:
        backgroundImage = images.playIcon;
    }
    
    return {
      background: `${backgroundColor} url('${backgroundImage}') center center no-repeat`,
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
      borderRadius: '50% 50%',
      animation,
      ':hover': {
        opacity: 0.9,
      },
      ":active": {
        backgroundSize: backgroundSizeLoadingActive
      }
}});