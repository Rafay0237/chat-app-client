import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  requests: null,
};

const requestSlice = createSlice({
    name: "requests",
    initialState,
    reducers: {
      setRequests: (state, action) => {
        state.requests = action.payload;
      },
      updateRequests:(state,action)=>{
        state.requests=state.requests.filter(req=>req._id!==action.payload)
      }
    },
  });
  
  export const {
    setRequests,
    updateRequests
  } = requestSlice.actions;
  
  export default requestSlice.reducer;