import { createActions } from 'redux-actions'

export const {
  changeTextareaFontSize,
  changeTextareaLineHeight
} = createActions({
  CHANGE_TEXTAREA_FONT_SIZE: fontSize => fontSize,
  CHANGE_TEXTAREA_LINE_HEIGHT: lineHeight => lineHeight
})
