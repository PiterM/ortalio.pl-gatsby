import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactPlayer from 'react-player';
import styles from '../../gatsby-plugin-theme-ui';
import * as variables from '../../common/variables';
import { setWindowLocationHash, timeFormatHelper } from '../../common/common-helpers';
import { getCurrentTrack, getPlayerMuted, getLoopMode } from './player-selectors';
import { 
    playPauseTrackSuccess, 
    playPauseTrackFailure, 
    decideWhatPlayNext,
    setTrackProgress,
    trackSeekToSuccess,
    setLoopMode,
    stopPlayback
} from './player-actions';
import PlayerPlayPauseButton from './player-play-button';
import PlayerProgressSlider from './player-bar';
import styled from '@emotion/styled';
import { LoopMode, NextPreviousTrackMode, AudioSource } from './player-constants';
import PlayerNextPreviousTrackButton from './player-next-previous-button';
import Img from 'gatsby-image';
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
    gridTemplateColumns: '0.5fr 3fr 1fr 0.5fr 5fr 2fr',
    "&.player-visible": {
        bottom: 0
    },
    alignContent: 'center',
});

const TrackTitleItem = styled.div({
    height: '100%',
    width: '100%',
    display: 'table',
});

const TrackThumbnailContainer = styled.div({
    display: 'inline-grid',
    alignContent: 'center',
    backgroundColor: '#fff',
    position: 'relative'
});

const PlayerItemInline = styled.div({
    display: 'inline-grid',
    alignContent: 'center',
    padding: '5px 5px 2px 0'
});

const PlayerControls = styled.div({
    display: 'flex',
    alignContent: 'center',
    padding: '5px 5px 2px 0',
    "& div": {
        padding: 0,
        margin: 0,
    }
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
    height: '100%'
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
    }
});

const TrackTitle = styled.p({
    letterSpacing: '2px',
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
    background: `url('${images.closeIcon}') center center no-repeat`,
    backgroundSize: '120% 120%',
    cursor: 'pointer',
    border: '1px solid transparent',
    transition: 'border 0.5s ease-in-out',
    ":active": {
        backgroundSize: '65% 65%'
    },
    ":hover": {
        borderColor: '#000'
    },
});

interface LoopButtonProps {
    mode: LoopMode;
}
  
const LoopButton = styled.span(({ mode }: LoopButtonProps) => {
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
    const [trackInProgress, setTrackInProgress] = useState(false);
    const [playerRendered, setPlayerRendered] = useState(false);
    
    const soundcloudUrl = currentTrack?.details?.soundcloudUrl;
    const youtubeUrl = currentTrack?.details?.youtubeUrl;
    const previewUrl = 'https://soundcloud.com/ortaliomusic/evening-dub-cinematic-groovy';
    const audioSource = soundcloudUrl && !youtubeUrl ? AudioSource.Soundcloud : AudioSource.Youtube;
        //soundcloudUrl || youtubeUrl;
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

    const actionFinishedSuccessfully = () => dispatch(playPauseTrackSuccess());
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

    const { progress, playing, paused, actionPending } = currentTrack;
    const playerClass = playing || paused ? 'player-visible' : undefined;
    const { 
        featuredImage: { imageFile: { childImageSharp: { fixed }}}, 
        title, 
        slug,
    } = currentTrack.details;

    let elapsedTime = '      ';
    let remainingTime = elapsedTime;
    let loadedTime = '/      ';
    if (progress?.data?.playedSeconds) {
        loadedTime = ` / ${timeFormatHelper(Math.round(Number(duration)))}`;
        elapsedTime = timeFormatHelper(Math.round(Number(progress.data.playedSeconds)));
        remainingTime = timeFormatHelper(Math.round(Number(duration - progress.data.playedSeconds)));
    }

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
                        <TrackTitle
                            onClick={() => setWindowLocationHash(slug)}
                        >
                            {title}
                        </TrackTitle>
                    </TrackTitleItem>

                    <PlayerControls>
                        <PlayerNextPreviousTrackButton 
                            mode={NextPreviousTrackMode.Previous}
                        />

                        <PlayerPlayPauseButton id={trackId}/>
                        
                        <PlayerNextPreviousTrackButton 
                            mode={NextPreviousTrackMode.Next}
                        />
                    </PlayerControls>

                    <PlayerItemInline>
                        <LoopButton
                            mode={loopMode}
                            onClick={changeLoopMode}
                        />
                    </PlayerItemInline>

                    <PlayerItemInline>
                        <PlayerProgressSlider 
                            progress={Math.ceil(progress.fraction * 100)}
                            elapsedTime={elapsedTime}
                            remainingTime={remainingTime}
                            loadedTime={loadedTime}
                            disabled={actionPending}
                            volumeDisabled={actionPending || !trackInProgress}
                            muted={playerMuted || !trackInProgress}
                        />
                    </PlayerItemInline>

                    <CloseAndEmbedItems>
                        <ClosePlayerIcon 
                            onClick={onStopPlayback}
                        />
                        <EmbedIconContainer>
                            <EmbedViewIcon 
                                audioSource={audioSource}
                            />
                        </EmbedIconContainer>
                    </CloseAndEmbedItems>

                </PlayerContainer>
                { playerRendered && previewUrl && 
                    <ReactPlayer 
                        ref={playerRef}
                        style={{display: 'none'}}
                        url={previewUrl}
                        playing={currentTrack.playing}
                        volume={0.8}
                        muted={playerMuted || !trackInProgress}
                        onStart={actionFinishedSuccessfully}
                        onPlay={actionFinishedSuccessfully}
                        onPause={actionFinishedSuccessfully}
                        onEnded={onTrackFinish}
                        onError={actionFinishedWithError}
                        onProgress={setProgress}
                        onDuration={setDuration}
                    />
                }
            </>
    );
};

export default Player;