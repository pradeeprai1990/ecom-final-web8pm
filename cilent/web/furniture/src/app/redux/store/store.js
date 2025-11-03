import { configureStore } from "@reduxjs/toolkit";
import counterSlice  from "../slice/counterSlice";
import cartSlice  from "../slice/cartSlice";
import userSlice from "../slice/userSlice";

export let store = configureStore(
    {
        reducer:{
            myCouter:counterSlice,
            myCart:cartSlice,
            user:userSlice
        }
    }
)