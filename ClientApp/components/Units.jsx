import React from 'react'
import PropTypes from 'prop-types'

const Units = (onChange) => (
    <select onChange={onChange}>
        <option value="1">Org unit 1</option>
        <option value="2">Org unit 2</option>
        <option value="3">Org unit 3</option>
        <option value="4">Org unit 4</option>
        <option value="5">Org unit 5</option>
    </select>
)

Units.propTypes = {
    onChange: PropTypes.func.isRequired,
}

export default Units