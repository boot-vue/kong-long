<template>
    <div class="service-modal">
        <a-modal v-model="getServiceParams.visible" title="Service"
                 @ok="handleOk" @cancel="handleCancel"
                 :width="850">
            <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12,offset:2 }">
                <a-form-item label="Id">
                    <a-input disabled=""
                             v-decorator="['id', { initialValue:getServiceParams.id }]"
                    />
                </a-form-item>
                <a-form-item label="Name">
                    <a-input placeholder="service名称"
                             v-decorator="['name', { rules: [{ required: true, message: 'Please input service name!' }] ,
                        initialValue:getServiceParams.name }]"
                    />
                </a-form-item>
                <a-form-item label="Host">
                    <a-input placeholder="upstream名称"
                             v-decorator="['host', { rules: [{ required: true, message: 'Please input host name!' }] ,
                        initialValue:getServiceParams.host  }]"
                    />
                </a-form-item>
                <a-form-item label="端口">
                    <a-input placeholder="端口"
                             v-decorator="['port', { rules: [{ required: true, message: 'Please input port!' }] ,
                        initialValue:getServiceParams.port }]"
                    />
                </a-form-item>
                <a-form-item label="协议">
                    <a-radio-group v-decorator="['protocol', { initialValue:getServiceParams.protocol }]"
                                   @change="selectProtocol">
                        <a-radio-button value="http">
                            http
                        </a-radio-button>
                        <a-radio-button value="https">
                            https
                        </a-radio-button>
                        <a-radio-button value="tcp">
                            tcp
                        </a-radio-button>
                        <a-radio-button value="grpc">
                            grpc
                        </a-radio-button>
                        <a-radio-button value="tls">
                            tls
                        </a-radio-button>
                        <a-radio-button value="udp">
                            udp
                        </a-radio-button>
                        <a-radio-button value="grpcs">
                            grpcs
                        </a-radio-button>
                    </a-radio-group>
                </a-form-item>
                <a-form-item label="Path">
                    <a-input placeholder="The path to be used in requests to the upstream server."
                             v-decorator="['path', { initialValue:getServiceParams.path }]"
                    />
                </a-form-item>
                <a-form-item label="Url">
                    <a-input placeholder="干啥用的??"
                             v-decorator="['url', { initialValue:getServiceParams.url }]"
                    />
                </a-form-item>
                <a-form-item label="ConnectTimeOut">
                    <a-input type="number"
                             v-decorator="['connect_timeout', { initialValue:getServiceParams.connect_timeout }]"
                    />
                </a-form-item>
                <a-form-item label="WriteTimeOut">
                    <a-input type="number"
                             v-decorator="['write_timeout', { initialValue:getServiceParams.write_timeout }]"
                    />
                </a-form-item>
                <a-form-item label="ReadTimeOut">
                    <a-input type="number"
                             v-decorator="['read_timeout', { initialValue:getServiceParams.read_timeout }]"
                    />
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {createOrUpdateService} from '@/api/service'

export default {
    name: "ServiceModal",
    data() {
        return {
            form: this.$form.createForm(this, {name: 'upstreamForm'}),
        }
    },
    computed: {
        ...mapGetters(['getServiceParams'])
    },
    methods: {
        handleOk() {
            this.form.validateFields((err, values) => {
                if (!err) {
                    createOrUpdateService(values).then(()=>{
                        this.$store.dispatch('changeServiceModal', {visible: false})
                        this.$emit('get-data')
                    })
                }
            });
        },
        handleCancel() {
            this.form.resetFields()
            this.$store.dispatch('changeServiceModal', {visible: false})
        },
        selectProtocol(e) {
            this.form.setFieldsValue({
                protocol: e.target.value
            })
        }
    }
}
</script>

<style scoped>

</style>