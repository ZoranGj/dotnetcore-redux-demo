import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Units extends Component {
    render() {
        const { value, onChange } = this.props //options
        return (
            <span>
                <h1>{value}</h1>
                <select onChange={e => onChange(e.target.value)} value={value}>
                    <option value="1" key="1"> Organisation Unit 1</option>
                    <option value="2" key="2"> Organisation Unit 2</option>
                    <option value="3" key="3"> Organisation Unit 3</option>
                    <option value="4" key="4"> Organisation Unit 4</option>
                </select>
            </span>
        )
    }
}

//{options.map(option => (
//                        <option value={option} key={option}>
//                            {option}
//                        </option>
//                    ))} */

Units.propTypes = {
    //options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}