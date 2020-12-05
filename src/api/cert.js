import axios from '../utils/axios'

export function getCerts() {
    return axios.get('/certificates')
}

export function getCertsByTag(tag) {
    return axios.get('/certificates/' + tag)
}