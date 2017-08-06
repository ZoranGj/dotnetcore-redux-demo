import React, { Component } from 'react'
import PropTypes from 'prop-types'
import UnitInfo from './UnitInfo'

export default class Units extends Component {
    render() {
        const { value, onChange, options } = this.props
        return (
            <span>
                <UnitInfo selectedUnit={value} />
                <select onChange={e => onChange(e.target.value)} value={value}>
                    {
                        options.map(option => (
                        <option value={option.id} key={option.id}>
                            {option.name}
                        </option>
                    ))}
                </select>
            </span>
        )
    }
}

Units.propTypes = {
    options: PropTypes.array.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}