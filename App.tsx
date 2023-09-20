/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Appcontainer from './src/AppContainer';
import configStore from './src/redux/store';

const store = configStore.store;
const persistor = configStore.persistor;
function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Appcontainer />
      </PersistGate>
    </Provider>
  );
}

export default App;
