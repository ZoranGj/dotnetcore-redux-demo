import React from 'react'
import PropTypes from 'prop-types'

const labelStyle = {
    marginTop: 0,
    fontSize: 16
};

const UnitInfo = (props) => (
    <h3 style={labelStyle}>
        Choose organisation unit: (Selected: {props.selectedUnit})
    </h3>
)

UnitInfo.propTypes = {
    selectedUnit: PropTypes.string.isRequired
}

export default UnitInfo