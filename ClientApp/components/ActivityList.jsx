import React, { Component }  from 'react'
import PropTypes from 'prop-types'
import ActivityRow from './ActivityRow'

let tableStyle = {
    border: '1px solid #ccc'
};


//class ActivityList extends Component {
//    render() {
//        return (
//            <table style={tableStyle}>
//                {this.props.activities.map(activity => (
//                    <span>Test</span>
//                    //<ActivityRow key={activity.id} {...activity} />
//                ))}
//            </table>
//        )
//    }
//}

const ActivityList = (activities) => (
    <table style={tableStyle}>
        {activities.map(activity => (
            <span>{activity.summary}</span>
        ))}    
    </table>
    
)

ActivityList.propTypes = {
    activities: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            summary: PropTypes.string.isRequired,
        }).isRequired
    ).isRequired,
}

export default ActivityList