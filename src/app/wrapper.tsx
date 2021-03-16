import * as React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Player from '../containers/player/player';
import CookieConsent from 'react-cookie-consent';

export default ({ element }: any) => {
  return (
    <>
      <Provider store={store}>
          {element}
          <Player />
      </Provider>
      <CookieConsent
        location="bottom"
        cookieName="cookieConsent"
        expires={10000}
        style={{ fontSize: '14px'}}
        buttonStyle={{ fontSize: '14px'}}
      >
        This website uses cookies to enhance the user experience.
      </CookieConsent>
    </>
  );
};