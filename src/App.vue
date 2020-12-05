<template>
    <a-config-provider :locale="this.$i18n.getLocaleMessage(lang).antLocale">
        <div id="app">
            <a-layout>
                <!--侧边导航栏-->
                <a-layout-sider :collapsed="collapsed" breakpoint="md" collapsedWidth="80"
                                width="256" @breakpoint="isCollapsed">
                    <div class="logo">
                        <img alt="" src="@/assets/img/logo.svg">
                        <h1 v-show="!collapsed" class="text">Kong Long</h1>
                    </div>
                    <a-menu
                        :defaultOpenKeys="['sub1']"
                        :defaultSelectedKeys="[selectKey]"
                        :inlineCollapsed="collapsed"
                        class="slide-nav"
                        mode="inline"
                        theme="dark"
                        @click="changeRoute"
                    >
                        <a-menu-item key="index">
                            <a-icon type="desktop" theme="filled"/>
                            <span>首页</span>
                        </a-menu-item>
                        <a-menu-item key="upstream">
                            <a-icon type="api" theme="filled"/>
                            <span>UpStream</span>
                        </a-menu-item>
                        <a-menu-item key="service">
                            <a-icon type="filter" theme="filled"/>
                            <span>Service</span>
                        </a-menu-item>
                        <a-menu-item key="route">
                            <a-icon type="rocket" theme="filled"/>
                            <span>Route</span>
                        </a-menu-item>
                        <a-menu-item key="consumer">
                            <a-icon type="heart" theme="filled"/>
                            <span>Consumer</span>
                        </a-menu-item>
                        <a-menu-item key="plugin">
                            <a-icon type="control" theme="filled"/>
                            <span>Plugin</span>
                        </a-menu-item>
                        <a-menu-item key="cert">
                            <a-icon type="safety-certificate" theme="filled"/>
                            <span>Certificate</span>
                        </a-menu-item>
                    </a-menu>
                </a-layout-sider>
                <a-layout>
                    <!--头部-->
                    <a-layout-header class="base-header">
                        <a-button type="primary" @click="toggleCollapsed">
                            <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'"/>
                        </a-button>
                        <!--右侧 信息-->
                        <div class="system-info">
                            <!--多语言切换-->
                            <a-dropdown placement="bottomRight" style="margin-left: 20px">
                            <span class="multi-lang">
                                <a-icon :style="{fontSize:'16px'}" type="global"/>
                            </span>
                                <a-menu slot="overlay" @click="changeLanguage">
                                    <a-menu-item key="zh-CN">
                                        <span>简体中文 zh-CN</span>
                                    </a-menu-item>
                                    <a-menu-item key="en-US">
                                        <span>英文 en-US</span>
                                    </a-menu-item>
                                </a-menu>
                            </a-dropdown>
                        </div>
                    </a-layout-header>
                    <!--内容区-->
                    <a-layout-content class="base-content">
                        <router-view/>
                    </a-layout-content>
                    <!--底部-->
                    <a-layout-footer>
                        <div class="footer">
                            Copyright
                            <div class="copyright-icon">
                                <a-icon type="copyright"/>
                            </div>
                            2020 - {{ copyright }} &nbsp; bootvue@gmail.com
                        </div>
                    </a-layout-footer>
                </a-layout>
            </a-layout>
        </div>
    </a-config-provider>
</template>

<script>

import moment from 'moment'
import {mapState} from "vuex";

export default {
    data() {
        return {
            collapsed: false,//是否收起
            selectKey: 'index', // 选中的菜单
            copyright: moment().format('YYYY')
        }
    },
    computed: mapState({
        lang: (state) => state.lang
    }),
    methods: {
        /*切换nav 收起  展开状态*/
        toggleCollapsed() {
            this.collapsed = !this.collapsed
        },
        /*nav触发 收起*/
        isCollapsed(broken) {
            this.collapsed = broken
        },
        /*语言切换*/
        changeLanguage({key}) {
            this.$store.dispatch('setLang', key)
        },
        /*路由切换*/
        changeRoute(e) {
            switch (e.key) {
                case 'index':
                    this.$router.replace({path: '/index'});
                    break;
                case 'upstream':
                    this.$router.replace({path: '/upstream'});
                    break;
                case 'service':
                    this.$router.replace({path: '/service'});
                    break;
                case 'route':
                    this.$router.replace({path: '/route'});
                    break;
                case 'consumer':
                    this.$router.replace({path: '/consumer'});
                    break;
                case 'plugin':
                    this.$router.replace({path: '/plugin'});
                    break;
                case 'cert':
                    this.$router.replace({path: '/cert'});
                    break;
            }
        }
    },
    created() {
        this.selectKey = this.$route.path.substring(this.$route.path.lastIndexOf("/") + 1)
    }
}
</script>

<style lang="stylus" scoped>
@import "./assets/css/index.styl";
</style>
