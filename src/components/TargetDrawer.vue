<template>
    <div class="target-drawer">
        <a-drawer
            title="Target"
            placement="right" width="1200"
            :closable="false"
            :visible="visible"
            :after-visible-change="afterVisibleChange"
            @close="onClose"
        >
            <a-form-model :model="form" :label-col="{span:4}" :wrapper-col="{span:18}">
                <a-form-model-item label="Target">
                    <a-input v-model="form.target" placeholder="host:port"/>
                </a-form-model-item>
                <a-form-model-item label="Weight">
                    <a-input v-model="form.weight" placeholder="0-65535"/>
                </a-form-model-item>
                <a-form-model-item :wrapper-col="{ span: 18, offset: 4 }">
                    <a-button type="primary" @click="handleSubmit" block>
                        新增Target
                    </a-button>
                </a-form-model-item>
            </a-form-model>
            <a-table :columns="columns" :data-source="data" rowKey="id" style="margin-top: 30px">
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
                <span slot="action" slot-scope="record">
                <a-button type="danger" @click="delTarget(record.id)">删除</a-button>
                 </span>
            </a-table>
        </a-drawer>
    </div>
</template>

<script>
import moment from "moment";

const columns = [
    {
        title: "id",
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: "target",
        dataIndex: 'target',
        key: 'target',
    },
    {
        title: "weight",
        dataIndex: 'weight',
        key: 'weight',
    },
    {
        title: "tags",
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
    name: "TargetDrawer",
    props: {
        show: Boolean,
        datas: Array
    },
    data() {
        return {
            form: {
                target: '',
                weight: 100,
                tags: []
            },
            columns,
            moment
        }
    },
    methods: {
        afterVisibleChange() {

        },
        onClose() {
            this.$emit('on-close')
        },
        handleSubmit() {
            this.$emit('add-target', this.form)
        },
        delTarget(id) {
            this.$emit('del-target', id)
        }
    },
    computed: {
        visible: {
            get: function () {
                return this.show
            },
            set: function () {

            }
        },
        data: {
            get: function () {
                return this.datas
            },
            set: function () {

            }
        }
    }
}
</script>

<style scoped>

</style>