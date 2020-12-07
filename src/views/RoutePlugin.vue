<template>
    <div class="route-plugin">
        <div style="display: flex;justify-content: space-between;align-items: center">
            <a-button icon="plus" style="margin-bottom: 20px" type="primary" @click="showPluginModal=true">新增Plugin</a-button>
            <router-link :to="{name:'route'}" style="margin-right: 120px">
                <a-icon type="arrow-left"/>
                返回上级
            </router-link>
        </div>
        <PluginModal :show_modal="showPluginModal" @hide-modal="hidePluginModal" @show-plugin-modal="showPluginComponent"/>
        <RateLimiting :show_modal="pluginModal.rateLimiting"
                      @add-plugin="addPlugin"
                      @hide-modal="pluginModal.rateLimiting=false"/>
        <a-table :columns="columns" :data-source="data" rowKey="id">
        <span slot="tags" slot-scope="tags">
            <a-tag
                v-for="tag in tags"
                :key="tag"
                color='green'
            >
                {{ tag }}
            </a-tag>
            </span>
            <span slot="protocols" slot-scope="protocols">
             <a-tag
                 v-for="tag in protocols"
                 :key="tag"
                 color='orange'
             >
                     {{ tag }}
             </a-tag>
            </span>
            <span slot="enabled" slot-scope="enabled">
             <a-tag
                 :color="enabled?'green':'purple'"
             >
                     {{ enabled.toString() }}
             </a-tag>
            </span>
            <span slot="created_at" slot-scope="text">{{ moment.unix(text).format('YYYY-MM-DD HH:mm:ss') }}</span>
            <div slot="expandedRowRender" slot-scope="record" style="margin: 0">
                <a-descriptions bordered title="Details">
                    <a-descriptions-item label="config">
                        {{ JSON.stringify(record.config, null, 4) }}
                    </a-descriptions-item>
                </a-descriptions>
            </div>
            <span slot="action" slot-scope="record">
                <a-button type="danger" @click="delPlugin(record.id)">删除</a-button>
             </span>
        </a-table>
    </div>
</template>

<script>
import {addPluginByRouteId, deletePluginByRouteId, getPluginByRouteId} from "@/api/plugin";
import PluginModal from "@/components/PluginModal";
import RateLimiting from "@/components/plugin/RateLimiting";
import moment from "moment";

const columns = [
    {
        title: "Id",
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: "Name",
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: "protocols",
        dataIndex: 'protocols',
        key: 'protocols',
        scopedSlots: {customRender: 'protocols'}
    },
    {
        title: "enabled",
        dataIndex: 'enabled',
        key: 'enabled',
        scopedSlots: {customRender: 'enabled'}
    },
    {
        title: "Tags",
        dataIndex: 'tags',
        key: 'tags',
        scopedSlots: {customRender: 'tags'}
    },
    {
        title: "创建时间",
        dataIndex: 'created_at',
        key: 'created_at',
        scopedSlots: {customRender: 'created_at'}
    },
    {
        title: 'Action',
        key: 'action',
        scopedSlots: {customRender: 'action'},
    }
]
export default {
    name: "RoutePlugin",
    components: {RateLimiting, PluginModal},
    data() {
        return {
            id: '',
            showPluginModal: false,
            pluginModal: {
                rateLimiting: false,
                cors: false,
                acme: false,
                basicAuthentication: false,
                requestTransformer: false,
                requestTermination: false,
                botDetection: false,
            },
            data: [],
            columns,
            moment
        }
    },
    methods: {
        getPlugins(id) {
            getPluginByRouteId(id).then(res => {
                this.data = res.data;
            })
        },
        hidePluginModal() {
            this.showPluginModal = false
        },
        addPlugin(params) {
            params.route.id = this.id
            addPluginByRouteId(this.id, params).then(() => {
                this.getPlugins(this.id)
                this.showPluginModal = false
                this.pluginModal = {
                    rateLimiting: false,
                    cors: false,
                    acme: false,
                    basicAuthentication: false,
                    requestTransformer: false,
                    requestTermination: false,
                    botDetection: false,
                }
            })
        },
        delPlugin(pluginId) {
            deletePluginByRouteId(this.id, pluginId).then(() => {
                this.getPlugins(this.id)
            })
        },
        showPluginComponent(plugin) {
            switch (plugin) {
                case 'rate-limiting':
                    this.pluginModal = {
                        rateLimiting: true,
                        cors: false,
                        acme: false,
                        basicAuthentication: false,
                        requestTransformer: false,
                        requestTermination: false,
                        botDetection: false,
                    }
                    break
                case 'cors':
                    this.pluginModal = {
                        rateLimiting: false,
                        cors: true,
                        acme: false,
                        basicAuthentication: false,
                        requestTransformer: false,
                        requestTermination: false,
                        botDetection: false,
                    }
                    break
                case 'acme':
                    this.pluginModal = {
                        rateLimiting: false,
                        cors: false,
                        acme: true,
                        basicAuthentication: false,
                        requestTransformer: false,
                        requestTermination: false,
                        botDetection: false,
                    }
                    break
                case 'basic-authentication':
                    this.pluginModal = {
                        rateLimiting: false,
                        cors: false,
                        acme: false,
                        basicAuthentication: true,
                        requestTransformer: false,
                        requestTermination: false,
                        botDetection: false,
                    }
                    break
                case 'request-transformer':
                    this.pluginModal = {
                        rateLimiting: false,
                        cors: false,
                        acme: false,
                        basicAuthentication: false,
                        requestTransformer: true,
                        requestTermination: false,
                        botDetection: false,
                    }
                    break
                case 'request-termination':
                    this.pluginModal = {
                        rateLimiting: false,
                        cors: false,
                        acme: false,
                        basicAuthentication: false,
                        requestTransformer: false,
                        requestTermination: true,
                        botDetection: false,
                    }
                    break
                case 'bot-detection':
                    this.pluginModal = {
                        rateLimiting: false,
                        cors: false,
                        acme: false,
                        basicAuthentication: false,
                        requestTransformer: false,
                        requestTermination: false,
                        botDetection: true,
                    }
                    break
            }
        }
    },
    mounted() {
        this.id = this.$route.query.id
        this.getPlugins(this.id)
    }
}
</script>

<style scoped>

</style>