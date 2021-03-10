import { combineReducers } from 'redux';
import { playerReducer } from '../containers/player/player-reducers';
import { 
    keyDownReducer, 
    screenParamsReducer,
    itemsGraphReducer 
  } from '../containers/home-page/home-page-reducers';

const rootReducer = combineReducers(
    {
        player: playerReducer,
        keyDownCode: keyDownReducer,
        screen: screenParamsReducer,
        itemsGraph: itemsGraphReducer,
    }
);

export default rootReducer;
