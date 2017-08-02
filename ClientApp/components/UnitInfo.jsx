import React from 'react'
import PropTypes from 'prop-types'

const UnitInfo = ({ selectedUnit }) => (
    <span>
        Selected unit is: {selectedUnit}
    </span>
)

Todo.propTypes = {
    selectedUnit: PropTypes.string.isRequired
}

export default UnitInfo