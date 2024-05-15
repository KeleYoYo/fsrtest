//校验规则
const rules = {
    userAge: [
        {
            trigger: 'blur',
            required: true,
            message: '此项为必填项！'
        }
    ],
    userNickName: [
        {
            trigger: 'blur',
            required: true,
            message: '此项为必填项！'
        }
    ],
    userSex: [
        {
            trigger: 'blur',
            required: true,
            message: '此项为必填项！'
        }
    ],
    userPhone: [
        {
            trigger: 'blur',
            required: true,
            message: '此项为必填项！'
        }
    ],
    userPwd: [
        {
            trigger: 'blur',
            required: true,
            message: '此项为必填项！'
        }
    ],
    userName: [
        {
            trigger: 'blur',
            required: true,
            message: '此项为必填项！'
        }
    ],
    userAddress: [
        {
            trigger: 'blur',
            required: true,
            message: '此项为必填项！'
        }
    ]
}
export default {
    // 布局方式
    layout: 'vertical',
    // 是否禁用表单
    disabled: false,
    // 表单字段值
    formState: {
        userAge: '',
        userNickName: '',
        userAddress: '',
        userSex: '',
        userPhone: '',
        userName: '',
        userPwd: ''
    },
    // 显示在视图上的字段
    stateItem: [
        {filed: 'userName', type: 'input', label: '用户名'},
        {filed: 'userPwd', type: 'input', label: '密码'},
        {filed: 'userAge', type: 'input', label: '年龄'},
        {filed: 'userNickName', type: 'input', label: '姓名'},
        {
            filed: 'userSex',
            type: 'select',
            label: '性别',
            options: [{value: '1', label: '男'}, {value: '0', label: '女'}, {value: '2', label: '保密'}]
        },
        {filed: 'userPhone', type: 'input', label: '电话号码'},
        {filed: 'userAddress', type: 'input', label: '住址'},
    ],
    labelCol: {span: 8}, //label占据24份的4份宽度
    wrapperCol: 4,
    rules: rules
}