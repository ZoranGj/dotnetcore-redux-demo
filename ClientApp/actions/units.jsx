import fetch from 'isomorphic-fetch'

export const CHOOSE_ORGUNIT = 'CHOOSE_ORGUNIT'
export const RECEIVE_UNITS = 'RECEIVE_UNITS'

export function chooseOrgUnit(orgUnitId) {
    return {
        type: CHOOSE_ORGUNIT,
        orgUnitId
    }
}

export function receiveUnits(json) {
    return {
        type: RECEIVE_UNITS,
        unitList: json
    }
}

export function fetchUnits() {
    return dispatch => {
        return fetch(`/api/data/Units`)
            .then(response => response.json())
            .then(json => dispatch(receiveUnits(json)));
    }
}