import {createSlice, createAsyncThunk, createEntityAdapter} from "@reduxjs/toolkit";
import {useHttp} from "../hooks/http.hook"

// const initialState = {
//     filters: [],
//     filtersLoadingStatus: 'idle',
//     activeFilter: "all"
// }

const filtersAdapter = createEntityAdapter();
const initialState = filtersAdapter.getInitialState({
    filtersLoadingStatus: 'idle',
    activeFilter: "all"
})

export const fetchFilters = createAsyncThunk(
    'filter/fetchFilters',
    () => {
        const request = useHttp().request
        return request("http://localhost:3001/filters")
    }
)

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        filter: (state, action) => {state.activeFilter = action.payload}
    },
    extraReducers: builder => {
        builder
            .addCase(fetchFilters.pending, (state) => {
                state.filtersLoadingStatus = 'loading'
            })
            .addCase(fetchFilters.fulfilled, (state,actions) => {
                // state.filters = actions.payload
                filtersAdapter.setAll(state ,actions.payload)
                state.filtersLoadingStatus = 'idle'
            })
            .addCase(fetchFilters.rejected, (state) => {
                state.filtersLoadingStatus = 'error'
            })
    }
})

const {reducer, actions} = filterSlice;
export const {selectAll} = filtersAdapter.getSelectors(state => state.filters)

export default reducer;
export const {
    filtersFetching,
    filter
} = actions

