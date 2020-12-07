<template>
    <div class="route-modal">
        <a-modal v-model="getRouteParams.visible" :width="850"
                 title="Route" @cancel="handleCancel"
                 @ok="handleOk">
            <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12,offset:2 }">
                <a-form-item label="Id">
                    <a-input v-decorator="['id', { initialValue:getRouteParams.id }]"
                             disabled=""
                    />
                </a-form-item>
                <a-form-item label="Name">
                    <a-input v-decorator="['name', { rules: [{ required: true, message: 'Please input route name!' }] ,
                        initialValue:getRouteParams.name }]"
                             placeholder="route名称"
                    />
                </a-form-item>
                <a-form-item label="protocols">
                    <a-input v-decorator="['protocols', { rules: [{ required: true, message: '必填' }] ,
                        initialValue:getRouteParams.protocols.join(',') }]"
                             placeholder=",分割"
                    />
                </a-form-item>
                <a-form-item label="methods">
                    <a-input v-decorator="['methods', { rules: [{ required: true, message: '必填' }] ,
                        initialValue:getRouteParams.methods.join(',') }]"
                             placeholder=",分割"
                    />
                </a-form-item>
                <a-form-item label="service">
                    <a-select v-decorator="['service',{ initialValue:getRouteParams.service.id }]"
                              @change="handleSelectService">
                        <a-select-option v-for="item in services" :key="item.id" :value="item.id">
                            {{ item.name }}
                        </a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="hosts">
                    <a-input v-decorator="['hosts', { rules: [{ required: true, message: '必填' }] ,
                        initialValue:getRouteParams.hosts.join(',') }]"
                             placeholder=",分割 绑定的域名或ip"
                    />
                </a-form-item>
                <a-form-item label="paths">
                    <a-input v-decorator="['paths', {initialValue:getRouteParams.paths.join(',') }]"
                             placeholder=",分割"
                    />
                </a-form-item>
                <a-form-item label="https_redirect_status_code">
                    <a-input v-decorator="['https_redirect_status_code', {initialValue:getRouteParams.https_redirect_status_code}]"
                             placeholder="重定向响应码  426, 301, 302, 307, 308"
                    />
                </a-form-item>
                <a-form-item label="strip_path">
                    <a-radio-group v-decorator="['strip_path', { initialValue:getRouteParams.strip_path }]"
                                   @change="selectStripPath">
                        <a-radio-button :value="true">
                            true
                        </a-radio-button>
                        <a-radio-button :value="false">
                            false
                        </a-radio-button>
                    </a-radio-group>
                </a-form-item>
                <a-form-item label="path_handling">
                    <a-radio-group v-decorator="['path_handling', { initialValue:getRouteParams.path_handling }]"
                                   @change="selectPathHandling">
                        <a-radio-button value="v0">
                            v0
                        </a-radio-button>
                        <a-radio-button value="v1">
                            v1
                        </a-radio-button>
                    </a-radio-group>
                </a-form-item>
                <a-form-item label="preserve_host">
                    <a-radio-group v-decorator="['preserve_host', { initialValue:getRouteParams.preserve_host }]"
                                   @change="selectPreserveHost">
                        <a-radio-button :value="true">
                            true
                        </a-radio-button>
                        <a-radio-button :value="false">
                            false
                        </a-radio-button>
                    </a-radio-group>
                </a-form-item>
                <a-form-item label="request_buffering">
                    <a-radio-group v-decorator="['request_buffering', { initialValue:getRouteParams.request_buffering }]"
                                   @change="selectRequestBuffering">
                        <a-radio-button :value="true">
                            true
                        </a-radio-button>
                        <a-radio-button :value="false">
                            false
                        </a-radio-button>
                    </a-radio-group>
                </a-form-item>
                <a-form-item label="response_buffering">
                    <a-radio-group v-decorator="['response_buffering', { initialValue:getRouteParams.response_buffering }]"
                                   @change="selectResponseBuffering">
                        <a-radio-button :value="true">
                            true
                        </a-radio-button>
                        <a-radio-button :value="false">
                            false
                        </a-radio-button>
                    </a-radio-group>
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {getServices} from '@/api/service'
import {createOrUpdateRoute} from "@/api/route";

export default {
    name: "RouteModal",
    computed: {
        ...mapGetters(['getRouteParams'])
    },
    data() {
        return {
            form: this.$form.createForm(this, {name: 'routeForm'}),
            services: []
        }
    },
    methods: {
        handleOk() {
            this.form.validateFields((err, values) => {
                if (!err) {
                    createOrUpdateRoute(values).then(() => {
                        this.$store.dispatch('changeRouteModal', {visible: false})
                        this.$emit('get-data')
                    })
                }
            });
        },
        handleCancel() {
            this.form.resetFields()
            this.$store.dispatch('changeRouteModal', {visible: false})
        },
        selectStripPath(e) {
            this.form.setFieldsValue({
                strip_path: e.target.value
            })
        },
        selectPathHandling(e) {
            this.form.setFieldsValue({
                path_handling: e.target.value
            })
        },
        selectPreserveHost(e) {
            this.form.setFieldsValue({
                preserve_host: e.target.value
            })
        },
        selectRequestBuffering(e) {
            this.form.setFieldsValue({
                request_buffering: e.target.value
            })
        },
        selectResponseBuffering(e) {
            this.form.setFieldsValue({
                response_buffering: e.target.value
            })
        },
        handleSelectService(id) {
            this.form.setFieldsValue({
                service:id
            })
        }
    },
    mounted() {
        getServices().then(res => {
            this.services = res.data || []
        })
    }
}
</script>

<style scoped>

</style>