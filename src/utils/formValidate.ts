/**
 * @description: 校验正则
 * @param rule 校验规则
 * @param value 校验值
 * @param callback 回调
 * */
export default function (rule, value, callback) {
    if (!rule.regexp.test(value)) {
        callback(new Error(rule.message))
    } else {
        callback()
    }
}