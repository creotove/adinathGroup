import { configureStore } from "@reduxjs/toolkit";
import { alertSlice } from "./features/alertSlice";
import { userSlice } from "./features/userSlice";
import { sideBarSlice } from './features/sideBarSlice';
import { partnersSlice } from './features/partnersSlice';
import { accountDetailsSlice } from './features/accountDetailsSlice';




export default configureStore({
  reducer: {
    alerts: alertSlice.reducer,
    user: userSlice.reducer,
    sidebar: sideBarSlice.reducer,
    partners : partnersSlice.reducer,
    accountDetails : accountDetailsSlice.reducer,
  },
});

