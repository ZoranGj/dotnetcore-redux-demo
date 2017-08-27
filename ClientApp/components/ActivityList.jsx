import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ActivityRow from './ActivityRow'

let tableStyle = {
    border: '1px solid #ccc'
};

export default class ActivityList extends Component {
    render() {
        return (
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th>Activity name</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.activities.map((activity, i) => <ActivityRow key={i} activity={activity} />)
                    }
                </tbody>
            </table>
        )
    }
}

ActivityList.propTypes = {
    activities: PropTypes.array.isRequired
}
