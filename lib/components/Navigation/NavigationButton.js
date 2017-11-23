import React from 'react'
import Icon from '../Icon'

class NavigationButton extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { clickEvent, iconName, title } = this.props
    return (
      <button onClick={ clickEvent }>
        <Icon name={ iconName } />
        <span className="nav-tooltip">{ title }</span>
      </button>
    )
  }
}

export default NavigationButton
