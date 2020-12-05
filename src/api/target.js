import axios from '../utils/axios'

// upstream host:port or id
export function getTargetByUpstream(tag) {
    return axios.get('/upstreams/' + tag + "/targets")
}

export function getAllTargetByUpstream(tag) {
    return axios.get('/upstreams/' + tag + "/targets/all")
}

export function setHealthy(upTag, tag) {
    return axios.post('/upstreams/' + upTag + '/targets/' + tag + '/healthy')
}

export function setUnHealthy(upTag, tag) {
    return axios.post('/upstreams/' + upTag + '/targets/' + tag + '/unhealthy')
}