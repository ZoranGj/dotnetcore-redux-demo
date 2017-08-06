import { combineReducers } from 'redux'
import {
    CHOOSE_ORGUNIT,
    REQUEST_ACTIVITIES,
    RECEIVE_ACTIVITIES,
    REQUEST_UNITS,
    RECEIVE_UNITS
} from '../actions/activities'

function orgUnit(state = "1", action) {
    switch (action.type) {
        case CHOOSE_ORGUNIT:
            return action.orgUnitId
        default:
            return state
    }
}

function orgUnitList(state = [], action) {
    switch (action.type) {
        //case REQUEST_UNITS:
        //    return Object.assign({}, state, {
        //        isFetching: true,
        //    });
        case RECEIVE_UNITS:
            return action.unitList;
        default:
            return state;
    }
}

function activitiesState(
    state = {
        isFetching: false,
        didInvalidate: false,
        items: []
    },
    action
) {
    switch (action.type) {
        case REQUEST_ACTIVITIES:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            })
        case RECEIVE_ACTIVITIES:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.activityList,
                lastUpdated: action.receivedAt
            })
        default:
            return state
    }
}

function activitiesByOrgUnit(state = {}, action) {
    switch (action.type) {
        case REQUEST_ACTIVITIES:
        case RECEIVE_ACTIVITIES:
            return Object.assign({}, state, {
                [action.orgUnitId]: activitiesState(state[action.orgUnitId], action)
            })
        default:
            return state
    }
}

const rootReducer = combineReducers({
    orgUnit,
    orgUnitList,
    activitiesByOrgUnit
})

export default rootReducer