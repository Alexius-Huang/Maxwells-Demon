import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Icon from '../Icon'
import NavigationButton from './NavigationButton'
import NavigationField from './NavigationField'
import {
  newCell,
  showAllCells,
  hideAllCells,
  hideAllCellTextarea,
  toggleAllCellTools
} from '../../actions/CellActions'
import {
  changeTextareaFontSize,
  changeTextareaLineHeight
} from '../../actions/StyleActions'
import {
  toggleChangeTextareaFontSize,
  toggleChangeTextareaLineHeight,
  closeAllToggles
} from '../../actions/NavigationActions'

class TopNavigationBar extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { fontSize, lineHeight } = this.props.style.textarea
    const {
      changeTextareaFontSizeToggle: fontSizeToggle,
      changeTextareaLineHeightToggle: lineHeightToggle
    } = this.props.NavigationReducers

    return (
      <nav id="top-navigation-bar">
        <div className="navigation-wrapper">
          <NavigationButton
            title="New Cell" iconName="plus" 
            clickEvent={() => this.props.newCell('Markdown')}
          />

          <NavigationButton
            title="Show All" iconName="eye"
            clickEvent={() => this.props.showAllCells()}
          />

          <NavigationButton
            title="Hide All" iconName="eye-slash"
            clickEvent={() => this.props.hideAllCells()}
          />

          <NavigationButton
            title="Content Only" iconName="sticky-note"
            clickEvent={() => this.props.hideAllCellTextarea()}
          />

          <NavigationButton
            title="Toggle Tools" iconName="wrench"
            clickEvent={() => this.props.toggleAllCellTools()}
          />

          <button className="coming-soon"><Icon name="floppy-o" />    <span className="nav-tooltip">Save Notebook</span></button>
          <button className="coming-soon"><Icon name="book" />        <span className="nav-tooltip">Export Notebook</span></button>
          <button className="coming-soon"><Icon name="cubes" />       <span className="nav-tooltip">Export Workspace</span></button>

          <NavigationField
            title="Font Size" iconName="text-width" value={`${ fontSize }pt`} range={[8, 30]}
            toggle={ fontSizeToggle }
            toggleEvent={() => this.props.toggleChangeTextareaFontSize()}
            selectEvent={
              (event) => {
                event.stopPropagation()
                this.props.changeTextareaFontSize(event.target.getAttribute('data-value'))
                this.props.closeAllToggles()
              }
            }
          />
          <NavigationField
            title="Line Height" iconName="text-height" value={`${ lineHeight }pt`} range={[10, 50]}
            toggle={ lineHeightToggle }
            toggleEvent={() => this.props.toggleChangeTextareaLineHeight()}
            selectEvent={
              (event) => {
                event.stopPropagation()
                this.props.changeTextareaLineHeight(event.target.getAttribute('data-value'))
                this.props.closeAllToggles()
              }
            }
          />
        </div>
      </nav>
    )
  }
}

function mapStateToProps({ StyleReducers, NavigationReducers }) {
  return { style: StyleReducers, NavigationReducers }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    newCell,
    showAllCells,
    hideAllCells,
    hideAllCellTextarea,
    toggleAllCellTools,
    changeTextareaFontSize,
    changeTextareaLineHeight,
    toggleChangeTextareaFontSize,
    toggleChangeTextareaLineHeight,
    closeAllToggles
  }, dispatch)
}

TopNavigationBar = connect(mapStateToProps, mapDispatchToProps)(TopNavigationBar)
export default TopNavigationBar