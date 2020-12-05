import axios from '../utils/axios'

export function getRoutes() {
    return axios.get('/routes')
}

export function getRoutesByTag(tag) {
    return axios.get('/routes/' + tag)
}

export function getRoutesByService(tag) {
    return axios.get('/services/' + tag + '/routes')
}

export function getRoutesByPlugin(tag) {
    return axios.get('/plugins/' + tag + '/route')
}