import merge from "lodash.merge";
import typography from "./typography";
import styles from "./styles";

export default merge(typography, {
  images: {
    playIcon: '/images/play-icon.svg',
    pauseIcon: '/images/pause-icon.svg',
    loopOneIcon: '/images/loop-one-icon.svg',
    loopAllIcon: '/images/loop-all-icon.svg',
    loaderIcon: '/images/loader-icon.svg',
    closeIcon: '/images/close-icon.svg',
    player: '/images/bg-pattern.png',
    nextIcon: '/images/next-icon.svg',
    previousIcon: '/images/previous-icon.svg',
    soundcloudLogo: '/images/soundcloud-logo.png',
    playIndicator: '/images/play-indicator.svg',
    sandClock: 'images/sand-clock.svg'
  },
  colors: {
    text: "rgb(0,0,0,0.75)",
    background: "#F0F5F6",
    cartButton: 'orange',
    cartQuantity: 'red',
    trackTitle: '#e57702',
    neutral: '#dadada',
    grey: '#888',
  },
  fonts: {
    heading: "Work Sans, serif",
    body: "sans-serif",
    weatherForecast: 'sans-serif'
  },
  fontWeights: {
    body: 400,
    heading: 700
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125
  },
  trackCardSize: {
    inGrid: 288,
    alone: 400
  },
  styles
});
