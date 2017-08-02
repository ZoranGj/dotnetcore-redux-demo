import React from 'react'
import PropTypes from 'prop-types'

let rowStyle = {
    padding: '20'
};

const ActivityRow = (activity) => (
    <tr>
        <td style={rowStyle}>{activity.summary}</td>
    </tr>
)

ActivityRow.propTypes = {
    text: PropTypes.string.isRequired,
}

export default ActivityRow