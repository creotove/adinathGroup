import { createSlice } from '@reduxjs/toolkit'

export const accountDetailsSlice = createSlice({
  name: 'accountDetails',
  initialState: {
    accountDetails: null,
  },
  reducers: {
    setAccountDetails: (state, action) => {
      state.accountDetails = action.payload
    },
  },
})

export const { setAccountDetails } = accountDetailsSlice.actions
