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
    }
};

export default actions;
