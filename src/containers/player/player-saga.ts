import { put, ForkEffect, takeLatest, select } from "redux-saga/effects";
import ACTION_TYPES from './player-action-types';
import { PlayPauseTrack, playPauseTrack, stopPlayback } from "./player-actions";
import { LoopMode } from "./player-constants";
import { getLoopMode, getCurrentTrack, getTracks } from './player-selectors';
import { setWindowLocationHash } from '../../common/common-helpers';

const getNeighbourTrackId = (tracks: any, currentId: string, vector: number) => {
    const tracksArray: any = Object.values(tracks);
    const currentArrayKey = tracksArray.findIndex((item: any) => item.id === currentId);
    let nextArrayKey = currentArrayKey + vector;
    nextArrayKey = nextArrayKey < 0 ? tracksArray.length + nextArrayKey : nextArrayKey;
    nextArrayKey = nextArrayKey < tracksArray.length && nextArrayKey >= 0 ? nextArrayKey : tracksArray.length % nextArrayKey;
    return tracksArray[nextArrayKey].id;
};

const getNextTrackId = (tracks: any, currentId: string) => getNeighbourTrackId(tracks, currentId, 1);
const getPreviousTrackId = (tracks: any, currentId: string) => getNeighbourTrackId(tracks, currentId, -1);

export function* playNeighbourTrack(tracks: any, currentId: string, getCalculatedTrackId: (tracks: any, currentId: string) => string) {
    const newTrackId = getCalculatedTrackId(tracks, currentId);
    if (newTrackId) {
        yield put(playPauseTrack(currentId));
        yield put(playPauseTrack(newTrackId)); 
        yield scrollToPlayedTrack(newTrackId);
    } else {
        //not reached rather
        yield put(stopPlayback());
    }
}

export function* playNextTrack() {
    const tracks = yield select(getTracks);
    const { details: { id }} = yield select(getCurrentTrack);
    yield playNeighbourTrack(tracks, id, getNextTrackId);
}

export function* playPreviousTrack() {
    const tracks = yield select(getTracks);
    const { details: { id }} = yield select(getCurrentTrack);
    yield playNeighbourTrack(tracks, id, getPreviousTrackId);
}

export function* decideWhatPlayNext() {
    const loopMode = yield select(getLoopMode);
    const { details: { id }} = yield select(getCurrentTrack);

    switch (loopMode) {
        case (LoopMode.LoopAll):
            if (id) {
               yield playNextTrack();
            }
            break;            
        case (LoopMode.LoopOne):
            if (id) {
                yield put(playPauseTrack(id));
                yield put(playPauseTrack(id));
            } else {
                //not reached rather
                yield put(stopPlayback());
            }
            break;
        case (LoopMode.Off):
        default:
            yield put(stopPlayback());
    }
}

export function* scrollToPlayedTrack(newTrackId: string) {
    const tracks = yield select(getTracks);
    const newCurrentTrack = tracks[newTrackId];
    newCurrentTrack?.slug && setWindowLocationHash(newCurrentTrack.slug);
}

export function* watchPlayerActions(): IterableIterator<ForkEffect> {
    yield takeLatest(ACTION_TYPES.DECIDE_WHAT_PLAY_NEXT, decideWhatPlayNext);
    yield takeLatest(ACTION_TYPES.PLAY_NEXT_TRACK, playNextTrack);
    yield takeLatest(ACTION_TYPES.PLAY_PREVIOUS_TRACK, playPreviousTrack);
}