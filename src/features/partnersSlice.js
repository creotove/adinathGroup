import { createSlice } from '@reduxjs/toolkit'

export const partnersSlice = createSlice({
  name: 'partners',
  initialState: {
    partners: null,
  },
  reducers: {
    setPartners: (state, action) => {
      state.partners = action.payload
    },
    clearPartners: (state) => {
      state.partners = null
    },
  },
})

export const { setPartners,clearPartners } = partnersSlice.actions
