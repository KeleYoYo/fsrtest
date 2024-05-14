//校验规则
const rules = {
    selfAssessment: [
        {
            trigger: 'blur',
            required: true,
            message: '同学，绘画过程自评是必填的哦！'
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
        selfAssessment: '',
    },
    // 显示在视图上的字段
    stateItem: [
        {filed: 'selfAssessment', type: 'textarea', label: '绘画过程自评'},
    ],
    labelCol: {span: 8}, //label占据24份的4份宽度
    wrapperCol: 4,
    rules: rules
}