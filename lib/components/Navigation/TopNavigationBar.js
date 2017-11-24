import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Icon from '../Icon'
import NavigationButton from './NavigationButton'
import {
  newCell,
  showAllCells,
  hideAllCells,
  hideAllCellTextarea,
  toggleAllCellTools
} from '../../actions/CellActions'

class TopNavigationBar extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <nav id="top-navigation-bar">
        <div className="btn-wrapper">
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
        </div>
      </nav>
    )
  }
}

// function mapStateToProps() {
//   return {}
// }

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    newCell,
    showAllCells,
    hideAllCells,
    hideAllCellTextarea,
    toggleAllCellTools
  }, dispatch)
}

TopNavigationBar = connect(undefined, mapDispatchToProps)(TopNavigationBar)
export default TopNavigationBar