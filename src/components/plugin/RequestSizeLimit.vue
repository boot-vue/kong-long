<template>
    <div class="request-size-limit">
        <a-modal v-model="visible" :width="1050"
                 :zIndex="3000" title="Request Size Limiting"
                 @cancel="hideModal" @ok="addRSLPlugin">
            <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                <a-form-item label="Name">
                    <a-input
                        v-decorator="['name', { rules: [{ required: true, message: 'Please input name!' }],initialValue:params.name }]"
                    />
                </a-form-item>
                <a-form-item label="allowed_payload_size">
                    <a-input-number v-decorator="['allowed_payload_size', {rules: [{ required: true}],initialValue:params.config.allowed_payload_size }]" style="width: 500px"/>
                </a-form-item>
                <a-form-item label="size_unit">
                    <a-radio-group v-model="params.config.size_unit" :default-value="params.config.size_unit"
                                   @change="(e)=>this.params.config.size_unit=e.target.value">
                        <a-radio-button value="bytes">
                            bytes
                        </a-radio-button>
                        <a-radio-button value="kilobytes">
                            kilobytes
                        </a-radio-button>
                        <a-radio-button value="megabytes">
                            megabytes
                        </a-radio-button>
                    </a-radio-group>
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>

<script>
export default {
    name: "RequestSizeLimit",
    props: {
        show_modal: Boolean
    },
    data() {
        return {
            form: this.$form.createForm(this, {name: 'requestSizeLimitForm'}),
            params: {
                name: 'request-size-limiting',
                service: {id: ''},
                route: {id: ''},
                consumer: {id: ''},
                enabled: true,
                config: {
                    allowed_payload_size: 128,
                    size_unit: 'megabytes'
                }
            }
        }
    },
    computed: {
        visible: {
            get: function () {
                return this.show_modal
            },
            set: function () {

            }
        }
    },
    methods: {
        hideModal() {
            this.$emit('hide-modal')
        },
        addRSLPlugin() {
            this.form.validateFields((err, values) => {
                if (!err) {
                    this.params.name = values.name
                    this.params.config.allowed_payload_size = values.allowed_payload_size
                    this.$emit('add-plugin', this.params)
                }
            });
        }
    }
}
</script>

<style scoped>

</style>