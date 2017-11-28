import { handleActions } from 'redux-actions'

let defaultState = {
  textarea: {
    fontSize: '10',
    lineHeight: '18'
  }
}

export const StyleReducers = handleActions({
  CHANGE_TEXTAREA_FONT_SIZE: (state, { payload }) => ({
    ...state,
    textarea: { ...state.textarea, fontSize: payload }
  }),
  CHANGE_TEXTAREA_LINE_HEIGHT: (state, { payload }) => ({
    ...state,
    textarea: { ...state.textarea, lineHeight: payload }
  }),
}, defaultState)
