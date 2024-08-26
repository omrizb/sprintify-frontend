const { DEV, VITE_LOCAL } = import.meta.env

import { stationService as local } from './station.service.local'
import { stationService as remote } from './station.service.remote'

function getEmptyStation() {
    return {
        name: ''
    }
}

function getDefaultFilter() {
    return {
        txt: '',
        stationType:'',
        playListCreator:'',
        sortField: '',
        sortDir: '',
    }
}

function getFilterBy(searchParams) {
    const defaultFilter = getDefaultFilter()
    const filterBy = {}

    for (const field in defaultFilter) {
        const defaultValue = defaultFilter[field]
        const searchParamsValue = searchParams.get(field)

        if (typeof (defaultValue) === 'number') {
            filterBy[field] = searchParamsValue ? Number(searchParamsValue) : defaultValue
        } else if (typeof (defaultValue) === 'string') {
            filterBy[field] = searchParamsValue || defaultValue
        } else if (Array.isArray(defaultValue)) {
            filterBy[field] = searchParamsValue ? searchParamsValue.split(',') : defaultValue
        } else {
            filterBy[field] = defaultValue
        }

    }

    return filterBy
}

const service = VITE_LOCAL === 'true' ? local : remote
export const stationService = { getEmptyStation, getDefaultFilter, getFilterBy, ...service }






























//* Easy access to this service from the dev tools console
//* when using script - dev / dev:local

if (DEV) window.stationService = stationService
