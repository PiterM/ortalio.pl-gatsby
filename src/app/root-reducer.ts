import { combineReducers } from 'redux';
import { playerReducer } from '../containers/player/player-reducers';
import { 
    keyDownReducer, 
    layoutOptionsReducer,
    itemsGraphReducer 
  } from '../containers/home-page/home-page-reducers';

const rootReducer = combineReducers(
    {
        player: playerReducer,
        keyDownCode: keyDownReducer,
        layoutOptions: layoutOptionsReducer,
        itemsGraph: itemsGraphReducer,
    }
);

export default rootReducer;
