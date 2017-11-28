import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Icon from '../Icon'

class NavigationField extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { title, iconName, value, range: [ minValue, maxValue ], toggle, toggleEvent, selectEvent } = this.props
    const renderSelectListItems = Array
      .from(Array(maxValue - minValue + 1), (_, i) => i + minValue)
      .map((value, i) => <li key={i} data-value={value} onClick={selectEvent}>{value}</li>)

    return (
      <span
        className={ `navigation-field ${ toggle ? 'on' : 'off' }` }
        onClick={ toggleEvent }
      >
        <Icon name={ iconName } /> <span className="field-value">{ value }</span>
        <span className="nav-tooltip">{title}</span>

        <ul className="range-select-list">
          { renderSelectListItems }
        </ul>
      </span>
    )
  }
}

// function mapStateToProps(state) {
//   return {}
// }

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({
//   }, dispatch)
// }

NavigationField = connect(undefined, undefined)(NavigationField)
export default NavigationField
