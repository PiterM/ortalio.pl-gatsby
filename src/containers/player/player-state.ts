import { TrackPlayStatus } from "../track/track-models";
import { LoopMode, TimerMode } from './player-constants';

export type TracksState = any;

export interface CurrentTrackState {
    details: any;
    playing: boolean;
    paused: boolean;
    actionPending: boolean;
    status: TrackPlayStatus;
    progress: ProgressData;
    errorPlaying: boolean;
}

export interface ProgressData {
    data: any;
    fraction: number;
    seeking: boolean;
}

export interface PlayerState {
    tracks: TracksState;
    currentTrack?: CurrentTrackState;
    muted: boolean;
    loopMode: LoopMode;
    timerMode: TimerMode;
    playerVisible: boolean;
    errorPlaying: boolean;
}