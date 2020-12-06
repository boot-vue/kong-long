<template>
    <div class="service">
        <a-button type="primary" icon="plus" @click="showServiceModal" style="margin-bottom: 20px">新增Service</a-button>
        <a-table :columns="columns" :data-source="getServiceParams.datas" rowKey="id">
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
                    <a-descriptions-item label="connect_timeout">
                        {{ record.connect_timeout }}
                    </a-descriptions-item>
                    <a-descriptions-item label="read_timeout">
                        {{ record.read_timeout }}
                    </a-descriptions-item>
                    <a-descriptions-item label="write_timeout">
                        {{ record.read_timeout }}
                    </a-descriptions-item>
                    <a-descriptions-item label="retries">
                        {{ record.retries }}
                    </a-descriptions-item>
                    <a-descriptions-item label="tls_verify">
                        {{ record.tls_verify || 'null' }}
                    </a-descriptions-item>
                    <a-descriptions-item label="tls_verify_depth">
                        {{ record.tls_verify_depth || 'null' }}
                    </a-descriptions-item>
                    <a-descriptions-item label="ca_certificates">
                        {{ record.ca_certificates || 'null' }}
                    </a-descriptions-item>
                    <a-descriptions-item label="client_certificate">
                        {{ record.client_certificate || 'null' }}
                    </a-descriptions-item>
                </a-descriptions>
            </div>
            <span slot="action" slot-scope="record">
                <a-button type="primary" @click="editService(record)">编辑</a-button>
                <a-divider type="vertical"/>
                <a-button type="danger" @click="delService(record.id)">删除</a-button>
                <a-divider type="vertical"/>
             </span>
        </a-table>
        <ServiceModal @get-data="getData"/>
    </div>
</template>

<script>
import ServiceModal from "@/components/ServiceModal";
import {mapGetters} from "vuex";
import {deleteService, getServices} from '@/api/service'
import moment from "moment";

const columns = [
    {
        title: "Name",
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: "Host",
        dataIndex: 'host',
        key: 'host',
    },
    {
        title: "Port",
        dataIndex: 'port',
        key: 'port',
    },
    {
        title: "Protocol",
        dataIndex: 'protocol',
        key: 'protocol',
    },
    {
        title: "Path",
        dataIndex: 'path',
        key: 'path',
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
    name: "Service",
    components: {ServiceModal},
    data() {
        return {
            columns,
            moment
        }
    },
    computed: {
        ...mapGetters(['getServiceParams'])
    },
    methods: {
        showServiceModal() {
            this.$store.dispatch('changeServiceModal', {visible: true})
        },
        getData() {
            getServices().then(res => {
                this.$store.dispatch('setServiceData', res.data || [])
            })
        },
        delService(id) {
            deleteService(id).then(() => {
                this.getData()
            })
        },
        editService(r) {
            this.$store.dispatch('editService', r)
        }
    },
    mounted() {
        this.getData()
    }
}
</script>

<style scoped>

</style>