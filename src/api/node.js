import axios from '../utils/axios'

// 节点的常规详细信息
// node_id：表示正在运行的Kong节点的UUID。Kong启动时会随机生成此UUID，因此该节点在每次重新启动时将具有不同的node_id。
// available_on_server：节点上安装的插件的名称。
// enabled_in_cluster：启用/配置的插件名称。也就是说，当前所有数据节点共享的数据存储中的插件配置。
export function getNodeInfo() {
    return axios.get('/')
}

//检索有关节点的使用情况信息，以及一些有关基础nginx进程正在处理的连接的基本信息，数据库连接的状态以及节点的内存使用情况
//memory：有关内存使用情况的指标。
// workers_lua_vms：包含Kong节点的所有worker的数组，其中每个条目包含：
// http_allocated_gc：由collectgarbage（“ count”）报告的HTTP子模块的Lua虚拟机的内存使用情况信息，适用于每个活动的worker程序，即在最近10秒钟内收到代理调用的工作程序。
// pid：工作进程id号
// lua_shared_dicts：与Kong节点中所有工作人员共享的词典信息的数组，其中每个数组节点包含有多少内存专用于特定的共享字典（capacity）以及有多少所述内存正在使用（allocated_slabs）。
// 这些共享字典具有最新使用（LRU）的清楚功能，因此allocated_slab == capacity所在的完整字典将正常工作。 但是对于某些字典，例如缓存HIT/MISS共享字典，增加它们的大小对整体来说是有益的。
// 可以使用querystring参数unit和scale更改内存使用单位和精度：
// unit：b/B，k/K，m/M，g/G中，它将分别以bytes、kibibytes、mebibytes或gibibytes返回结果。当请求“bytes”时，响应中的内存值将使用数字类型而不是字符串。默认为m。
// scale：在人类可读的存储字符串（“bytes”以外的单位）示值时小数点右边的位数。默认值为2。您可以通过以下操作获得以kibibytes为单位的共享字典内存使用情况(精度为4位):get/status?unit=k&scale=4
// server：有关Nginx HTTP/S服务器的指标。
// total_requests：客户端请求总数。
// connections_active：当前活动的客户端连接数，包括等待连接数。
// connections_accepted：接受的客户端连接总数。
// connections_handled：已处理的连接总数。通常，除非已达到某些资源限制，否则参数值与接受的值相同。
// connections_reading：Kong正在读取请求header的当前连接数。
// connections_writing：nginx正在将响应写回到客户端的当前连接数。
// connections_waiting：当前等待请求的空闲客户端连接数。
// database：数据库指标
// reachable：反映数据库连接状态的布尔值。请注意，此标志不反映数据库本身的运行状况。
export function getNodeStatus() {
    return axios.get('/status?unit=m&scale=2')
}