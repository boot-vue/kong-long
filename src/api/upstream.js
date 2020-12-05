import axios from '../utils/axios'
import _ from 'lodash'

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

export function createUpStream(params) {
    params = _.pickBy(params, v => v && v !== '' && v.length > 0)
    if (params.id) {
        return axios.put('/upstreams/' + params.id, params)
    } else {
        return axios.post('/upstreams', params)
    }
}

export function deleteUpStream(id) {
    return axios.delete('/upstreams/' + id)
}
