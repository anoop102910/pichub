import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { imageApi } from '@/services/imageApi';
import gStateReducer from '@/slices/gstate';
const store = configureStore({
    reducer: {
        [imageApi.reducerPath]: imageApi.reducer,
        gState: gStateReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(imageApi.middleware),
});
setupListeners(store.dispatch);
export default store;
