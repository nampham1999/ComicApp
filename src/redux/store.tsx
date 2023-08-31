import {createStore, applyMiddleware} from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import root from './reducers/root';
import logger from 'redux-logger';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['history', 'chapReducer', 'categories', 'home'],
  // timeout: null,
};
const persistedReducer = persistReducer<any>(persistConfig, root);
const store = createStore(persistedReducer, applyMiddleware(logger));
const persistor = persistStore(store);
const configStore = {store, persistor};
export default configStore;
