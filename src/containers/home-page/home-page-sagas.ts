import { put, takeLatest, PutEffect, select, SelectEffect } from 'redux-saga/effects';
import {
    SetKeyDownInit,
    setKeyDownSuccess
} from './home-page-actions';
import ACTION_TYPES from './home-page-action-types';
import { getTracks, getCurrentTrack } from '../player/player-selectors';
import { getItemsGraph } from './home-page-selectors';
import { 
    playPauseTrack, 
    PlayerActions,
    setCurrentTrackError
} from "../player/player-actions";
import { KeyCodes } from '../../common/constants';
import { setWindowLocationHash } from '../../common/common-helpers';
import { ArrowKeyDirection } from '../player/player-constants';
import { TrackPlayStatus } from '../track/track-models';

type KeyDownCodeIterator = IterableIterator<PutEffect<any> | SelectEffect>;

export function* handleKeyDown(action: SetKeyDownInit): KeyDownCodeIterator {
    switch (action.payload) {
        case KeyCodes.Space:
            const currentTrack = yield select(getCurrentTrack);
            const currentTrackId = currentTrack?.details?.id;
            if (currentTrackId && currentTrack.status !== TrackPlayStatus.Loading) {
                yield put(playPauseTrack(currentTrackId));
            }
            break;
        case KeyCodes.ArrowRight:
            yield put({ type: ACTION_TYPES.SET_RIGHT_TRACK });
            break;
        case KeyCodes.ArrowLeft:
            yield put({ type: ACTION_TYPES.SET_LEFT_TRACK });
            break;
        case KeyCodes.ArrowUp:
            yield put({ type: ACTION_TYPES.SET_UPPER_TRACK });
            break;
        case KeyCodes.ArrowDown:
            yield put({ type: ACTION_TYPES.SET_LOWER_TRACK });
            break;
        default:
    }
    yield put(setKeyDownSuccess(action.payload));
}

const getNextItem = (): any => ({ 
    direction: ArrowKeyDirection.Right,
});

const getPreviousItem = (): any => ({ 
    direction: ArrowKeyDirection.Left,
});

const getUpperItem = (): any => ({ 
    direction: ArrowKeyDirection.Up,
});

const getLowerItem = (): any => ({ 
    direction: ArrowKeyDirection.Down,
});

export function selectNextTrack() {
    return selectCurrentTrack(getNextItem());
}

export function selectPreviousTrack() {
    return selectCurrentTrack(getPreviousItem()) ;
}

export function* selectUpperTrack() {
    yield selectCurrentTrack(getUpperItem());
}

export function* selectLowerTrack() {
    yield selectCurrentTrack(getLowerItem());
}

const getItemKeyById = (tracks: any, id: string): any => {
    return Object.keys(tracks).find(
        (key: string) => (tracks[key]).id === id
    );
}

type GetAllMediaDataIterator = IterableIterator<
    PutEffect<PlayerActions> | SelectEffect
>;

export function* selectCurrentTrack(getItem: any): GetAllMediaDataIterator {
    try {
        let tracks: any = yield select(getTracks);
        tracks = Object.values(tracks);

        if (tracks && tracks.length) {
            const itemsGraph: any = yield select(getItemsGraph);
            if (itemsGraph && itemsGraph.length) {
                const currentTrack: any = yield select(getCurrentTrack);
                const currentTrackId = currentTrack?.details?.id;
                const currentKey = getItemKeyById(tracks, currentTrackId);
                const firstItemId: string = tracks[0].id;
                const lastItemId: string = tracks[tracks.length - 1].id;
    
                let newKey;
                if (getItem.direction === ArrowKeyDirection.Left && currentTrackId === firstItemId) {
                    newKey = getItemKeyById(tracks, lastItemId);
                } else if (getItem.direction === ArrowKeyDirection.Right && currentTrackId === lastItemId) {
                    newKey = getItemKeyById(tracks, firstItemId);
                } else {
                    newKey = itemsGraph[currentKey][getItem.direction];
                }
                
                setWindowLocationHash(tracks[newKey].slug);
                yield put(playPauseTrack(tracks[newKey].id));
            }
        }
    } catch (error) {
        yield put(setCurrentTrackError(error.toString()))
    }
}

export function* watchKeyDown() {
    yield takeLatest(ACTION_TYPES.SET_KEY_DOWN_INIT, handleKeyDown);
    yield takeLatest(ACTION_TYPES.SET_RIGHT_TRACK, selectNextTrack);
    yield takeLatest(ACTION_TYPES.SET_LEFT_TRACK, selectPreviousTrack);
    yield takeLatest(ACTION_TYPES.SET_UPPER_TRACK, selectUpperTrack);
    yield takeLatest(ACTION_TYPES.SET_LOWER_TRACK, selectLowerTrack);
}
