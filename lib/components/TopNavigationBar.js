import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Icon from './Icon'
import { newCell } from '../actions/CellActions'

class TopNavigationBar extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <nav id="top-navigation-bar">
        <div className="btn-wrapper">
          <button onClick={() => this.props.newCell('markdown')}><Icon name="plus" /> <span className="nav-tooltip">New Cell</span></button>
          <button><Icon name="eye" />         <span className="nav-tooltip">Show All</span></button>
          <button><Icon name="eye-slash" />   <span className="nav-tooltip">Hide All</span></button>
          <button><Icon name="sticky-note" /> <span className="nav-tooltip">Show Content Only</span></button>
          <button><Icon name="floppy-o" />    <span className="nav-tooltip">Save Notebook</span></button>
          <button><Icon name="book" />        <span className="nav-tooltip">Export Notebook</span></button>
          <button><Icon name="cubes" />       <span className="nav-tooltip">Export Workspace</span></button>
          {/* <button><Icon name="plus" /> <span className="nav-tooltip">123</span></button>
          <button><Icon name="plus" /> <span className="nav-tooltip">123</span></button>
          <button><Icon name="plus" /> <span className="nav-tooltip">123</span></button>
          <button><Icon name="plus" /> <span className="nav-tooltip">123</span></button>
          <button><Icon name="plus" /> <span className="nav-tooltip">123</span></button>
          <button><Icon name="plus" /> <span className="nav-tooltip">123</span></button>
          <button><Icon name="plus" /> <span className="nav-tooltip">123</span></button>
          <button><Icon name="plus" /> <span className="nav-tooltip">123</span></button>
          <button><Icon name="plus" /> <span className="nav-tooltip">123</span></button>
          <button><Icon name="plus" /> <span className="nav-tooltip">123</span></button> */}
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
    newCell
  }, dispatch)
}

TopNavigationBar = connect(undefined, mapDispatchToProps)(TopNavigationBar)
export default TopNavigationBar