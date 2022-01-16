import AsyncStorage from '@react-native-async-storage/async-storage';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import authReducer from './reducers/auth';
import prefReducer from './reducers/pref';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [],
};

const reducers = combineReducers({
  auth: authReducer,
  pref: prefReducer,
});

const persisted_reducers = persistReducer(persistConfig, reducers);

export const store = createStore(persisted_reducers, applyMiddleware(thunk));
export const persistor = persistStore(store);
