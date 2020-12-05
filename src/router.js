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
            component: () => import(/* webpackChunkName: "test" */'./views/UpStream')
        },
        {
            path: '/service',
            name: 'service',
            component: () => import(/* webpackChunkName: "test" */'./views/Service')
        },
        {
            path: '/route',
            name: 'route',
            component: () => import(/* webpackChunkName: "test" */'./views/Route')
        },
        {
            path: '/consumer',
            name: 'consumer',
            component: () => import(/* webpackChunkName: "test" */'./views/Consumer')
        },
        {
            path: '/plugin',
            name: 'plugin',
            component: () => import(/* webpackChunkName: "test" */'./views/Plugin')
        },
        {
            path: '/cert',
            name: 'cert',
            component: () => import(/* webpackChunkName: "test" */'./views/Cert')
        },
        {
            path: '*',
            redirect: '/index'
        }
    ]
})
