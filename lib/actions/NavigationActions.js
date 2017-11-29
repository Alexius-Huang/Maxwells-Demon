import { createActions } from 'redux-actions'

export const {
  toggleChangeTextareaFontSize,
  toggleChangeTextareaLineHeight,
  closeAllToggles
} = createActions({
  TOGGLE_CHANGE_TEXTAREA_FONT_SIZE: toggle => toggle,
  TOGGLE_CHANGE_TEXTAREA_LINE_HEIGHT: toggle => toggle,
  CLOSE_ALL_TOGGLES: () => undefined
})
