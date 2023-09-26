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
// import admob, {MaxAdContentRating} from '@react-native-firebase/admob';
const store = configStore.store;
const persistor = configStore.persistor;
// admob()
//   .setRequestConfiguration({
//     // Update all future requests suitable for parental guidance
//     maxAdContentRating: MaxAdContentRating.PG,

//     // Indicates that you want your content treated as child-directed for purposes of COPPA.
//     tagForChildDirectedTreatment: true,

//     // Indicates that you want the ad request to be handled in a
//     // manner suitable for users under the age of consent.
//     tagForUnderAgeOfConsent: true,
//   })
//   .then(() => {
//     // Request config successfully set!
//   });
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
