import React from 'react'
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import { Converter as MarkdownConverter } from 'showdown'

class CellContent extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { hidden, type, content, programResult } = this.props
    const className = `cell-content ${type} ${hidden ? 'hidden-content' : ''}` 

    switch (type) {
      case 'Markdown':
      case 'HTML': return (
        <div
          className={className}
          dangerouslySetInnerHTML={{ __html: new MarkdownConverter().makeHtml(content) }}
        ></div>
      )
      default: return (
        <div className={className}>
          {programResult}
        </div>
      )
    }
  }
}

// function mapStateToProps(state) {
//   return {}
// }

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({

//   }, dispatch)
// }

// CellContent = connect(undefined, undefined)(CellContent)
export default CellContent
