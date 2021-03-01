import * as React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Player from '../containers/player/player';

export default ({ element }: any) => {
  return (
    <Provider store={store}>
        {element}
        <Player />
    </Provider>
  );
};