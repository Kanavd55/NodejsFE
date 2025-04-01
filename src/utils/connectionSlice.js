import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name:'connection',
    initialState:null,
    reducers:{
        addConnections:(state,payload)=>action.payload;
        removeConnections:(state,payload)=>null
    }
})

export const {addConnections,removeConnections} = connectionSlice.actions;
export default connectionSlice.reducer;