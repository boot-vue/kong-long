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
    },

    routeParams: {
        visible: false,
        id: '',
        name: '',
        protocols: ["http", "https"],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        hosts: [],
        paths: ['/'],
        headers: {},
        https_redirect_status_code: 426,
        regex_priority: 0,
        strip_path: true,
        path_handling: 'v0',
        preserve_host: false,
        request_buffering: true,
        response_buffering: true,
        snis: [],
        sources: [],
        destinations: [],
        tags: [],
        service: {
            id: ''
        },
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
    changeRouteModal: (state, params) => {
        state.routeParams.visible = params.visible
    },
    setServiceData: (state, datas) => {
        state.servicesParams.datas = datas
    },
    setRouteData: (state, datas) => {
        state.routeParams.datas = datas
    },
    editService: (state, record) => {
        _.assign(state.servicesParams, record)
        state.servicesParams.visible = true
    },
    editRoute: (state, record) => {
        _.assign(state.routeParams, record)
        state.routeParams.visible = true
    }
}

export default {
    mutations, state, getters
}