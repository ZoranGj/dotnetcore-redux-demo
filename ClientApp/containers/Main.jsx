import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from '../store/activitiesStore'
import VisibleActivityList from './VisibleActivityList'

const store = configureStore()

export default class Main extends Component {
    render() {
        return (
            <Provider store={store}>
                <VisibleActivityList />
            </Provider>
        )
    }
}