import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type ProductState={
    search: string
}

const initialState: ProductState={
    search: ""
}

const useSlice = createSlice({
    name: "product",
    initialState,
    reducers:{
        setSearch(state, action: PayloadAction<string>){
            state.search = action.payload;
        }
    }
})

export const { setSearch } = useSlice.actions;
export const useSliceReducer = useSlice.reducer;
