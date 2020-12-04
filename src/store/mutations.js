import getters from "@/store/getters";

const state = {
    lang: 'zh-CN'
}

const mutations = {
    setLang: (state, lang) => {
        state.lang = lang
    }
}

export default {
    mutations, state, getters
}