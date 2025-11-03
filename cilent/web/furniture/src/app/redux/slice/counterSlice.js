const { createSlice } = require("@reduxjs/toolkit");

export let counterSlice = createSlice(
    {
        name: "counter",
        initialState: {
            count: 1
        },
        reducers: {
            counterInc: function (state, action) { 
                state.count += 1
            },
            counterDec: function (state, action) {
                state.count -= 1
            }
        }

    }
)

export default counterSlice.reducer
export let {counterInc, counterDec} = counterSlice.actions