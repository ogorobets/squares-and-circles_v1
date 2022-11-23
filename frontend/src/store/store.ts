import { configureStore } from '@reduxjs/toolkit';
import shapeReducer from './slices/shapeSlice';

const store = configureStore({
  reducer: {
    shapes: shapeReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
