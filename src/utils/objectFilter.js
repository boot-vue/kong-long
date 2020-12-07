import _ from 'lodash';

//  去除对象无用属性
export function objectFilter(obj) {
    let data = {}
    _.forIn(obj, (v, k) => handleObj(k, v, data))
    return data
}

function handleObj(k, v, data) {
    if (typeof v === 'object') {
        _.forIn(v, (vv, kk) => handleObj(k + '.' + kk, vv, data))
    } else if (v != null && v !== '' && v !== [] && v.toString().length > 0) {
        _.set(data, k, v)
    }
}

