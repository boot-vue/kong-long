<template>
    <div class="plugin-modal">
        <a-modal v-model="visible" :width="1050" title="选择插件" @cancel="hideModal" @ok="hideModal">
            <div class="plugins">
                <div class="item">
                    <img alt="" src="../assets/img/kong-inc_rate-limiting.png">
                    <div>Rate Limiting</div>
                    <a-button icon="plus" type="primary" @click="showPluginModal('rate-limiting')">新增插件</a-button>
                </div>
                <div class="item">
                    <img alt="" src="../assets/img/kong-inc_cors.png">
                    <div>CORS</div>
                    <a-button icon="plus" type="primary" @click="showPluginModal('cors')">新增插件</a-button>
                </div>
                <div class="item">
                    <img alt="" src="../assets/img/kong-inc_acme.png">
                    <div>ACME</div>
                    <a-button icon="plus" type="primary" @click="showPluginModal('acme')">新增插件</a-button>
                </div>
                <div class="item">
                    <img alt="" src="../assets/img/kong-inc_basic-auth.png">
                    <div>Basic Authentication</div>
                    <a-button disabled icon="plus" type="primary" @click="showPluginModal('basic-authentication')">新增插件</a-button>
                </div>
                <div class="item">
                    <img alt="" src="../assets/img/kong-inc_request-transformer.png">
                    <div>Request Transformer</div>
                    <a-button disabled icon="plus" type="primary" @click="showPluginModal('request-transformer')">新增插件</a-button>
                </div>
                <div class="item">
                    <img alt="" src="../assets/img/kong-inc_request-termination.png">
                    <div>Request Termination</div>
                    <a-button disabled icon="plus" type="primary" @click="showPluginModal('request-termination')">新增插件</a-button>
                </div>
                <div class="item">
                    <img alt="" src="../assets/img/kong-inc_bot-detection.png">
                    <div>Bot Detection</div>
                    <a-button icon="plus" type="primary" @click="showPluginModal('bot-detection')">新增插件</a-button>
                </div>
                <div class="item">
                    <img alt="" src="../assets/img/kong-inc_request-size-limiting.png">
                    <div>Request Size Limiting</div>
                    <a-button icon="plus" type="primary" @click="showPluginModal('request-size-limiting')">新增插件</a-button>
                </div>
            </div>
        </a-modal>
    </div>
</template>

<script>
export default {
    name: "PluginModal",
    props: {
        show_modal: Boolean
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
        showPluginModal(plugin) {
            this.$emit('show-plugin-modal', plugin)
        }
    }
}
</script>

<style lang="stylus" scoped>
.plugins
    display flex
    flex-direction row
    justify-content space-between
    padding 0 20px 20px
    align-items center
    flex-wrap wrap

    .item
        display flex
        flex-direction column
        align-items center
        justify-content center
        width 150px
        height 100%
        margin-top 50px

        img
            width 80px
            height 80px

</style>