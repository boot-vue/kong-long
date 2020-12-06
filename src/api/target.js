import axios from '../utils/axios'
import _ from 'lodash'

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

export function addTarget(params, id) {
    params = _.pickBy(params, v => v && v !== '' && v.length > 0)
    return axios.post('/upstreams/' + id + "/targets", params)
}

export function delTarget(upId, TargetId) {
    return axios.delete('/upstreams/' + upId + '/targets/' + TargetId)
}
