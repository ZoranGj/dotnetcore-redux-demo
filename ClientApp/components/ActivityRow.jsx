import React from 'react'
import PropTypes from 'prop-types'

let rowStyle = {
    padding: 20
};

const ActivityRow = (props) => (
    <tr>
        <td style={rowStyle}>{props.activity.name}</td>
        <td style={rowStyle}>{props.activity.description}</td>
    </tr>
)

ActivityRow.propTypes = {
    activity: PropTypes.object.isRequired,
}

export default ActivityRow