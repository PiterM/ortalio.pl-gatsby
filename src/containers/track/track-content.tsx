import * as React from "react";
import styled from "@emotion/styled";
import styles from '../../gatsby-plugin-theme-ui/index';
import { trackTitleHelper } from "../../common/trackTitleHelper";
const { colors } = styles;

const CardContent = styled.div({
  width: 400,
  maxWidth: 400,
  padding: "0.5rem",
  flex: "1",
  textAlign: "right",
});

const StyledTitle = styled.h1({
  margin: "0.5rem 0",
});

const StyledPrice = styled.h2({
  margin: "0.5rem 0",
  fontStyle: 'italic'
});

const StyledDescription = styled.div({
  margin: "0.5rem 0",
});

const StyledTechInfo = styled.div({
  margin: "0.5rem 0",
  fontWeight: 900
});

const StyledLink = styled.a({
  color: '#000',
  margin: "0.5rem 0",
  textDecoration: 'none',
  ":hover, :active": {
    color: colors.cartButton
  }
});

export interface TrackContentProps {
    track: any;
}

const TrackContent: React.FC<TrackContentProps> = ({ track }) => {
  const { description, shortTitle, title, price, previewUrl, bpm, key, duration } = track?.node?.ortalioMusicTrack;
  const trackDescription = {
    __html: description
  };
  const trackTechInfo = {
    __html: `${duration} / ${bpm} BPM / ${key} / with stems`
  };

  const trackTechInfo2 = {
    __html: `mp3 320kbps + wav 24bit 48kHz`
  };
  return (
    <CardContent>
      <StyledTitle>
        {trackTitleHelper(shortTitle, title)}
      </StyledTitle>
      <StyledPrice>
        {`price: $${price.toFixed(2)}`}
      </StyledPrice>
      <StyledDescription
        dangerouslySetInnerHTML={trackDescription}
      />
      <StyledTechInfo
        dangerouslySetInnerHTML={trackTechInfo}
      />
      <StyledTechInfo
        dangerouslySetInnerHTML={trackTechInfo2}
      />
      <StyledLink
        href={previewUrl}
        target="_blank"
      >
        &#187;{` Listen on SoundCloud `}&#171;
      </StyledLink>
    </CardContent>
  );
};

export default TrackContent;
