# kong long  :dragon:

> 基础功能

> 只维护对最新版kong的支持

[Kong admin api](https://docs.konghq.com/2.2.x/admin-api/)

## plugins

已实现的插件 <code>Rate Limiting</code>  <code>Cors</code> <code>Acme</code>  <code>Request Size Limiting</code>  <code>Request Transformer</code>

<code>Basic Authentication</code> 需要`consumer` 与 `acl`的支持 以后再说

## Suggest

```bash

# dashboard & kong-admin-api 安全控制自己研究  不管

某些没鸡儿卵用的功能不打算实现

route ['plugins']  --> service ---> upstream ['targets']

针对route限流时, rate-limiting plugin 按ip限流, route配多个, 需要限流的 path 单独剔出来

```

## route path匹配

|  s.path   | r.path  |r.strip_path  |r.path_handling  |request path  |proxied path  |
|  ----  | ----  |----  |----  |----  |----  |
| /s  | /fv0 |false |v0 |/fv0req |/s/fv0req |
| /s  | /fv1 |false |v1 |/fv1req |/sfv1req |
| /s  | /tv0 |true |v0 |/tv0req |/s/req |
| /s  | /tv1 |true |v1 |/tv1req |/sreq |
| /s  | /fv0/ |false |v0 |/fv0/req |/s/fv0/req |
| /s  | /fv1/ |false |v1 |/fv1/req |/sfv1/req |
| /s  | /tv0/ |true |v0 |/tv0/req |/s/req |
| /s  | /tv1/ |true |v1 |/tv1/req |/sreq |

## 演示

<table>
    <tr>
        <td><img src="https://github.com/boot-vue/pics/blob/main/1.png?raw=true" alt=""/></td>
        <td><img src="https://github.com/boot-vue/pics/blob/main/2.png?raw=true" alt=""/></td>
    </tr>
    <tr>
        <td><img src="https://github.com/boot-vue/pics/blob/main/3.png?raw=true" alt=""/></td>
        <td><img src="https://github.com/boot-vue/pics/blob/main/4.png?raw=true" alt=""/></td>
    </tr>
    <tr>
        <td><img src="https://github.com/boot-vue/pics/blob/main/5.png?raw=true" alt=""/></td>
        <td><img src="https://github.com/boot-vue/pics/blob/main/6.png?raw=true" alt=""/></td>
    </tr>
    <tr>
        <td><img src="https://github.com/boot-vue/pics/blob/main/7.png?raw=true" alt=""/></td>
        <td><img src="https://github.com/boot-vue/pics/blob/main/8.png?raw=true" alt=""/></td>
    </tr>
    <tr>
        <td><img src="https://github.com/boot-vue/pics/blob/main/9.png?raw=true" alt=""/></td>
        <td><img src="https://github.com/boot-vue/pics/blob/main/10.png?raw=true" alt=""/></td>
    </tr>
</table>