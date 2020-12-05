import axios from '../utils/axios'

export function getUpStreams() {
    return axios.get('/upstreams')
}

export function getUpStreamsByTag(tag) {
    return axios.get('/upstreams/' + tag)
}

export function getUpStreamsByTarget(tag) {
    return axios.get('/targets/' + tag + "/upstream")
}

export function getUpStreamHealth(tag) {
    return axios.get('/upstreams/' + tag + "/health")
}