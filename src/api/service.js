import axios from '../utils/axios'
import _ from "lodash";

export function getServices() {
    return axios.get('/services')
}

export function getServicesByTag(tag) {
    return axios.get('/services/' + tag)
}

// 列出与特定Certificate相关的Service
export function getServicesByCert(tag) {
    return axios.get('/certificates/' + tag + '/service')
}

export function getServicesByRoute(tag) {
    return axios.get('/routes/' + tag + '/service')
}

export function getServicesByPlugin(tag) {
    return axios.get('/plugins/' + tag + '/service')
}

export function createOrUpdateService(params) {
    params = _.pickBy(params, v => v && v !== '' && v.length > 0)

    if (params.id) {
        return axios.put('/services/' + params.id, params)
    } else {
        return axios.post('/services', params)
    }
}

export function deleteService(id) {
    return axios.delete('/services/' + id)
}