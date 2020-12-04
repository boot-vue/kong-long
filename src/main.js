import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from "@/locale"
import bootstrap from './bootstrap'
import Antd from 'ant-design-vue'
import NProgress from 'nprogress'

Vue.config.productionTip = false;

/*全局路由拦截*/
router.beforeEach((to, from, next) => {
    NProgress.start()
    next()
});

router.afterEach(() => {
    NProgress.done()
})

Vue.use(Antd);

new Vue({
    router,
    store,
    i18n,
    created: bootstrap,
    render: h => h(App)
}).$mount('#app');
