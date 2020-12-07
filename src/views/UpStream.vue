<template>
    <div class="upstream">
        <a-button icon="plus" style="margin-bottom: 20px" type="primary" @click="showUpStreamModal">新增UpStream</a-button>
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
            <span slot="created_at" slot-scope="text">{{ moment.unix(text).format('YYYY-MM-DD HH:mm:ss') }}</span>
            <div slot="expandedRowRender" slot-scope="record" style="margin: 0">
                <a-descriptions bordered title="Details">
                    <a-descriptions-item label="id">
                        {{ record.id }}
                    </a-descriptions-item>
                    <a-descriptions-item label="hash_on">
                        {{ record.hash_on }}
                    </a-descriptions-item>
                    <a-descriptions-item label="hash_fallback">
                        {{ record.hash_fallback }}
                    </a-descriptions-item>
                    <a-descriptions-item label="hash_on_header">
                        {{ record.hash_on_header }}
                    </a-descriptions-item>
                    <a-descriptions-item label="hash_on_cookie_path">
                        {{ record.hash_on_cookie_path }}
                    </a-descriptions-item>
                    <a-descriptions-item label="hash_on_cookie">
                        {{ record.hash_on_cookie }}
                    </a-descriptions-item>
                    <a-descriptions-item label="host_header">
                        {{ record.host_header }}
                    </a-descriptions-item>
                    <a-descriptions-item label="slots">
                        {{ record.slots }}
                    </a-descriptions-item>
                    <a-descriptions-item label="hash_fallback_header">
                        {{ record.hash_fallback_header }}
                    </a-descriptions-item>
                </a-descriptions>
            </div>
            <span slot="action" slot-scope="record">
                <a-button type="primary" @click="handleEditUpModal(record)">编辑</a-button>
                <a-divider type="vertical"/>
                <a-button type="danger" @click="delUpStream(record.id)">删除</a-button>
                <a-divider type="vertical"/>
                <a-button @click="showTargetDrawer(record.id)">Target</a-button>
             </span>
        </a-table>
        <UpStreamModal :data="params" :isEdit="isEdit" :show="showModal"
                       @get-data="handleCreateUpStream" @handle-cancel="handleCancel"/>
        <TargetDrawer :datas="targets" :show="showTarget" @add-target="addTarget" @del-target="delTarget"
                      @on-close="handleCloseTargetDrawer"/>
    </div>
</template>

<script>
import UpStreamModal from '../components/UpStreamModal';
import {deleteUpStream, getUpStreams} from '@/api/upstream'
import {addTarget, delTarget, getAllTargetByUpstream} from '@/api/target'
import moment from 'moment'
import TargetDrawer from "@/components/TargetDrawer";

const columns = [
    {
        title: "Name",
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: "负载均衡策略",
        dataIndex: 'algorithm',
        key: 'algorithm',
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
    name: "UpStream",
    components: {TargetDrawer, UpStreamModal},
    data() {
        return {
            showModal: false,
            data: [],
            columns,
            isEdit: false,
            targets: [],
            showTarget: false,
            id: '',
            params: {
                id: '',
                name: '',
                algorithm: 'round-robin',
                hash_on: 'none',
                hash_fallback: 'none',
                hash_on_header: '',
                hash_fallback_header: '',
                hash_on_cookie: '',
                hash_on_cookie_path: '/',
                slots: 10000,
                tags: []
            },
            moment
        }
    },
    methods: {
        handleCancel() {
            this.showModal = false
        },
        showUpStreamModal() {
            this.isEdit = false
            this.showModal = true
        },
        getData() {
            getUpStreams().then(res => {
                this.data = res.data
            })
        },
        handleCreateUpStream() {
            this.getData()
            this.showModal = false
        },
        handleEditUpModal(r) {
            this.params = r
            this.isEdit = true
            this.showModal = true
        },
        delUpStream(id) {
            deleteUpStream(id).then(() => this.getData())
        },
        showTargetDrawer(id) {
            this.id = id
            getAllTargetByUpstream(id).then(res => {
                this.targets = res.data
                this.showTarget = true
            })
        },
        handleCloseTargetDrawer() {
            this.targets = []
            this.showTarget = false
        },
        addTarget(params) {
            addTarget(params, this.id).then(() => {
                this.showTargetDrawer(this.id)
            })
        },
        delTarget(id) {
            delTarget(this.id, id).then(() => {
                this.showTargetDrawer(this.id)
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