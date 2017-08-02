import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchActivities } from '../actions/activities'
import ActivityList from '../components/ActivityList'

class VisibleActivityList extends Component {
    constructor(props) {
        super(props)
    }

    //handleChange(nextSubreddit) {
    //    this.props.dispatch(selectSubreddit(nextSubreddit))
    //    this.props.dispatch(fetchPostsIfNeeded(nextSubreddit))
    //}

    //handleRefreshClick(e) {
    //    e.preventDefault()

    //    const { dispatch, selectedSubreddit } = this.props
    //    dispatch(invalidateSubreddit(selectedSubreddit))
    //    dispatch(fetchPostsIfNeeded(selectedSubreddit))
    //}

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(fetchActivities())

        //this.props.fetchActivities();
    }

    render() {
        const { activities, lastUpdated } = this.props
        return (
            <div>
                <ActivityList activities={this.props.activities} />
            </div>
        )
    }
}

VisibleActivityList.propTypes = {
    activities: PropTypes.array.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { activitiesReducer } = state
    const {
        lastUpdated,
        items: activities
  } = {
            items: []
        }

    return {
        activities,
        isFetching,
        lastUpdated
    }
}

export default connect(mapStateToProps)(VisibleActivityList)

//function mapStateToProps(state) {
//    const { activities } = state.activities
//    return {
//        activities
//    }
//}

//function mapDispatchToProps(dispatch) {
//    return {
//        fetchActivities() {
//            dispatch(fetchActivities())
//        }
//    }
//}
//export default connect(mapStateToProps, mapDispatchToProps)(VisibleActivityList)