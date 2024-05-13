// 规则校验
import formValidate from "@/utils/formValidate.ts";

//校验规则
const rules = {
    phone: [
        {required: true, message: '请输入手机号', trigger: 'blur'},
        {validator: formValidate, trigger: 'change', regexp: new RegExp(/^1[3456789]\d{9}$/), message: '手机号格式不正确'}
    ],
    username: [
        {
            trigger: 'change',
            required: true,
            message: '必填'
        }
    ]
}
export default {
    // 布局方式
    layout: 'horizontal',
    // 是否禁用表单
    disabled: false,
    // 表单字段值
    formState: {
        phone: '',
        username: '',
    },
    // 显示在视图上的字段
    stateItem: [
        {filed: 'phone', type: 'input', label: '手机号'},
        {filed: 'username', type: 'input', label: '姓名'},
    ],
    labelCol: {span: 4}, //label占据24份的4份宽度
    wrapperCol: 4,
    rules: rules
}