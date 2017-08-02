import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import activitiesReducer from '../reducers/activitiesReducer';

const reducers = combineReducers({
    activitiesReducer,
    //add other reducers here..
    //combine auth..
});

const loggerMiddleware = createLogger()

const store = createStore(
    reducers,
    applyMiddleware(
        thunkMiddleware, // lets us dispatch() functions
        loggerMiddleware // neat middleware that logs actions
    ));

//FOR TESTING:
import {
    selectUnit,
    fetchActivities
} from '../actions/activities'

//// Log the initial state
//console.log(store.getState())

//// Every time the state changes, log it
//// Note that subscribe() returns a function for unregistering the listener
//let unsubscribe = store.subscribe(() =>
//    console.log(store.getState())
//)

//// Dispatch some actions
//store.dispatch(selectUnit(1))

//store
//    .dispatch(fetchActivities())
//    .then(() => console.log(store.getState()))

//// Stop listening to state updates
//unsubscribe()

export default store;