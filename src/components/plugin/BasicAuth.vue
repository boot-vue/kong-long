<template>
    <div class="basic-auth">
        <a-modal v-model="visible" :width="1050"
                 :zIndex="3000" title="Basic Authentication"
                 @cancel="hideModal" @ok="addBasicAuthPlugin">
            <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                <a-form-item label="Name">
                    <a-input
                        v-decorator="['name', { rules: [{ required: true, message: 'Please input name!' }],initialValue:params.name }]"
                    />
                </a-form-item>
                <a-form-item label="hide_credentials">
                    <a-radio-group v-model="params.config.hide_credentials" :default-value="params.config.hide_credentials"
                                   @change="(e)=>this.params.config.hide_credentials=e.target.value">
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
    name: "BasicAuth",
    props: {
        show_modal: Boolean
    },
    data() {
        return {
            form: this.$form.createForm(this, {name: 'basicAuthForm'}),
            params: {
                name: 'basic-auth',
                service: {id: ''},
                route: {id: ''},
                consumer: {id: ''},
                enabled: true,
                config: {
                    hide_credentials: false,
                    anonymous: ''
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
        addBasicAuthPlugin() {
            this.form.validateFields((err, values) => {
                if (!err) {
                    console.log(values)
                    //this.$emit('add-plugin', this.params)
                }
            });
        }
    }
}
</script>

<style scoped>

</style>