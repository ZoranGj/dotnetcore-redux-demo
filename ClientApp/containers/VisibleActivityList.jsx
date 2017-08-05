import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    chosenOrgUnit,
    chooseOrgUnit,
  fetchActivities
} from '../actions/activities'
import Units from '../components/Units'
import ActivityList from '../components/ActivityList'

class VisibilityActivityList extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  componentDidMount() {
      const { dispatch, chosenOrgUnit } = this.props
      dispatch(fetchActivities(chosenOrgUnit))
  }

  componentDidUpdate(prevProps) {
      if (this.props.chosenOrgUnit !== prevProps.chosenOrgUnit) {
          const { dispatch, chosenOrgUnit } = this.props
          dispatch(fetchActivities(chosenOrgUnit))
    }
  }

  handleChange(nextOrgUnitId) {
      this.props.dispatch(chooseOrgUnit(nextOrgUnitId))
      this.props.dispatch(fetchActivities(nextOrgUnitId))
  }

  handleRefreshClick(e) {
    e.preventDefault()

    const { dispatch, chosenOrgUnit } = this.props
    dispatch(fetchActivities(chosenOrgUnit))
  }

  render() {
      const { chosenOrgUnit, activityList, isFetching, lastUpdated } = this.props
    return (
      <div>
        <Units
                value={chosenOrgUnit}
          onChange={this.handleChange}
        />
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>}B
          {!isFetching &&
            <a href="#" onClick={this.handleRefreshClick}>
              Refresh
            </a>}
        </p>
        {activityList.length === 0 && <h2>Empty.</h2>}
        {activityList.length > 0 &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
                <ActivityList activities={activityList} />
          </div>}
      </div>
    )
  }
}

VisibilityActivityList.propTypes = {
    chosenOrgUnit: PropTypes.string.isRequired,
    activityList: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { chosenOrgUnit, activitiesByOrgUnit } = state
  const {
    isFetching,
    lastUpdated,
    items: activityList
  } = activitiesByOrgUnit[chosenOrgUnit] || {
    isFetching: true,
    items: []
  }

  return {
      chosenOrgUnit,
      activityList,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(VisibilityActivityList)

//class VisibleActivityList extends Component {
//    constructor(props) {
//        super(props)
//    }

//    //handleChange(nextSubreddit) {
//    //    this.props.dispatch(selectSubreddit(nextSubreddit))
//    //    this.props.dispatch(fetchPostsIfNeeded(nextSubreddit))
//    //}

//    //handleRefreshClick(e) {
//    //    e.preventDefault()

//    //    const { dispatch, selectedSubreddit } = this.props
//    //    dispatch(invalidateSubreddit(selectedSubreddit))
//    //    dispatch(fetchPostsIfNeeded(selectedSubreddit))
//    //}

//    componentDidMount() {
//        const { dispatch } = this.props
//        dispatch(fetchActivities())

//        //this.props.fetchActivities();
//    }

//    render() {
//        const { activities, lastUpdated } = this.props
//        return (
//            <div>
//                <ActivityList activities={this.props.activities} />
//            </div>
//        )
//    }
//}

//VisibleActivityList.propTypes = {
//    activities: PropTypes.array.isRequired,
//    lastUpdated: PropTypes.number,
//    dispatch: PropTypes.func.isRequired
//}

//function mapStateToProps(state) {
//    const { activitiesReducer } = state
//    const {
//        lastUpdated,
//        items: activities
//  } = {
//            items: []
//        }

//    return {
//        activities,
//        isFetching,
//        lastUpdated
//    }
//}

//export default connect(mapStateToProps)(VisibleActivityList)

////function mapStateToProps(state) {
////    const { activities } = state.activities
////    return {
////        activities
////    }
////}

////function mapDispatchToProps(dispatch) {
////    return {
////        fetchActivities() {
////            dispatch(fetchActivities())
////        }
////    }
////}
////export default connect(mapStateToProps, mapDispatchToProps)(VisibleActivityList)