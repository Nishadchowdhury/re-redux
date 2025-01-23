import { createSlice } from "@reduxjs/toolkit";


const initialState = [
    {
        id: 1,
        value: 0,
    },
    {
        id: 2,
        value: 0,
    },
]


const countersSlice = createSlice({
    name: 'counters',
    initialState,
    reducers: {
        increment: (state, action) => { //this time we need the counter id to work with specific counter and that will come with action payload.
            const counterIndex = state.findIndex((c) => c.id === action.payload);

            state[counterIndex].value++;
        },
        decrement: (state, action) => {
            const counterIndex = state.findIndex((c) => c.id === action.payload);

            state[counterIndex].value--;
        }
    }, // reason behind to call it reduces instead reducer because there will be many function as increment and decrement and many more; so each time this will work differently for different actions so it's reducer. 

})

// in createSlice we provided reducers but exporting reducer; because ultimately in redux store there is only a single reducer. It's looking like we're giving an object in createSlice instead that was options that are passing and eventually redux combines all the reducers and returns a central single reducer.
export default countersSlice.reducer;

// and we need to export the action-creators as well.
export const { increment, decrement } = countersSlice.actions;