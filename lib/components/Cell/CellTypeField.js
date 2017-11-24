import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { toggleCellLangOption, showAllCells } from '../../actions/CellActions'
import Icon from '../Icon'

class CellTypeField extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const availableLang = [ 'Markdown', 'HTML', 'JavaScript', 'Python' ]
    const { showLangOption, id, type } = this.props
    const renderLangOptionList = showLangOption ? (
      <ul className="lang-options fadeIn">
        { availableLang.map((lang, index) => <li key={ index }>{ lang }</li>) }
      </ul>
    ) : undefined

    return (
      <div className="cell-type-field">
        <span onClick={() => this.props.toggleCellLangOption(id)} className="cell-type"> { type } <Icon name="caret-down" /> </span>
        { renderLangOptionList }
      </div>
    )
  }
}

// function mapStateToProps(state) {
//   return {}
// }

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    toggleCellLangOption
  }, dispatch)
}

CellTypeField = connect(undefined, mapDispatchToProps)(CellTypeField)
export default CellTypeField
