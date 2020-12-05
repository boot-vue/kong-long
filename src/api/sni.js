import axios from '../utils/axios'

export function getSnis() {
    return axios.get('/snis')
}

export function getSnisByTag(tag) {
    return axios.get('/snis/' + tag)
}

export function getSnisByCert(tag) {
    return axios.get('/certificates' + tag + '/snis')
}