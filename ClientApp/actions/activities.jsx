import fetch from 'isomorphic-fetch'

export const CHOOSE_ORGUNIT = 'CHOOSE_ORGUNIT'
export const REQUEST_ACTIVITIES = 'REQUEST_ACTIVITIES'
export const RECEIVE_ACTIVITIES = 'RECEIVE_ACTIVITIES'

export function chooseOrgUnit(orgUnitId) {
    return {
        type: CHOOSE_ORGUNIT,
        orgUnitId
    }
}

function requestActivities(orgUnitId) {
    return {
        type: REQUEST_ACTIVITIES,
        orgUnitId
    }
}

function receiveActivities(orgUnitId, json) {
    return {
        type: RECEIVE_ACTIVITIES,
        orgUnitId,
        activityList: json,
        receivedAt: Date.now()
    }
}

export function fetchActivities(orgUnitId) {
    return dispatch => {
        dispatch(requestActivities(orgUnitId))
        return fetch(`/api/data/Activities?orgUnitId=11`)
            .then(response => response.json())
            .then(json => dispatch(receiveActivities(orgUnitId, json)))
    }
}


//export const SELECT_UNIT = "SELECT_UNIT"

//export function selectUnit(orgUnit) {
//    return {
//        type: SELECT_UNIT,
//        orgUnit
//    };
//}

//export const REQUEST_ACTIVITIES = 'REQUEST_ACTIVITIES'
//function requestActivities() {
//    return {
//        type: REQUEST_ACTIVITIES,
//    }
//}

//export const RECEIVE_ACTIVITIES = 'RECEIVE_ACTIVITIES'
//function receiveActivities(json) {
//    return {
//        type: RECEIVE_ACTIVITIES,
//        items: json,
//        receivedAt: Date.now()
//    }
//}

//// Meet our first thunk action creator!
//// Though its insides are different, you would use it just like any other action creator:
//// store.dispatch(fetchActivities('reactjs'))
//export function fetchActivities() {
//    // Thunk middleware knows how to handle functions.
//    // It passes the dispatch method as an argument to the function,
//    // thus making it able to dispatch actions itself.

//    return function (dispatch) {
//        // First dispatch: the app state is updated to inform
//        // that the API call is starting.

//        dispatch(requestActivities())

//        // The function called by the thunk middleware can return a value,
//        // that is passed on as the return value of the dispatch method.

//        // In this case, we return a promise to wait for.
//        // This is not required by thunk middleware, but it is convenient for us.

//        return fetch(`/api/SampleData/WeatherForecasts?startDateIndex=1`)
//            .then(
//            response => response.json(),
//            // Do not use catch, because that will also catch
//            // any errors in the dispatch and resulting render,
//            // causing an loop of 'Unexpected batch number' errors.
//            // https://github.com/facebook/react/issues/6895
//            error => console.log('An error occured.', error)
//            )
//            .then(json =>
//                // We can dispatch many times!
//                // Here, we update the app state with the results of the API call.

//                dispatch(receiveActivities(json))
//            )
//    }
//}