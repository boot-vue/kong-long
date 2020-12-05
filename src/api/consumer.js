import axios from '../utils/axios'

export function getConsumers() {
    return axios.get('/consumers')
}

export function getConsumersByTag(tag) {
    return axios.get('/consumers/' + tag)
}