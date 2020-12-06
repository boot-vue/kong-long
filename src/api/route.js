import axios from '../utils/axios'
import _ from "lodash";

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

export function createOrUpdateRoute(params) {
    params = _.pickBy(params, v => v && v !== '' && v.length > 0)
    params.protocols = params.protocols.toString().split(',')
    params.methods = params.methods.toString().split(',')
    params.hosts = params.hosts.toString().split(',')
    params.paths = params.paths.toString().split(',')
    params.service = {id: params.service}
    if (params.id) {
        return axios.put('/routes/' + params.id, params)
    } else {
        return axios.post('/routes', params)
    }
}

export function deleteRoute(id) {
    return axios.delete('/routes/' + id)
}