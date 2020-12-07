<template>
    <div class="rate-limiting">
        <a-modal v-model="visible" :width="1050"
                 :zIndex="3000" title="Rate Limiting"
                 @cancel="hideModal" @ok="addRateLimitPlugin">
            <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                <a-form-item label="Name">
                    <a-input
                        v-decorator="['name', { rules: [{ required: true, message: 'Please input name!' }],initialValue:params.name }]"
                    />
                </a-form-item>
                <a-form-item label="second">
                    <a-input-number v-decorator="['second', {initialValue:params.second }]" style="width: 500px"/>
                </a-form-item>
                <a-form-item label="minute">
                    <a-input-number v-decorator="['minute', {initialValue:params.minute }]" style="width: 500px"/>
                </a-form-item>
                <a-form-item label="hour">
                    <a-input-number v-decorator="['hour', {initialValue:params.hour }]" style="width: 500px"/>
                </a-form-item>
                <a-form-item label="day">
                    <a-input-number v-decorator="['day', {initialValue:params.day }]" style="width: 500px"/>
                </a-form-item>
                <a-form-item label="month">
                    <a-input-number v-decorator="['month', {initialValue:params.month }]" style="width: 500px"/>
                </a-form-item>
                <a-form-item label="year">
                    <a-input-number v-decorator="['year', {initialValue:params.year }]" style="width: 500px"/>
                </a-form-item>
                <a-form-item label="limit_by">
                    <a-radio-group v-model="params.config.limit_by" :default-value="params.config.limit_by"
                                   @change="(e)=>this.params.config.limit_by=e.target.value">
                        <a-radio-button value="ip">
                            ip
                        </a-radio-button>
                        <a-radio-button disabled value="consumer">
                            consumer
                        </a-radio-button>
                        <a-radio-button value="credential">
                            credential
                        </a-radio-button>
                        <a-radio-button disabled value="service">
                            service
                        </a-radio-button>
                        <a-radio-button value="header">
                            header
                        </a-radio-button>
                        <a-radio-button value="path">
                            path
                        </a-radio-button>
                    </a-radio-group>
                </a-form-item>
                <a-form-item v-show="params.config.limit_by==='header'" label="header_name">
                    <a-input v-decorator="['header_name', {initialValue:params.config.header_name }]"/>
                </a-form-item>
                <a-form-item v-show="params.config.limit_by==='path'" label="path">
                    <a-input v-decorator="['path', {initialValue:params.config.path }]"/>
                </a-form-item>
                <a-form-item label="policy">
                    <a-radio-group v-model="params.config.policy" :default-value="params.config.policy"
                                   @change="(e)=>this.params.config.policy=e.target.value">
                        <a-radio-button value="cluster">
                            cluster
                        </a-radio-button>
                        <a-radio-button value="local">
                            local
                        </a-radio-button>
                        <a-radio-button value="redis">
                            redis
                        </a-radio-button>
                    </a-radio-group>
                </a-form-item>
                <a-form-item label="fault_tolerant">
                    <a-radio-group v-model="params.config.fault_tolerant" :default-value="params.config.fault_tolerant"
                                   @change="(e)=>this.params.config.fault_tolerant=e.target.value">
                        <a-radio-button :value="true">
                            true
                        </a-radio-button>
                        <a-radio-button :value="false">
                            false
                        </a-radio-button>
                    </a-radio-group>
                </a-form-item>
                <a-form-item label="hide_client_headers">
                    <a-radio-group v-model="params.config.hide_client_headers" :default-value="params.config.hide_client_headers"
                                   @change="(e)=>this.params.config.hide_client_headers=e.target.value">
                        <a-radio-button :value="true">
                            true
                        </a-radio-button>
                        <a-radio-button :value="false">
                            false
                        </a-radio-button>
                    </a-radio-group>
                </a-form-item>
                <a-form-item v-show="params.config.policy==='redis'" label="redis_host">
                    <a-input v-decorator="['redis_host', {initialValue:params.config.redis_host }]"/>
                </a-form-item>
                <a-form-item v-show="params.config.policy==='redis'" label="redis_port">
                    <a-input-number v-decorator="['redis_port', {initialValue:params.config.redis_port }]" style="width: 500px"/>
                </a-form-item>
                <a-form-item v-show="params.config.policy==='redis'" label="redis_password">
                    <a-input v-decorator="['redis_password', {initialValue:params.config.redis_password }]"/>
                </a-form-item>
                <a-form-item v-show="params.config.policy==='redis'" label="redis_timeout">
                    <a-input-number v-decorator="['redis_timeout', {initialValue:params.config.redis_timeout }]" style="width: 500px"/>
                </a-form-item>
                <a-form-item v-show="params.config.policy==='redis'" label="redis_database">
                    <a-input-number v-decorator="['redis_database', {initialValue:params.config.redis_database }]" style="width: 500px"/>
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>

<script>
export default {
    name: "RateLimiting",
    props: {
        show_modal: Boolean
    },
    data() {
        return {
            form: this.$form.createForm(this, {name: 'rateLimitForm'}),
            params: {
                name: 'rate-limiting',
                service: {id: ''},
                route: {id: ''},
                consumer: {id: ''},
                enabled: true,
                config: {
                    second: null,
                    minute: null,
                    hour: null,
                    day: null,
                    month: null,
                    year: null,
                    limit_by: 'ip',
                    service_id: '',
                    header_name: '',
                    path: '',
                    policy: 'cluster',
                    fault_tolerant: true,
                    hide_client_headers: false,
                    redis_host: '',
                    redis_port: 6379,
                    redis_password: '',
                    redis_timeout: 2000,
                    redis_database: 0
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
        addRateLimitPlugin() {
            this.form.validateFields((err, values) => {
                if (!err && (values.second || values.minute || values.hour || values.day || values.month || values.year)) {
                    this.params.name = values.name
                    this.params.config.second = values.second
                    this.params.config.minute = values.minute
                    this.params.config.hour = values.hour
                    this.params.config.day = values.day
                    this.params.config.month = values.month
                    this.params.config.year = values.year
                    this.params.config.header_name = values.header_name
                    this.params.config.path = values.path
                    this.params.config.redis_host = values.redis_host
                    this.params.config.redis_port = values.redis_port
                    this.params.config.redis_timeout = values.redis_timeout
                    this.params.config.redis_password = values.redis_password
                    this.params.config.redis_database = values.redis_database
                    this.$emit('add-plugin', this.params)
                }
            });
        }
    }
}
</script>

<style scoped>

</style>