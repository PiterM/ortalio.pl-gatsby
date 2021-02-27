import { TrackPlayStatus } from "../track/track-models";
import { LoopMode } from './player-constants';

export type TracksState = any;

export interface CurrentTrackState {
    details: any;
    playing: boolean;
    paused: boolean;
    actionPending: boolean;
    status: TrackPlayStatus;
    progress: ProgressData;
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
}