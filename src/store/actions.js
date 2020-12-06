import {loadLanguageAsync} from "@/locale";

const actions = {
    setLang: ({commit}, lang) => {
        return new Promise((resolve, reject) => {
            commit('setLang', lang)
            loadLanguageAsync(lang).then(() => {
                resolve()
            }).catch((e) => {
                reject(e)
            })
        })
    },
    changeServiceModal: ({commit}, params) => {
        commit('changeServiceModal', params)
    },
    changeRouteModal: ({commit}, params) => {
        commit('changeRouteModal', params)
    },
    setServiceData: ({commit}, datas) => {
        commit('setServiceData', datas)
    },
    setRouteData: ({commit}, datas) => {
        commit('setRouteData', datas)
    },
    editService: ({commit}, record) => {
        commit('editService', record)
    },
    editRoute: ({commit}, record) => {
        commit('editRoute', record)
    }
};

export default actions;
