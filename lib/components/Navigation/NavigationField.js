import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Icon from '../Icon'

class NavigationField extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { title, iconName, value } = this.props
    return (
      <span className="navigation-field">
        <Icon name={ iconName } /> <span className="field-value">{ value }</span>
        <span className="nav-tooltip">{title}</span>
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
