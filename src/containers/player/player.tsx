import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactPlayer from 'react-player';
import styles from '../../gatsby-plugin-theme-ui';
import * as variables from '../../common/variables';
import { setWindowLocationHash, timeFormatHelper } from '../../common/common-helpers';
import { getCurrentTrack, getPlayerMuted, getLoopMode, getPlayerVisible } from './player-selectors';
import { 
    playPauseTrackSuccess, 
    playPauseTrackFailure, 
    decideWhatPlayNext,
    setTrackProgress,
    trackSeekToSuccess,
    setLoopMode,
    stopPlayback,
    togglePlayerVisible,
    togglePlayPauseTrack
} from './player-actions';
import PlayerPlayPauseButton from './player-play-button';
import PlayerProgressSlider from './player-bar';
import styled from '@emotion/styled';
import { 
    LoopMode, 
    NextPreviousTrackMode, 
    AudioSource,
    youtubeConfig, 
    soundcloudConfig,
    playerVisibleHeight
} from './player-constants';
import PlayerNextPreviousTrackButton from './player-next-previous-button';
import Img from 'gatsby-image';
import { TrackPlayStatus } from '../track/track-models';
const { useEffect, useState } = React;
const { images, colors } = styles;

const PlayerContainer = styled.div({
    position: 'fixed',
    width: '100%',
    height: '100px',
    bottom: -100,
    left: 0,
    background: variables.colors.newspaperPaper,
    border: '3px solid #fff',
    transition: 'all 0.3s ease-in-out',
    display: 'grid',
    gridTemplateColumns: '0.5fr 3fr 1fr 0.5fr 6fr 2fr',
    "&.player-visible": {
        bottom: 0
    },
    alignContent: 'center',
    "@media (min-width: 1280px) and (max-width: 1800px)": {
        gridTemplateColumns: '0.5fr 3fr 1fr 0.5fr 4fr 3fr',
    },
    "@media (max-width: 1280px)": {
        gridTemplateColumns: '2fr 1fr 0.5fr 3fr 3fr',
    },
    "@media (max-width: 960px)": {
        gridTemplateColumns: '2fr 1fr 0.5fr 1fr 3fr',
    },
    "@media (max-width: 640px)": {
        gridTemplateColumns: '8fr 4fr',
    },
});

const StyledMediaPlayer = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 2;
    display: flex;
    border-top: 2px solid ${colors.white};

    background-color: rgba(249,247,241,1);
`;

const TrackTitleItem = styled.div({
    height: '100%',
    width: '100%',
    display: 'table',
    maxHeight: '100px',
    overflow: 'hidden',
    "@media (max-width: 1024px)": {
        height: '100px'
    },
    "@media (max-width: 640px)": {
        display: 'none'
    },
});

const TrackThumbnailContainer = styled.div({
    display: 'inline-grid',
    alignContent: 'center',
    backgroundColor: '#fff',
    position: 'relative',
    "@media (max-width: 1280px)": {
        display: 'none'
    },
    "@media (max-width: 640px)": {
        display: 'none'
    },
});

const PlayerItemInline = styled.div({
    display: 'inline-grid',
    alignContent: 'center',
    padding: '5px 5px 2px 0',
    "@media (max-width: 640px)": {
        display: 'none'
    },
});

const PlayerControls = styled.div({
    display: 'flex',
    alignContent: 'center',
    padding: '5px 5px 2px 0',
    "& div": {
        padding: 0,
        margin: 0,
    },
    "@media (max-width: 640px)": {
        display: 'flex',
        justifyContent: 'space-evenly'
    },
});

const TrackThumbnailLink = styled.div({
    height: '93px !important',
    width: '93px !important',
    position: 'relative',
    transition: 'all 0.5s ease',
});

const TrackThumbnail = styled(Img)({
    height: '100% !important',
    width: '100% !important',
    top: 0,
    left: 0,
});

const AudioSourceLink = styled.a({
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    cursor: 'pointer',
});

const EmbedIconContainer = styled.div({
    position: 'relative',
    width: '100%',
    height: '100%',
});

interface EmbedViewIconProps {
    audioSource: AudioSource;
}

const EmbedViewIcon = styled.span(({ audioSource }: EmbedViewIconProps) => {
    let audioSourceLogo = audioSource === AudioSource.Soundcloud 
        ? images.soundcloudLogo
        : images.youtubeLogo;

    return {
        width: '100%',
        height: '100%',
        background: `transparent url('${audioSourceLogo}') center center no-repeat`,
        backgroundSize: '50%',
        position: 'absolute',
        top: 0,
        left: 0,
        cursor: 'pointer',
        "@media (max-width: 1920px)": {
            backgroundSize: '30%'
        },
        "@media (max-width: 960px)": {
            backgroundSize: '50%'
        },
    }
});

const TrackTitle = styled.p({
    letterSpacing: '0.5px',
    fontWeight: 900,
    fontSize: '18px',
    height: '100%',
    backgroundColor: '#fff',
    padding: '0 20px',
    margin: 0,
    width: '100%',
    display: 'table-cell',
    verticalAlign: 'middle',
    textAlign: 'center',
    textDecoration: 'none',
    transition: 'all 0.5s ease',
    cursor: 'pointer',
    ": hover": {
        color: '#000'
    },
    "@media (max-width: 1600px)": {
        fontSize: '16px'
    },
    "@media (max-width: 1280px)": {
        fontSize: '14px',
        padding: 5
    }
});

const TrackTitleError = styled.p({
    letterSpacing: '0.5px',
    fontWeight: 900,
    fontSize: '18px',
    height: '100%',
    backgroundColor: '#fff',
    padding: '0 20px',
    margin: 0,
    width: '100%',
    color: 'red',
    display: 'table-cell',
    verticalAlign: 'middle',
    textAlign: 'center',
    textDecoration: 'none',
    transition: 'all 0.5s ease',
    "@media (max-width: 1600px)": {
        fontSize: '16px'
    },
    "@media (max-width: 1280px)": {
        fontSize: '14px',
        padding: 5
    }
});

const CloseAndEmbedItems = styled.div({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: '5px 5px 2px 0',
});

const ClosePlayerIcon = styled.div({
    width: 30,
    height: 30,
    padding: 10,
    background: `url('${images.closeIcon}') center center no-repeat`,
    backgroundSize: '120% 120%',
    cursor: 'pointer',
    border: '1px solid transparent',
    transition: 'border 0.5s ease-in-out',
    margin: '0 30px',
    ":active": {
        backgroundSize: '65% 65%'
    },
    ":hover": {
        borderColor: colors.closeButtonBorder
    },
    "@media (max-width: 1600px)": {
        backgroundSize: '150% 150%',
    },
    "@media (max-width: 960px)": {
        margin: 15,
    }
});

interface LoopButtonProps {
    mode: LoopMode;
    disabled: boolean;
}
  
const LoopButton = styled.span(({ mode, disabled }: LoopButtonProps) => {
    let icon, opacity;
    switch (mode) {
      case (LoopMode.LoopOne): 
        icon = images.loopOneIcon;
        opacity = 1;
        break;
      default:
      case (LoopMode.Off):
        opacity = 0.2;
      case (LoopMode.LoopAll):
        icon = images.loopAllIcon;
    }

    return {
        width: 72,
        height: 72,
        background: `transparent url('${icon}') center center no-repeat`,
        backgroundSize: '60% 60%',
        cursor: 'pointer',
        transition: 'all 0.05s ease',
        opacity,
         ":active": {
            backgroundSize: '52% 52%'
        },
        "@media (max-width: 640px)": {
            display: 'none'
        },
    }
});

const Player: React.FC = () => {
    let player: ReactPlayer;
    const playerRef = (p: ReactPlayer) => {
        player = p
    }

    const currentTrack = useSelector(getCurrentTrack);
    const loopMode = useSelector(getLoopMode);
    const playerMuted = useSelector(getPlayerMuted);
    const playerVisible = useSelector(getPlayerVisible);
    const [trackInProgress, setTrackInProgress] = useState(false);
    const [playerRendered, setPlayerRendered] = useState(false);
    
    const soundcloudUrl = currentTrack?.details?.soundcloudUrl;
    const youtubeUrl = currentTrack?.details?.youtubeUrl;
    const audioSource = soundcloudUrl && !youtubeUrl ? AudioSource.Soundcloud : AudioSource.Youtube;
    const previewUrl = audioSource === AudioSource.Soundcloud
        ? soundcloudUrl
        : youtubeUrl;

    const trackId = currentTrack?.details?.id;
    const seeking = currentTrack?.progress?.seeking;
    const dispatch = useDispatch();

    const [duration, setDuration] = useState(null);

    useEffect(() => {
        setPlayerRendered(false);
        setTimeout(
            () => { 
                setTrackInProgress(false);
                setPlayerRendered(true);
            },
            800
        );
    }, [trackId]);

    useEffect(() => {
        if (seeking && playerRef) { 
            player.seekTo(currentTrack?.progress?.fraction);
            dispatch(trackSeekToSuccess());
        }
    }, [seeking]);

    const setProgress = (progress: any) => {
        if (progress && !seeking) {
            !trackInProgress && setTrackInProgress(true);
            dispatch(setTrackProgress(progress));
        }
    };

    if (!currentTrack) {
        return <PlayerContainer />
    }

    const actionFinishedWithError = () => dispatch(playPauseTrackFailure());
    const onTrackFinish = () => { 
        setTrackInProgress(false);
        dispatch(decideWhatPlayNext());
    }

    const onStopPlayback = () => { 
        setTrackInProgress(false);
        dispatch(stopPlayback());
    }

    const changeLoopMode = () => dispatch(setLoopMode());

    const setPlayerVisible = () => dispatch(togglePlayerVisible());

    const { progress, playing, paused, actionPending, errorPlaying } = currentTrack;
    const playerClass = playing || paused ? 'player-visible' : undefined;
    const { 
        featuredImage: { imageFile: { childImageSharp: { fixed }}}, 
        title, 
        slug,
    } = currentTrack.details;

    let elapsedTime = '      ';
    let remainingTime = elapsedTime;
    let loadedTime = '      ';
    if (progress?.data?.playedSeconds) {
        loadedTime = `${timeFormatHelper(Math.round(Number(duration)))}`;
        elapsedTime = timeFormatHelper(Math.round(Number(progress.data.playedSeconds)));
        remainingTime = timeFormatHelper(Math.round(Number(duration - progress.data.playedSeconds)));
    }

    const togglePlay = () => { 
        if (currentTrack?.actionPending) {
            dispatch(playPauseTrackSuccess());
        } else {
            paused && dispatch(togglePlayPauseTrack());
        }
    }

    const togglePause = () => { 
        if (currentTrack?.actionPending) {
            dispatch(playPauseTrackSuccess());
        } else {
            playing && dispatch(togglePlayPauseTrack());
        }
    }

    const playerDisplayVisibilityStyle = playerVisible ? 'visible' : 'hidden';
    const playerDisplayStyles = {
        visibility: playerDisplayVisibilityStyle,
    };

    const config = {
        youtube: youtubeConfig,
        soundcloud: soundcloudConfig
    };

    const playerHeight = audioSource === AudioSource.Soundcloud
        ? playerVisibleHeight.soundcloudPlayerHeight
        : playerVisibleHeight.youtubePlayerHeight;

    const isTrackLoading = currentTrack?.status === TrackPlayStatus.Loading;
    const errorMessage = 'Sorry, error while streaming';

    return (
            <>
                <PlayerContainer className={playerClass}> 

                    <TrackThumbnailContainer>
                        <TrackThumbnailLink>
                            <TrackThumbnail fixed={fixed} />
                        </TrackThumbnailLink>
                        <AudioSourceLink 
                            href={previewUrl}
                            target="_blank"
                        />
                    </TrackThumbnailContainer>

                    <TrackTitleItem>
                        {errorPlaying 
                            ?   <TrackTitleError>
                                    {errorMessage}
                                </TrackTitleError>
                            :   <TrackTitle
                                        onClick={() => setWindowLocationHash(slug)}
                                    >
                                    {title}
                                </TrackTitle>
                        }
                    </TrackTitleItem>

                    <PlayerControls>
                        <PlayerNextPreviousTrackButton 
                            mode={NextPreviousTrackMode.Previous}
                            disabled={errorPlaying}
                        />

                        <PlayerPlayPauseButton 
                            id={trackId}
                            disabled={errorPlaying}
                        />
                        
                        <PlayerNextPreviousTrackButton 
                            mode={NextPreviousTrackMode.Next}
                            disabled={errorPlaying}
                        />
                    </PlayerControls>

                    <PlayerItemInline>
                        <LoopButton
                            mode={loopMode}
                            onClick={!errorPlaying && changeLoopMode}
                            disabled={errorPlaying}
                        />
                    </PlayerItemInline>

                    <PlayerItemInline>
                        <PlayerProgressSlider 
                            progress={Math.ceil(progress.fraction * 100)}
                            elapsedTime={elapsedTime}
                            remainingTime={remainingTime}
                            loadedTime={loadedTime}
                            disabled={actionPending || errorPlaying}
                            volumeDisabled={actionPending || !trackInProgress}
                            muted={playerMuted || !trackInProgress}
                        />
                    </PlayerItemInline>

                    <CloseAndEmbedItems>
                        <EmbedIconContainer>
                            <EmbedViewIcon 
                                audioSource={audioSource}
                                onMouseOver={() => !isTrackLoading && setPlayerVisible()}
                            />
                        </EmbedIconContainer>
                        <ClosePlayerIcon 
                            onClick={onStopPlayback}
                        />
                    </CloseAndEmbedItems>

                </PlayerContainer>
                { playerRendered && previewUrl && 
                <StyledMediaPlayer
                    style={playerDisplayStyles as any}
                    onMouseOut={() => setPlayerVisible()}
                >
                    <ReactPlayer 
                        ref={playerRef}
                        url={previewUrl}
                        playing={currentTrack.playing}
                        width="100%"
                        height={playerHeight}
                        volume={0.8}
                        config={config}
                        muted={playerMuted || !trackInProgress}
                        onStart={togglePlay}
                        onPlay={togglePlay}
                        onPause={togglePause}
                        onEnded={onTrackFinish}
                        onError={actionFinishedWithError}
                        onProgress={setProgress}
                        onDuration={setDuration}
                    />
                </StyledMediaPlayer>
                }
            </>
    );
};

export default Player;