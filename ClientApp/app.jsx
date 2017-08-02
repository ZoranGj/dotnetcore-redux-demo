import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import store from './store/activitiesStore'
import Main from './components/main'

const test = () => (
    <span>Test</span>
)

render(
    <Provider store={store}>
        <Main />
    </Provider>,
    document.getElementById('root')
)