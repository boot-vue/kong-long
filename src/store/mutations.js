import getters from "@/store/getters";
import _ from 'lodash';

const state = {
    lang: 'zh-CN',

    servicesParams: {
        visible: false,
        id: '',
        name: '',
        retries: 5,
        protocol: 'http',
        host: '',
        port: 80,
        path: '/',
        connect_timeout: 60000,
        write_timeout: 60000,
        read_timeout: 60000,
        tags: [],
        client_certificate: {},
        tls_verify: null,
        tls_verify_depth: null,
        ca_certificates: null,
        url: '',
        datas: []
    }
}

const mutations = {
    setLang: (state, lang) => {
        state.lang = lang
    },
    changeServiceModal: (state, params) => {
        state.servicesParams.visible = params.visible
    },
    setServiceData: (state, datas) => {
        state.servicesParams.datas = datas
    },
    editService: (state, record) => {
        _.assign(state.servicesParams, record)
        state.servicesParams.visible = true
    }
}

export default {
    mutations, state, getters
}