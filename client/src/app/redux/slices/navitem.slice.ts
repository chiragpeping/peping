import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
export interface NavState {
   index: number
   value: string
   data: any
}

const initialState: NavState = {
    index: 0,
    value: "",
    data: null
}

export const navSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setNav(state: NavState, { payload }: PayloadAction<NavState>) {
      state.index = payload.index
      state.value = payload.value
      state.data = payload.data
    },
  },
})

export const { setNav } = navSlice.actions;
export const navReducer = navSlice.reducer;
export const selectSelectedNav = (state: RootState) => state.navReducer