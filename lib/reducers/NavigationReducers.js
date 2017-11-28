import { handleActions } from 'redux-actions'

let defaultState = {
  changeTextareaFontSizeToggle: false,
  changeTextareaLineHeightToggle: false,
}

export const NavigationReducers = handleActions({
  TOGGLE_CHANGE_TEXTAREA_FONT_SIZE: (state, { payload }) => ({
    ...state,
    changeTextareaFontSizeToggle: typeof payload === 'boolean' ? payload : (!state.changeTextareaFontSizeToggle)
  }),
  TOGGLE_CHANGE_TEXTAREA_LINE_HEIGHT: (state, { payload }) => ({
    ...state,
    changeTextareaLineHeightToggle: typeof payload === 'boolean' ? payload : (!state.changeTextareaLineHeightToggle)
  }),
  CLOSE_ALL_TOGGLES: (state) => defaultState
}, defaultState)
