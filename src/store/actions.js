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
    setServiceData: ({commit}, datas) => {
        commit('setServiceData', datas)
    },
    editService: ({commit}, record) => {
        commit('editService', record)
    }
};

export default actions;
