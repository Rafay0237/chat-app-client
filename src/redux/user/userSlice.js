import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: false,
  loading: false,
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    Start: (state) => {
      state.loading = true;
      state.error = false;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    Failure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signUpSuccess: (state) => {
      state.error = false;
      state.loading=false;
    },
    updateUsername: (state, action) => {
      state.currentUser.user.userName = action.payload;
    },
    updatePassword: (state, action) => {
      state.currentUser.user.password = action.payload;
    },
    deleteAccount:(state)=>{
      state.currentUser=null
    },
    signOut:(state)=>{
      state.currentUser=null
    },
    updateProfilePicture:(state,action)=>{
      state.currentUser.user.profilePicture=action.payload;
    }
  },
});

export const {
  Start,
  loginSuccess,
  Failure,
  signUpSuccess,
  updatePassword,
  updateUsername,
  deleteAccount,
  signOut,
  updateProfilePicture
} = userSlice.actions;

export default userSlice.reducer;
