import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { changeCellType, changeCellContent } from '../actions/CellActions'
import { Converter as MarkdownConverter } from 'showdown'

class Cell extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { cellId, type, changeCellContent } = this.props
    const rows = this.props.children.split('\n').length
    return (
      <div className="cell-component">
        <textarea
          className="cell-textarea" rows={ rows }
          value={ this.props.children }
          onChange={ ({ target: { value } }) => changeCellContent(cellId, value) }
        />
        <div
          className={ `cell-content ${ type }` }
          dangerouslySetInnerHTML={{ __html: new MarkdownConverter().makeHtml(this.props.children) }}
        ></div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeCellContent, changeCellType }, dispatch)
}

Cell = connect(mapStateToProps, mapDispatchToProps)(Cell)
export default Cell
