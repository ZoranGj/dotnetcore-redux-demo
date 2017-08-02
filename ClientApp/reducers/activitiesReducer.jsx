import {
    SELECT_UNIT,
    REQUEST_ACTIVITIES,
    RECEIVE_ACTIVITIES,
    GET_ACTIVITIES_FAILURE
} from '../actions/activities'

const initialState = {
    orgUnit: 0,
    activities: []
}

function activitiesReducer(state = initialState, action) {
    switch (action.type) {
        case SELECT_UNIT:
            return {
                ...state,
                orgUnit: action.orgUnit,
            };
        case REQUEST_ACTIVITIES:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            })
        case RECEIVE_ACTIVITIES:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                activities: action.activities,
                lastUpdated: action.receivedAt
            })
        default:
            return state
    }
}

export default activitiesReducer;