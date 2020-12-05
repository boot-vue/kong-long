import axios from '../utils/axios'

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