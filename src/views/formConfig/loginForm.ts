//校验规则
const rules = {
    userName: [
        {
            trigger: 'blur',
            required: true,
            message: '同学,请输入用户名！'
        }
    ],
    userPwd: [
        {
            trigger: 'blur',
            required: true,
            message: '同学,请输入密码！'
        }
    ],
}
export default {
    // 布局方式
    layout: 'vertical',
    // 是否禁用表单
    disabled: false,
    // 表单字段值
    formState: {
        userName: '',
        userPwd: '',
    },
    // 显示在视图上的字段
    stateItem: [
        {filed: 'userName', type: 'input', label: '用户名'},
        {filed: 'userPwd', type: 'password', label: '密码'},
    ],
    labelCol: {span: 10}, //label占据24份的4份宽度
    wrapperCol: 4,
    rules: rules
}