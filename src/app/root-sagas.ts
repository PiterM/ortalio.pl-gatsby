import { all, CallEffect, fork, ForkEffect, TakeEffect } from 'redux-saga/effects';
import { watchPlayerActions } from '../containers/player/player-saga';

const sagas: Array<() => IterableIterator<ForkEffect | CallEffect | TakeEffect>> = [
    watchPlayerActions,
];

function* globalSagas() {
    const globalSagasForks = sagas.map((saga) => fork(saga));

    yield all([...globalSagasForks]);
}

export default globalSagas;
