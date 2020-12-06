<template>
    <div class="route">
        <a-button type="primary" icon="plus" @click="showRouteModal" style="margin-bottom: 20px">新增Route</a-button>
        <a-table :columns="columns" :data-source="getRouteParams.datas" rowKey="id">
            <span slot="hosts" slot-scope="hosts">
             <a-tag
                 v-for="tag in hosts"
                 :key="tag"
                 color='purple'
             >
                     {{ tag }}
             </a-tag>
            </span>
            <span slot="paths" slot-scope="paths">
             <a-tag
                 v-for="tag in paths"
                 :key="tag"
                 color='blue'
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
            <span slot="methods" slot-scope="methods">
             <a-tag
                 v-for="tag in methods"
                 :key="tag"
                 color='cyan'
             >
                     {{ tag }}
             </a-tag>
            </span>
            <span slot="tags" slot-scope="tags">
             <a-tag
                 v-for="tag in tags"
                 :key="tag"
                 color='green'
             >
                     {{ tag }}
             </a-tag>
            </span>
            <span slot="created_at" slot-scope="text">{{ moment.unix(text).format('YYYY-MM-DD HH:mm:ss') }}</span>
            <div slot="expandedRowRender" slot-scope="record" style="margin: 0">
                <a-descriptions title="Details" bordered>
                    <a-descriptions-item label="id">
                        {{ record.id }}
                    </a-descriptions-item>
                    <a-descriptions-item label="service">
                        {{ record.service.id }}
                    </a-descriptions-item>
                    <a-descriptions-item label="read_timeout">
                        {{ record.read_timeout }}
                    </a-descriptions-item>
                    <a-descriptions-item label="snis">
                        {{ record.snis || 'null' }}
                    </a-descriptions-item>
                    <a-descriptions-item label="sources">
                        {{ record.sources || 'null' }}
                    </a-descriptions-item>
                    <a-descriptions-item label="strip_path">
                        {{ record.tls_verify || 'strip_path' }}
                    </a-descriptions-item>
                    <a-descriptions-item label="request_buffering">
                        {{ record.request_buffering }}
                    </a-descriptions-item>
                    <a-descriptions-item label="response_buffering">
                        {{ record.response_buffering }}
                    </a-descriptions-item>
                    <a-descriptions-item label="regex_priority">
                        {{ record.regex_priority }}
                    </a-descriptions-item>
                    <a-descriptions-item label="preserve_host">
                        {{ record.preserve_host }}
                    </a-descriptions-item>
                    <a-descriptions-item label="path_handling">
                        {{ record.path_handling }}
                    </a-descriptions-item>
                    <a-descriptions-item label="https_redirect_status_code">
                        {{ record.https_redirect_status_code }}
                    </a-descriptions-item>
                    <a-descriptions-item label="headers">
                        {{ record.headers || 'null' }}
                    </a-descriptions-item>
                    <a-descriptions-item label="destinations">
                        {{ record.destinations || 'null' }}
                    </a-descriptions-item>
                </a-descriptions>
            </div>
            <span slot="action" slot-scope="record">
                <a-button type="primary" @click="editRoute(record)">编辑</a-button>
                <a-divider type="vertical"/>
                <a-button type="danger" @click="delRoute(record.id)">删除</a-button>
                <a-divider type="vertical"/>
             </span>
        </a-table>
        <RouteModal @get-data="getData"/>
    </div>
</template>

<script>
import RouteModal from "@/components/RouteModal";
import {deleteRoute, getRoutes} from '@/api/route'
import {mapGetters} from "vuex";
import moment from 'moment';

const columns = [
    {
        title: "Name",
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: "Hosts",
        dataIndex: 'hosts',
        key: 'hosts',
        scopedSlots: {customRender: 'hosts'}
    },
    {
        title: "paths",
        dataIndex: 'paths',
        key: 'paths',
        scopedSlots: {customRender: 'paths'}
    },
    {
        title: "protocols",
        dataIndex: 'protocols',
        key: 'protocols',
        scopedSlots: {customRender: 'protocols'}
    },
    {
        title: "methods",
        dataIndex: 'methods',
        key: 'methods',
        scopedSlots: {customRender: 'methods'}
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
    name: "Route",
    components: {RouteModal},
    data() {
        return {moment, columns}
    },
    computed: {
        ...mapGetters(['getRouteParams'])
    },
    methods: {
        showRouteModal() {
            this.$store.dispatch('changeRouteModal', {visible: true})
        },
        getData() {
            getRoutes().then(res => {
                this.$store.dispatch('setRouteData', res.data || [])
            })
        },
        editRoute(r) {
            this.$store.dispatch('editRoute', r)
        },
        delRoute(id) {
            deleteRoute(id).then(() => {
                this.getData()
            })
        }
    },
    mounted() {
        this.getData()
    }
}
</script>

<style scoped>

</style>