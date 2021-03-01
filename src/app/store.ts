import { applyMiddleware, createStore } from 'redux';
import { Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './root-reducer';
import rootSagas from './root-sagas';
import { StoreState } from './store-state';

const sagaMiddleware = createSagaMiddleware();

let store: Store<StoreState>;

if (false && process.env.NODE_ENV === 'production') {
    store = createStore(
        rootReducer,
        applyMiddleware(sagaMiddleware)
    );
} else {
    store = createStore(
        rootReducer,
        composeWithDevTools(
            applyMiddleware(sagaMiddleware)
        )
    );
}

sagaMiddleware.run(rootSagas);

export default store;