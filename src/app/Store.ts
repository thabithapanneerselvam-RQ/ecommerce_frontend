import { configureStore } from "@reduxjs/toolkit";
import {useSliceReducer} from "./slice";

export const Store = configureStore({
    reducer: {
        product:  useSliceReducer 

    }
})

export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch