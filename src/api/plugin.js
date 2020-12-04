import axios from '../utils/axios'

//  已经启用的插件
export function getPlugins() {
    return axios.get('/plugins')
}

// 所有支持的插件
export function getPluginsEnabled() {
    return axios.get('/plugins/enabled')
}

// service关联的插件
export function getPluginByServiceId(id) {
    return axios.get('/services/' + id + "/plugins")
}

// route关联的插件
export function getPluginByRouteId(id) {
    return axios.get('/routes/' + id + "/plugins")
}

// consumer关联的插件
export function getPluginByConsumerId(id) {
    return axios.get('/consumers/' + id + "/plugins")
}

// 插件检索
export function getPluginDetail(id) {
    return axios.get('/plugins/' + id)
}

// 插件schema
export function getPluginsSchema(name) {
    return axios.get('/plugins/schema/' + name)
}