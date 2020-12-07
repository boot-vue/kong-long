<template>
    <div class="cors">
        <a-modal v-model="visible" :width="1050"
                 :zIndex="3000" title="Cors"
                 @cancel="hideModal" @ok="addCorsPlugin">
            <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                <a-form-item label="Name">
                    <a-input
                        v-decorator="['name', { rules: [{ required: true, message: 'Please input name!' }],initialValue:params.name }]"
                    />
                </a-form-item>
                <a-form-item label="origins">
                    <a-input v-decorator="['origins', {initialValue:params.config.origins.join(',') }]"/>
                </a-form-item>
                <a-form-item label="methods">
                    <a-input v-decorator="['methods', {initialValue:params.config.methods.join(',') }]"/>
                </a-form-item>
                <a-form-item label="headers">
                    <a-input v-decorator="['headers', {initialValue:params.config.headers.join(',') }]"/>
                </a-form-item>
                <a-form-item label="exposed_headers">
                    <a-input v-decorator="['exposed_headers', {initialValue:params.config.exposed_headers.join(',') }]"/>
                </a-form-item>
                <a-form-item label="credentials">
                    <a-radio-group v-model="params.config.credentials" :default-value="params.config.credentials"
                                   @change="(e)=>this.params.config.credentials=e.target.value">
                        <a-radio-button :value="true">
                            true
                        </a-radio-button>
                        <a-radio-button :value="false">
                            false
                        </a-radio-button>
                    </a-radio-group>
                </a-form-item>
                <a-form-item label="preflight_continue">
                    <a-radio-group v-model="params.config.preflight_continue" :default-value="params.config.preflight_continue"
                                   @change="(e)=>this.params.config.preflight_continue=e.target.value">
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
export default {
    name: "Cors",
    props: {
        show_modal: Boolean
    },
    data() {
        return {
            form: this.$form.createForm(this, {name: 'corsForm'}),
            params: {
                name: 'cors',
                service: {id: ''},
                route: {id: ''},
                consumer: {id: ''},
                enabled: true,
                config: {
                    origins: ['*'],
                    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS', 'TRACE', 'CONNECT'],
                    headers: ['*'],
                    exposed_headers: [''],
                    credentials: false,
                    max_age: null,
                    preflight_continue: false
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
        addCorsPlugin() {
            this.form.validateFields((err, values) => {
                if (!err) {
                    this.params.config.origins = values.origins.split(',')
                    this.params.config.methods = values.methods.split(',')
                    this.params.config.headers = values.headers.split(',')
                    this.params.config.exposed_headers = values.exposed_headers.split(',')
                    this.params.name = values.name
                    this.$emit('add-plugin', this.params)
                }
            });
        }
    }
}
</script>

<style scoped>

</style>