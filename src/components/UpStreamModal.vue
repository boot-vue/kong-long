<template>
    <div class="upstreamModal">
        <a-modal v-model="visible" title="UpStream"
                 @ok="handleOk" @cancel="handleCancel"
                 :width="850">
            <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12,offset:2 }">
                <a-form-item label="id">
                    <a-input disabled
                             v-decorator="['id', { initialValue:edit?this.ups.id:this.params.id }]"
                    />
                </a-form-item>
                <a-form-item label="Name">
                    <a-input
                        v-decorator="['name', { rules: [{ required: true, message: 'Please input upstream name!' }] ,
                        initialValue:edit?this.ups.name:this.params.name }]"
                    />
                </a-form-item>
                <a-form-item label="负载均衡策略">
                    <a-radio-group v-model="params.algorithm" :default-value="edit?ups.algorithm:params.algorithm"
                                   @change="(e)=>this.params.algorithm=e.target.value">
                        <a-radio-button value="round-robin">
                            round-robin
                        </a-radio-button>
                        <a-radio-button value="consistent-hashing">
                            consistent-hashing
                        </a-radio-button>
                        <a-radio-button value="least-connections">
                            least-connections
                        </a-radio-button>
                    </a-radio-group>
                </a-form-item>
                <a-form-item label="hash_on">
                    <a-radio-group v-model="params.hash_on" :default-value="edit?ups.hash_on:params.hash_on"
                                   @change="(e)=>this.params.hash_on=e.target.value">
                        <a-radio-button value="none">
                            none
                        </a-radio-button>
                        <a-radio-button value="consumer">
                            consumer
                        </a-radio-button>
                        <a-radio-button value="ip">
                            ip
                        </a-radio-button>
                        <a-radio-button value="header">
                            header
                        </a-radio-button>
                        <a-radio-button value="cookie">
                            cookie
                        </a-radio-button>
                    </a-radio-group>
                </a-form-item>
                <a-form-item label="hash_fallback">
                    <a-radio-group v-model="params.hash_fallback" :default-value="edit?ups.hash_fallback:params.hash_fallback"
                                   @change="(e)=>this.params.hash_fallback=e.target.value">
                        <a-radio-button value="none">
                            none
                        </a-radio-button>
                        <a-radio-button value="consumer">
                            consumer
                        </a-radio-button>
                        <a-radio-button value="ip">
                            ip
                        </a-radio-button>
                        <a-radio-button value="header">
                            header
                        </a-radio-button>
                        <a-radio-button value="cookie">
                            cookie
                        </a-radio-button>
                    </a-radio-group>
                </a-form-item>
                <a-form-item label="hash_on_header">
                    <a-input
                        v-decorator="['hash_on_header', {initialValue:edit?this.ups.hash_on_header:this.params.hash_on_header}]"
                    />
                </a-form-item>
                <a-form-item label="hash_fallback_header">
                    <a-input
                        v-decorator="['hash_fallback_header', {initialValue:edit?this.ups.hash_fallback_header:params.hash_fallback_header}]"
                    />
                </a-form-item>
                <a-form-item label="hash_on_cookie">
                    <a-input
                        v-decorator="['hash_on_cookie', {initialValue:edit?this.ups.hash_on_cookie:params.hash_on_cookie}]"
                    />
                </a-form-item>
                <a-form-item label="hash_on_cookie_path">
                    <a-input
                        v-decorator="['hash_on_cookie_path', {initialValue:edit?this.ups.hash_on_cookie_path:params.hash_on_cookie_path}]"
                    />
                </a-form-item>
                <a-form-item label="slots">
                    <a-tooltip placement="top">
                        <template slot="title">
                            <span>The number of slots in the loadbalancer algorithm (10-65536). Default: 10000.</span>
                        </template>
                        <a-input
                            v-decorator="['slots', {initialValue:edit?this.ups.slots:params.slots}]"
                        />
                    </a-tooltip>
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>

<script>
import _ from 'lodash'
import {createUpStream} from '@/api/upstream'

export default {
    name: "UpStreamModal",
    props: {
        show: Boolean,
        isEdit: Boolean,
        item: Object,
        data: Object
    },
    data() {
        return {
            form: this.$form.createForm(this, {name: 'upstreamForm'}),
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
            }
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
        edit: {
            get: function () {
                return this.isEdit
            },
            set: function () {

            }
        },
        ups: {
            get: function () {
                return this.data
            },
            set: function () {

            }
        }
    },
    methods: {
        handleOk() {
            this.form.validateFields((err, values) => {
                if (!err) {
                    _.assign(this.params, values)
                    createUpStream(this.params).then(() => {
                        this.$emit('get-data')
                    })
                }
            });
        },
        handleCancel() {
            this.form.resetFields()
            this.$emit('handle-cancel')
        }
    }
}
</script>

<style scoped>

</style>