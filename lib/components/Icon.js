import React from 'react'

export default class Icon extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <span className={`fa fa-${this.props.name}`}></span>
  }
}
