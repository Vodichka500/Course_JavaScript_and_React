import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilter: "all"
}

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        filtersFetching: state => {state.filtersLoadingStatus = "loading"},
        filtersFetched:  (state, action) => {
            state.filtersLoadingStatus = "idle"
            state.filters = action.payload
        },
        filtersError: state => {state.filtersLoadingStatus = "error"},
        filter: (state, action) => {state.activeFilter = action.payload}
    }
})

const {reducer, actions} = filterSlice;

export default reducer;
export const {
    filtersFetching,
    filtersFetched,
    filtersError,
    filter
} = actions