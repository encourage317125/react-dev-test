import { createSelector } from 'reselect';

import { AppState } from '../_root';

// selector
const mainState = (state: AppState) => state.main
export const mainStateSelector = createSelector(mainState, (_mainState) => _mainState)

// opened modal type selector
const openedModal = (state: AppState) => state.main.openedModal
export const openedModalSelector = createSelector(openedModal, (_openedModal) => _openedModal)

// pending selector
const pending = (state: AppState) => state.main.pending
export const pendingSelector = createSelector(pending, (_pending) => _pending)

// data selector
const data = (state: AppState) => state.main.data
export const dataSelector = createSelector(data, (_data) => _data)