/* eslint-disable max-len */

export const colors = {
    brand: '#777',
    lilac: '#9d7cbf',
    accent: '#ffb238',
    success: '#37b635',
    warning: '#ec1818',
    ui: {
      bright: '#e0d6eb',
      light: '#f5f3f7',
      whisper: '#fbfafc'
    },
    code: '#fcf6f0',
    gray: {
      dark: 'hsla(270, 17.119554496%, 0%, 0.92)',
      copy: 'hsla(270, 15.797828016000002%, 0%, 0.88)',
      calm: 'rgba(0, 0, 0, 0.54)'
    },
    white: '#fff',
    black: '#000',
    newspaperPaper: '#f9f7f1',
    newspaperPaperHovered: '#f3f1ea',
    newspaperText: '#2f2f2f',
    audioItemPlayerBackground: '#fff',
    mediaPlayer: {
      background: '#f9f7f1'
    }
  }
  
  export const fonts = {
    sansSerif:
      'Arial, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", Arial, sans-serif',
    serif: '"Playfair Display", Georgia, "Times New Roman", Times, serif',
    monospace: 'Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace, monospace',
    headline: '"Droid Serif", Georgia, "Times New Roman", Times, serif',
    trackTitle: 'Georgia, Times, serif',
  }
  
  export const breakpoints = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200
  }
  
  export const widths = {
    md: 720,
    lg: 960,
    xl: 1140
  }
  
  export const dimensions = {
    fontSize: {
      small: 12,
      regular: 14,
      forecast: 16,
      large: 18,
      extraLarge: 24,
      smallTitle: 30,
      title: 36,
      bigTitle: 42,
    },
    fontWeight: {
      semiBold: 400,
      bold: 700
    },
    headingSizes: {
      h1: 2.441,
      h2: 1.953,
      h3: 1.563,
      h4: 1.25
    },
    lineHeight: {
      regular: 1.45,
      heading: 1.2
    },
    width: {
      headline: '20%',
    },
    containerPadding: 1.5,
    audioItemPlayer: {
      height: 50,
    },
    socialIcon: {
      edge: 50
    },
    homePage: {
      columnsNumber: 5,
    },
    mediaPlayerHeight: {
      mini: 30,
      small: 162,
      medium: 400,
      compact: 90,
    },
    mediaPlayer: {
      playPauseControlExtendedSize: 20,
      playPauseControlCompactSize: 40,
      buttonsMarginExtended: 10,
      buttonsMarginCompact: 20,
      timerMinWidthCompact: 105,
      timerMinWidthExtended: 100,
    }
  }
  
  export const heights = {
    header: 60
  }
  
  export const transition = {
    duration: '.1s'
  }
  
  export const audioItemHeaderTextVariants = [
    {
      top: {
        font: fonts.trackTitle,
        fontWeight: dimensions.fontWeight.semiBold,
        fontSize: dimensions.fontSize.title,
        fontStyle: 'italic',
        textTransform: 'none',
      },
      bottom: {
        font: fonts.trackTitle,
        fontWeight: dimensions.fontWeight.bold,
        fontSize: dimensions.fontSize.regular,
        fontStyle: 'normal',
        textTransform: 'uppercase',
      }
    },
    {
      top: {
        font: fonts.trackTitle,
        fontWeight: dimensions.fontWeight.semiBold,
        fontSize: dimensions.fontSize.smallTitle,
        fontStyle: 'italic',
        textTransform: 'uppercase',
      },
      bottom: {
        font: fonts.trackTitle,
        fontWeight: dimensions.fontWeight.bold,
        fontSize: dimensions.fontSize.regular,
        fontStyle: 'normal',
        textTransform: 'none',
      }
    },
  ];
  