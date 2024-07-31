import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import searchReducer from './searchSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['query', 'searchType', 'currentPage', 'resultsCache'], // Add 'resultsCache' to persist
};

const persistedReducer = persistReducer(persistConfig, searchReducer);

export const store = configureStore({
  reducer: {
    search: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export const persistor = persistStore(store);