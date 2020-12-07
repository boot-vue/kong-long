import Vue from 'vue';
import Router from 'vue-router';

const Index = () => import( './views/Index')

/*处理相同路由 再次进入报错*/
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};

const originalReplace = Router.prototype.replace;
Router.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err)
};

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/index',
            name: 'index',
            component: Index
        },
        {
            path: '/upstream',
            name: 'upstream',
            component: () => import(/* webpackChunkName: "upstream" */'./views/UpStream')
        },
        {
            path: '/service',
            name: 'service',
            component: () => import(/* webpackChunkName: "service" */'./views/Service')
        },
        {
            path: '/route',
            name: 'route',
            component: () => import(/* webpackChunkName: "route" */'./views/Route')
        },
        {
            path: '/route-plugin',
            name: 'route-plugin',
            component: () => import(/* webpackChunkName: "route-plugin" */'./views/RoutePlugin')
        },
        {
            path: '/consumer',
            name: 'consumer',
            component: () => import(/* webpackChunkName: "consumer" */'./views/Consumer')
        },
        {
            path: '/plugin',
            name: 'plugin',
            component: () => import(/* webpackChunkName: "plugin" */'./views/Plugin')
        },
        {
            path: '/cert',
            name: 'cert',
            component: () => import(/* webpackChunkName: "cert" */'./views/Cert')
        },
        {
            path: '*',
            redirect: '/index'
        }
    ]
})
