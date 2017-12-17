import React from 'react'

export default class Icon extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { name, spin } = this.props
    return <span className={`fa fa-${name} ${ spin ? 'spin' : '' }`}></span>
  }
}
