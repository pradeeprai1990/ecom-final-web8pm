const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

import axios from "axios";
import Cookies from "js-cookie"
// import { useDispatch } from "react-redux";
export const fetchCartData = createAsyncThunk( //API Fetch
    'cart/fetchCartData',
    async (_, { rejectWithValue }) => {
        try {
            const token = Cookies.get('TOKEN');
            if (!token) throw new Error('No auth token found in cookies');

            const response = await axios.post(
                'http://localhost:8000/web/cart/cart-data',
                {},
                {   
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            
            
            return response.data.data ?? [];
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Error fetching cart'
            );
        }
    }
);



//createAsyncThunk   
export let cartSlice = createSlice(
    {
        name: "cart",
        initialState: {
            cart: [],
            loading: false,
            error: null,
        },
        reducers: {
          
        },


        extraReducers: (builder) => {
            builder
                .addCase(fetchCartData.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(fetchCartData.fulfilled, (state, action) => {
                    state.loading = false;
                    state.cart = action.payload;
                   
                })
                .addCase(fetchCartData.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                });
        },
    }
)

export default cartSlice.reducer
export let {  } = cartSlice.actions 