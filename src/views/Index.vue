<template>
    <div class="index">
        <h1>Connections  Refresh/5s</h1>
        <a-divider/>
        <a-row type="flex" justify="space-between">
            <a-col :span="6">
                <a-statistic title="Active" :value="nodeStatus.server.connections_active"/>
            </a-col>
            <a-col :span="6">
                <a-statistic title="Reading" :value="nodeStatus.server.connections_reading"/>
            </a-col>
            <a-col :span="6">
                <a-statistic title="Writing" :value="nodeStatus.server.connections_writing"/>
            </a-col>
        </a-row>
        <a-row type="flex" justify="space-between" style="margin-top:30px">
            <a-col :span="6">
                <a-statistic title="Waiting" :value="nodeStatus.server.connections_waiting"/>
            </a-col>
            <a-col :span="6">
                <a-statistic title="Accepted" :value="nodeStatus.server.connections_accepted"/>
            </a-col>
            <a-col :span="6">
                <a-statistic title="Handled" :value="nodeStatus.server.connections_handled"/>
            </a-col>
        </a-row>
        <h1 style="margin-top: 40px">Node Info</h1>
        <a-divider/>
        <a-row :gutter="16">
            <a-col :span="8">
                <a-card title="Node" :bordered="false">
                    hostname : {{ nodeInfo.hostname }}
                    <a-divider/>
                    version : {{ nodeInfo.version }}
                    <a-divider/>
                    lua_version : {{ nodeInfo.lua_version }}
                    <a-divider/>
                    node_id : {{ nodeInfo.node_id }}
                    <a-divider/>
                    admin-listen : {{ nodeInfo.configuration.admin_listen.map(i => i.split(" ")[0]) }}
                    <a-divider/>
                </a-card>
            </a-col>
            <a-col :span="8">
                <a-card title="Nginx" :bordered="false">
                    conf : {{ nodeInfo.configuration.nginx_kong_conf }}
                    <a-divider/>
                    access-log : {{ nodeInfo.configuration.prefix + '/' + nodeInfo.configuration.proxy_access_log }}
                    <a-divider/>
                    error-log : {{ nodeInfo.configuration.prefix + '/' + nodeInfo.configuration.proxy_error_log }}
                    <a-divider/>
                    worker_process : {{ nodeInfo.configuration.nginx_worker_processes }}
                    <a-divider/>
                    log-level : {{ nodeInfo.configuration.log_level }}
                    <a-divider/>
                </a-card>
            </a-col>
            <a-col :span="8">
                <a-card title="Database" :bordered="false">
                    host : {{ nodeInfo.configuration.pg_host }}
                    <a-divider/>
                    database : {{ nodeInfo.configuration.pg_database }}
                    <a-divider/>
                    port : {{ nodeInfo.configuration.pg_port }}
                    <a-divider/>
                    username : {{ nodeInfo.configuration.pg_user }}
                    <a-divider/>
                    password : {{ nodeInfo.configuration.pg_password }}
                    <a-divider/>
                </a-card>
            </a-col>
        </a-row>

        <h1 style="margin-top: 30px">Plugins</h1>
        <a-divider/>
        <a-tag v-for="(item,index) in nodeInfo.plugins.available_on_server" :key="index" :color="nodeInfo.plugins.enabled_in_cluster.indexOf(index)>=0?'green':''">{{ index }}</a-tag>
    </div>
</template>

<script>
import {getNodeInfo, getNodeStatus} from '@/api/node'

export default {
    name: "Index",
    data() {
        return {
            nodeStatus: {
                "database": {"reachable": true}, "memory": {
                    "workers_lua_vms": [{"http_allocated_gc": "38.72 MiB", "pid": 3206}, {"http_allocated_gc": "38.66 MiB", "pid": 3207}, {"http_allocated_gc": "38.66 MiB", "pid": 3208}, {"http_allocated_gc": "38.66 MiB", "pid": 3209}],
                    "lua_shared_dicts": {
                        "kong_locks": {"allocated_slabs": "0.06 MiB", "capacity": "8.00 MiB"},
                        "kong": {"allocated_slabs": "0.04 MiB", "capacity": "5.00 MiB"},
                        "kong_process_events": {"allocated_slabs": "0.04 MiB", "capacity": "5.00 MiB"},
                        "kong_db_cache_miss": {"allocated_slabs": "0.08 MiB", "capacity": "12.00 MiB"},
                        "kong_healthchecks": {"allocated_slabs": "0.04 MiB", "capacity": "5.00 MiB"},
                        "kong_cluster_events": {"allocated_slabs": "0.04 MiB", "capacity": "5.00 MiB"},
                        "kong_core_db_cache_miss": {"allocated_slabs": "0.08 MiB", "capacity": "12.00 MiB"},
                        "kong_core_db_cache": {"allocated_slabs": "0.76 MiB", "capacity": "128.00 MiB"},
                        "prometheus_metrics": {"allocated_slabs": "0.04 MiB", "capacity": "5.00 MiB"},
                        "kong_db_cache": {"allocated_slabs": "0.76 MiB", "capacity": "128.00 MiB"},
                        "kong_rate_limiting_counters": {"allocated_slabs": "0.08 MiB", "capacity": "12.00 MiB"}
                    }
                }, "server": {"connections_writing": 2, "total_requests": 20, "connections_handled": 10, "connections_accepted": 10, "connections_reading": 0, "connections_active": 2, "connections_waiting": 0}
            },
            nodeInfo: {
                "plugins": {
                    "enabled_in_cluster": [],
                    "available_on_server": {
                        "grpc-web": true,
                        "correlation-id": true,
                        "pre-function": true,
                        "cors": true,
                        "rate-limiting": true,
                        "loggly": true,
                        "hmac-auth": true,
                        "zipkin": true,
                        "request-size-limiting": true,
                        "azure-functions": true,
                        "request-transformer": true,
                        "oauth2": true,
                        "response-transformer": true,
                        "ip-restriction": true,
                        "statsd": true,
                        "jwt": true,
                        "proxy-cache": true,
                        "basic-auth": true,
                        "key-auth": true,
                        "http-log": true,
                        "session": true,
                        "datadog": true,
                        "tcp-log": true,
                        "prometheus": true,
                        "post-function": true,
                        "ldap-auth": true,
                        "acl": true,
                        "grpc-gateway": true,
                        "file-log": true,
                        "syslog": true,
                        "udp-log": true,
                        "response-ratelimiting": true,
                        "aws-lambda": true,
                        "bot-detection": true,
                        "acme": true,
                        "request-termination": true
                    }
                }, "tagline": "Welcome to kong", "configuration": {
                    "plugins": ["bundled"],
                    "cassandra_read_consistency": "ONE",
                    "admin_listen": ["0.0.0.0:8001 reuseport backlog=16384", "0.0.0.0:8444 http2 ssl reuseport backlog=16384"],
                    "proxy_access_log": "logs/access.log",
                    "prefix": "/usr/local/kong",
                    "nginx_conf": "/usr/local/kong/nginx.conf",
                    "cassandra_username": "kong",
                    "nginx_events_directives": [{"value": "on", "name": "multi_accept"}, {"value": "auto", "name": "worker_connections"}],
                    "admin_ssl_cert_key": "/usr/local/kong/ssl/admin-kong-default.key",
                    "dns_resolver": {},
                    "nginx_http_upstream_directives": {},
                    "nginx_main_daemon": "on",
                    "stream_proxy_ssl_enabled": false,
                    "nginx_acc_logs": "/usr/local/kong/logs/access.log",
                    "pg_semaphore_timeout": 60000,
                    "proxy_listen": ["0.0.0.0:80 reuseport backlog=16384", "0.0.0.0:443 http2 ssl reuseport backlog=16384"],
                    "client_ssl_cert_default": "/usr/local/kong/ssl/kong-default.crt",
                    "go_pluginserver_exe": "/usr/local/bin/go-pluginserver",
                    "dns_no_sync": false,
                    "db_update_propagation": 0,
                    "nginx_stream_ssl_session_tickets": "on",
                    "nginx_err_logs": "/usr/local/kong/logs/error.log",
                    "ssl_prefer_server_ciphers": "on",
                    "headers": ["server_tokens", "latency_tokens"],
                    "nginx_http_client_max_body_size": "0",
                    "status_ssl_enabled": false,
                    "status_listen": ["off"],
                    "dns_stale_ttl": 4,
                    "cluster_control_plane": "127.0.0.1:8005",
                    "nginx_http_ssl_prefer_server_ciphers": "off",
                    "pg_database": "kong",
                    "nginx_http_client_body_buffer_size": "8k",
                    "admin_acc_logs": "/usr/local/kong/logs/admin_access.log",
                    "cassandra_refresh_frequency": 60,
                    "nginx_pid": "/usr/local/kong/pids/nginx.pid",
                    "nginx_main_worker_rlimit_nofile": "auto",
                    "admin_access_log": "logs/admin_access.log",
                    "proxy_listeners": [{"listener": "0.0.0.0:80 reuseport backlog=16384", "proxy_protocol": false, "reuseport": true, "deferred": false, "ssl": false, "ip": "0.0.0.0", "backlog=16384": true, "http2": false, "port": 80, "bind": false}, {"listener": "0.0.0.0:443 ssl http2 reuseport backlog=16384", "proxy_protocol": false, "reuseport": true, "deferred": false, "ssl": true, "ip": "0.0.0.0", "backlog=16384": true, "http2": true, "port": 443, "bind": false}],
                    "db_cache_warmup_entities": ["services", "plugins"],
                    "enabled_headers": {"latency_tokens": true, "X-Kong-Response-Latency": true, "Server": true, "X-Kong-Admin-Latency": true, "X-Kong-Upstream-Status": false, "Via": true, "X-Kong-Proxy-Latency": true, "server_tokens": true, "X-Kong-Upstream-Latency": true},
                    "nginx_http_ssl_protocols": "TLSv1.2 TLSv1.3",
                    "upstream_keepalive_idle_timeout": 60,
                    "db_cache_ttl": 0,
                    "nginx_events_multi_accept": "on",
                    "admin_ssl_cert_default": "/usr/local/kong/ssl/admin-kong-default.crt",
                    "pg_ssl": false,
                    "status_access_log": "off",
                    "cluster_listeners": [{"listener": "0.0.0.0:8005", "proxy_protocol": false, "reuseport": false, "backlog=%d+": false, "deferred": false, "ssl": false, "ip": "0.0.0.0", "port": 8005, "http2": false, "bind": false}],
                    "ssl_protocols": "TLSv1.1 TLSv1.2 TLSv1.3",
                    "kong_env": "/usr/local/kong/.kong_env",
                    "cassandra_schema_consensus_timeout": 60000,
                    "log_level": "notice",
                    "admin_ssl_cert_key_default": "/usr/local/kong/ssl/admin-kong-default.key",
                    "ssl_session_timeout": "1d",
                    "real_ip_recursive": "off",
                    "cassandra_repl_factor": 1,
                    "ssl_cipher_suite": "intermediate",
                    "port_maps": {},
                    "pg_port": 5432,
                    "cassandra_keyspace": "kong",
                    "ssl_cert_default": "/usr/local/kong/ssl/kong-default.crt",
                    "nginx_http_ssl_session_timeout": "1d",
                    "error_default_type": "text/plain",
                    "upstream_keepalive_pool_size": 60,
                    "worker_consistency": "strict",
                    "nginx_stream_ssl_session_timeout": "1d",
                    "cluster_data_plane_purge_delay": 1209600,
                    "admin_ssl_enabled": true,
                    "trusted_ips": {},
                    "nginx_events_worker_connections": "auto",
                    "nginx_supstream_directives": {},
                    "ssl_cert_key": "/usr/local/kong/ssl/kong-default.key",
                    "host_ports": {},
                    "pg_user": "postgres",
                    "pg_password": "******",
                    "ssl_ciphers": "ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384",
                    "nginx_admin_directives": {},
                    "nginx_http_directives": [{"value": "8k", "name": "client_body_buffer_size"}, {"value": "0", "name": "client_max_body_size"}, {"value": "prometheus_metrics 5m", "name": "lua_shared_dict"}, {"value": "off", "name": "ssl_prefer_server_ciphers"}, {"value": "TLSv1.2 TLSv1.3", "name": "ssl_protocols"}, {"value": "on", "name": "ssl_session_tickets"}, {"value": "1d", "name": "ssl_session_timeout"}],
                    "pg_host": "127.0.0.1",
                    "nginx_kong_stream_conf": "/usr/local/kong/nginx-kong-stream.conf",
                    "ssl_cert_key_default": "/usr/local/kong/ssl/kong-default.key",
                    "go_plugins_dir": "off",
                    "db_update_frequency": 5,
                    "cassandra_write_consistency": "ONE",
                    "dns_order": ["LAST", "SRV", "A", "CNAME"],
                    "dns_error_ttl": 1,
                    "nginx_optimizations": true,
                    "pg_timeout": 60000,
                    "database": "postgres",
                    "nginx_worker_processes": "auto",
                    "nginx_http_status_directives": {},
                    "cluster_listen": ["0.0.0.0:8005"],
                    "nginx_upstream_directives": {},
                    "lua_package_path": "./?.lua;./?/init.lua;",
                    "nginx_proxy_real_ip_header": "X-Real-IP",
                    "cassandra_data_centers": ["dc1:2", "dc2:3"],
                    "role": "traditional",
                    "worker_state_update_frequency": 5,
                    "nginx_main_worker_processes": "auto",
                    "stream_listen": ["off"],
                    "pg_max_concurrent_queries": 0,
                    "cluster_mtls": "shared",
                    "cassandra_contact_points": ["127.0.0.1"],
                    "status_listeners": {},
                    "proxy_ssl_enabled": true,
                    "nginx_main_directives": [{"value": "on", "name": "daemon"}, {"value": "auto", "name": "worker_processes"}, {"value": "auto", "name": "worker_rlimit_nofile"}],
                    "lua_ssl_trusted_certificate": {},
                    "lua_socket_pool_size": 30,
                    "nginx_sproxy_directives": {},
                    "admin_ssl_cert": "/usr/local/kong/ssl/admin-kong-default.crt",
                    "db_resurrect_ttl": 30,
                    "nginx_proxy_directives": [{"value": "X-Real-IP", "name": "real_ip_header"}, {"value": "off", "name": "real_ip_recursive"}],
                    "pg_ro_ssl_verify": false,
                    "client_max_body_size": "0",
                    "admin_error_log": "logs/error.log",
                    "pg_ssl_verify": false,
                    "dns_not_found_ttl": 30,
                    "nginx_http_ssl_session_tickets": "on",
                    "lua_package_cpath": "",
                    "cassandra_ssl_verify": false,
                    "cassandra_repl_strategy": "SimpleStrategy",
                    "status_error_log": "logs/status_error.log",
                    "mem_cache_size": "128m",
                    "kic": false,
                    "client_ssl": false,
                    "nginx_kong_conf": "/usr/local/kong/nginx-kong.conf",
                    "real_ip_header": "X-Real-IP",
                    "dns_hostsfile": "/etc/hosts",
                    "admin_listeners": [{"listener": "0.0.0.0:8001 reuseport backlog=16384", "proxy_protocol": false, "reuseport": true, "deferred": false, "ssl": false, "ip": "0.0.0.0", "backlog=16384": true, "http2": false, "port": 8001, "bind": false}, {"listener": "0.0.0.0:8444 ssl http2 reuseport backlog=16384", "proxy_protocol": false, "reuseport": true, "deferred": false, "ssl": true, "ip": "0.0.0.0", "backlog=16384": true, "http2": true, "port": 8444, "bind": false}],
                    "proxy_error_log": "logs/error.log",
                    "ssl_cert": "/usr/local/kong/ssl/kong-default.crt",
                    "nginx_proxy_real_ip_recursive": "off",
                    "pg_ro_ssl": false,
                    "nginx_stream_ssl_prefer_server_ciphers": "off",
                    "loaded_plugins": {
                        "grpc-web": true,
                        "correlation-id": true,
                        "pre-function": true,
                        "cors": true,
                        "rate-limiting": true,
                        "loggly": true,
                        "hmac-auth": true,
                        "zipkin": true,
                        "request-size-limiting": true,
                        "azure-functions": true,
                        "request-transformer": true,
                        "oauth2": true,
                        "prometheus": true,
                        "syslog": true,
                        "statsd": true,
                        "jwt": true,
                        "proxy-cache": true,
                        "basic-auth": true,
                        "key-auth": true,
                        "http-log": true,
                        "session": true,
                        "datadog": true,
                        "tcp-log": true,
                        "acme": true,
                        "post-function": true,
                        "bot-detection": true,
                        "acl": true,
                        "grpc-gateway": true,
                        "response-transformer": true,
                        "ip-restriction": true,
                        "udp-log": true,
                        "response-ratelimiting": true,
                        "aws-lambda": true,
                        "file-log": true,
                        "ldap-auth": true,
                        "request-termination": true
                    },
                    "cassandra_timeout": 60000,
                    "nginx_stream_ssl_protocols": "TLSv1.2 TLSv1.3",
                    "cassandra_ssl": false,
                    "client_ssl_cert_key_default": "/usr/local/kong/ssl/kong-default.key",
                    "nginx_daemon": "on",
                    "anonymous_reports": true,
                    "status_ssl_cert_key_default": "/usr/local/kong/ssl/status-kong-default.key",
                    "lua_ssl_verify_depth": 1,
                    "status_ssl_cert_default": "/usr/local/kong/ssl/status-kong-default.crt",
                    "ssl_cert_csr_default": "/usr/local/kong/ssl/kong-default.csr",
                    "client_body_buffer_size": "8k",
                    "stream_listeners": {},
                    "nginx_stream_directives": [{"value": "stream_prometheus_metrics 5m", "name": "lua_shared_dict"}, {"value": "off", "name": "ssl_prefer_server_ciphers"}, {"value": "TLSv1.2 TLSv1.3", "name": "ssl_protocols"}, {"value": "on", "name": "ssl_session_tickets"}, {"value": "1d", "name": "ssl_session_timeout"}],
                    "cassandra_port": 9042,
                    "ssl_session_tickets": "on",
                    "cassandra_lb_policy": "RequestRoundRobin",
                    "nginx_status_directives": {},
                    "upstream_keepalive_max_requests": 100
                }, "version": "2.2.1", "node_id": "1b9918b0-120c-4480-8989-66f154fe8add", "lua_version": "LuaJIT 2.1.0-beta3", "prng_seeds": {"pid: 3206": 190241189201, "pid: 3193": 207104892401, "pid: 3207": 166912315766, "pid: 3209": 842756314431, "pid: 3208": 163996422884}, "timers": {"pending": 9, "running": 0}, "hostname": "kong"
            },
            timer: null
        }
    },
    methods: {
        getData() {
            getNodeInfo().then(res => {
                this.nodeInfo = res
            })
            getNodeStatus().then(res => {
                this.nodeStatus = res
            })
        }
    },
    mounted() {
        clearInterval(this.timer)
        this.timer = setInterval(() => {
            this.getData()
        }, 5000)
    },
    beforeDestroy() {
        clearInterval(this.timer)
    }
}
</script>

<style scoped>

</style>