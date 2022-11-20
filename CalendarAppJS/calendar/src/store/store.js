import { configureStore} from '@reduxjs/toolkit';
import { uiSlice } from './index';

export const store = configureStore({
    reducer:{
        ui:uiSlice.reducer
    }
})