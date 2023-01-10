import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

// import types
import * as Types from './types';

// initial state of reducer
const initialState: Types.MainState = {
  openedModal: null,
  pending: false,
  data: {
    total: 0,
    contacts_ids: [],
    contacts: {},
  },
}

// create the slice
const slice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<Types.ModalType>) {
      const modalType = action.payload
      state.openedModal = modalType
    },
    setPending(state, action: PayloadAction<boolean>) {
      const pending = action.payload
      state.pending = pending
    },
    setData(state, action: PayloadAction<Types.APIRes>) {
      const data = action.payload
      state.data = data
    },
  },
})

// export the actions and reducer
export const {
  openModal,
  setPending,
  setData,
} = slice.actions

export const MainReducer = slice.reducer