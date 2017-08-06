import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    chooseOrgUnit,
    fetchActivities,
    fetchUnits
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
      const { dispatch, orgUnit } = this.props
      dispatch(fetchUnits())
      dispatch(fetchActivities(orgUnit))
  }

  componentDidUpdate(prevProps) {
      if (this.props.orgUnit !== prevProps.orgUnit) {
          const { dispatch, orgUnit } = this.props
          dispatch(fetchActivities(orgUnit))
    }
  }

  handleChange(nextorgUnit) {
      console.log(nextorgUnit);
      this.props.dispatch(chooseOrgUnit(nextorgUnit))
      this.props.dispatch(fetchActivities(nextorgUnit))
  }

  handleRefreshClick(e) {
    e.preventDefault()

    const { dispatch, orgUnit } = this.props
    dispatch(fetchActivities(orgUnit))
  }

  render() {
      const { orgUnit, activityList, isFetching, lastUpdated, orgUnitList } = this.props
    return (
          <div>
              <Units value={orgUnit}
                onChange={this.handleChange}
                options={orgUnitList} />
              {activityList.length === 0 && <h2>The activity list is empty.</h2>}
              {activityList.length > 0 &&
                  <div style={{ opacity: isFetching ? 0.5 : 1 }}>
                      <ActivityList activities={activityList} />
                  </div>}
          </div>
      )
  }
}

VisibilityActivityList.propTypes = {
    orgUnitList: PropTypes.array.isRequired,
    orgUnit: PropTypes.string.isRequired,
    activityList: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { orgUnit, activitiesByOrgUnit, orgUnitList } = state
    const {
        isFetching,
        lastUpdated,
        items: activityList
    } = activitiesByOrgUnit[orgUnit] || {
            isFetching: true,
            items: []
        }

    return {
        orgUnitList,
        orgUnit,
        activityList,
        isFetching,
        lastUpdated
    }
}

export default connect(mapStateToProps)(VisibilityActivityList)