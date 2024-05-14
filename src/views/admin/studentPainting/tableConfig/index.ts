export const tableConfig = {
    border: 'none',
    columns: [
        {
            title: '画像',
            width: 200,
            align: 'center',
            field: 'paintingImg',
            slots: {
                default: 'paintingImg'
            }
        },
        {
            title: '学生姓名',
            width: 150,
            align: 'center',
            field: 'author.userNickName',
        },
        {
            title: '学生自评',
            width: 150,
            align: 'left',
            field: 'selfAssessment',
        },
        {
            title: '学生年龄',
            width: 150,
            align: 'center',
            field: 'author.userAge',
        },
        {
            title: '操作',
            align: 'center',
            field: 'action',
            slots: {
                default: 'action'
            }
        },
    ],
    rowConfig: {
        isHover: true
    },
    height: '100%'
}